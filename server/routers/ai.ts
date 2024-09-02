import { currentUser } from "@clerk/nextjs/server";
import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { Pool } from "@neondatabase/serverless";
import { z } from "zod";

import db from "@/db/drizzle";
import { characters, games, levels, tokenSpends } from "@/db/schema";
import { getTotalTokens } from "@/lib/queries";
import StoryCreator from "@/lib/story-creator";

import { Game } from "../../components/shared/types";
import { publicProcedure, router } from "../trpc";

const model = new ChatOpenAI({
  modelName: process.env.GPT_MODEL,
  openAIApiKey: process.env.GPT_API_KEY,
  temperature: parseFloat(process.env.GPT_TEMPERATURE ?? "0.8"),
  maxTokens: parseInt(process.env.GPT_MAX_TOKENS ?? "1048"),
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POOL,
  ssl: true,
});

const chainWithHistory = new RunnableWithMessageHistory({
  runnable: chain,
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
  getMessageHistory: async (sessionId) => {
    const chatHistory = new PostgresChatMessageHistory({
      sessionId,
      pool,
    });
    return chatHistory;
  },
});

const creator = new StoryCreator();

const getAIImage = async (prompt: string) => {
  const imageResponse = await fetch(
    "https://api.openai.com/v1/images/generations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        n: 1,
        prompt: prompt,
        size: "1792x1024",
        model: "dall-e-3",
      }),
    },
  );

  const image = await imageResponse.json();

  return image.data[0].url;
};

const getImage = async (game: Game) => {
  const imagePrompt = await creator.getImagePrompt(game);
  return getAIImage(imagePrompt);
};

export const aiRouter = router({
  getLevel: publicProcedure
    .input(
      z.object({
        game: z.custom<Game>(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await currentUser();

      try {
        const totalUserTokens = await getTotalTokens(
          user?.emailAddresses[0].emailAddress!,
        );

        if (totalUserTokens <= 0) {
          return "Not enough tokens";
        }

        let level = "";
        let image = "";
        let gameId = "";
        let levelNumber = 0;

        // First level
        if (input.game.levels.length === 0) {
          level = (await creator.getGptStoryPrompt(input.game)).basePrompt;
          levelNumber = 1;

          const [newGame] = await db
            .insert(games)
            .values({
              email: user?.emailAddresses[0].emailAddress!,
              genre: input.game.genre,
              choice: "",
            })
            .returning({ id: games.id });

          await db.insert(characters).values({
            name: input.game.character.name,
            plot: input.game.character.plot,
            type: input.game.character.type,
            items: input.game.character.items,
            gameId: newGame.id,
          });

          gameId = newGame.id;
          image = await getImage(input.game);
        } else {
          level = (await creator.getNextLevel(input.game)).basePrompt;
          gameId = input.game.id;
          image = "";
          levelNumber = +input.game.levels[0].level + 1;
        }

        await db.insert(tokenSpends).values({
          amount: 1,
          email: user?.emailAddresses[0].emailAddress!,
          action: "level",
        });

        const response = await chainWithHistory.invoke(
          {
            input: level,
          },
          { configurable: { sessionId: gameId } },
        );

        const json = await JSON.parse(response);

        await db.insert(levels).values({
          storyline: json.storyline,
          choices: JSON.stringify(json.choices),
          image,
          level: String(levelNumber),
          gameId,
        });

        return gameId;
      } catch (e) {
        throw e;
      }
    }),
});
