import { currentUser } from "@clerk/nextjs/server";
import { Serializable } from "@langchain/core/load/serializable";
import { AsyncCaller } from "@langchain/core/utils/async_caller";
import { compare } from "@langchain/core/utils/json_patch";
import { getEncoding } from "@langchain/core/utils/tiktoken";
import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { z } from "zod";

import db from "@/db/drizzle";
import { characters, games, levels, tokenSpends } from "@/db/schema";
import { getTotalTokens } from "@/lib/queries";
import StoryCreator from "@/lib/story-creator";

import { Game } from "../../components/shared/types";
import { publicProcedure, router } from "../trpc";

const DoNotRemoveCompare = compare;
const DoNotRemovegetEncoding = getEncoding;
const DoNotRemoveSerializable = Serializable;
const DoNotRemoveRecursiveCharacterTextSplitter =
  RecursiveCharacterTextSplitter;
const DoNotRemoveAsyncCaller = AsyncCaller;

const model = new ChatOpenAI({
  modelName: process.env.GPT_MODEL,
  openAIApiKey: process.env.GPT_API_KEY,
  temperature: parseFloat(process.env.GPT_TEMPERATURE ?? "0.8"),
  maxTokens: parseInt(process.env.GPT_MAX_TOKENS ?? "1048"),
});

const memory = new BufferMemory();

const chain = new ConversationChain({
  llm: model,
  memory,
  verbose: true,
});

const creator = new StoryCreator();

const getImage = async (prompt: string, game: Game) => {
  const imagePrompt = await creator.getImagePrompt(prompt, game);

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
        prompt: imagePrompt,
        size: "1792x1024",
        model: "dall-e-3",
      }),
    },
  );

  const image = await imageResponse.json();

  return image.data[0].url;
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
          image = await getImage(level, input.game);
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

        const response = await chain.call({ input: level });
        const data = await response.response;

        const json = await JSON.parse(data);

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
