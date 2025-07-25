"use server";

import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { z } from "zod";

import db from "@/db/drizzle";
import { characters, Game, games, levels, tokenSpends } from "@/db/schema";
import { createCharacterFormSchema } from "@/lib/form-schemas";
import { getTotalTokens } from "@/lib/queries";
import StoryCreator from "@/lib/story-creator";

import { getUserSession } from "./users";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const model = new ChatOpenAI({
  modelName: process.env.GPT_MODEL,
  openAIApiKey: process.env.OPENAI_API_KEY,
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

const getAIImage = async (prompt: string) => {
  const imageResponse = await fetch(
    "https://api.openai.com/v1/images/generations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        n: 1,
        prompt: prompt,
        size: "1792x1024",
        model: "dall-e-3",
      }),
    }
  );

  const image = await imageResponse.json();

  return image.data[0].url;
};

const getImage = async (game: Game) => {
  const imagePrompt = await creator.getImagePrompt(game);
  return getAIImage(imagePrompt);
};

const creator = new StoryCreator();

export async function createCharacter(
  formData: z.infer<typeof createCharacterFormSchema>
) {
  const { user } = await getUserSession();

  try {
    const totalUserTokens = await getTotalTokens(
      user.email
    );

    if (totalUserTokens <= 0) {
      return "Not enough tokens";
    }

    const [newGame] = await db
      .insert(games)
      .values({
        email: user.email,
        genre: formData.genre,
        choice: "",
      })
      .returning({ id: games.id });

    await db.insert(characters).values({
      ...formData,
      gameId: newGame.id,
    });

    const game = await db.query.games.findFirst({
      where: eq(games.id, newGame.id),
      with: {
        character: true,
        levels: true,
      },
    });

    if (!game) {
      throw new Error("Game not found");
    }

    const validCharacter = game.character ?? {
      id: "",
      name: "",
      gender: "male",
      plot: "",
      type: "",
      items: "",
      gameId: "",
      createdAt: new Date(),
    };

    const image = await getImage({ ...game, character: validCharacter });

    await db.insert(tokenSpends).values({
      amount: 1,
      email: user.email,
      action: "level",
    });

    const level = (
      await creator.getGptStoryPrompt({ ...game, character: validCharacter })
    ).basePrompt;
    const levelNumber = 1;

    const response = await chainWithHistory.invoke(
      {
        input: level,
      },
      { configurable: { sessionId: game.id } }
    );

    const aiJSON = await JSON.parse(response);

    if (aiJSON.items) {
      await db
        .update(characters)
        .set({
          items: JSON.stringify(aiJSON.items),
        })
        .where(eq(characters.gameId, game.id));
    }

    await db.insert(levels).values({
      storyline: aiJSON.storyline,
      choices: JSON.stringify(aiJSON.choices),
      image,
      level: String(levelNumber),
      gameId: game.id,
    });

    return { gameId: game.id, level: aiJSON };
  } catch (e) {
    throw e;
  }
}

export async function getLevel(game: Game) {
  const { user } = await getUserSession();

  try {
    const totalUserTokens = await getTotalTokens(
      user.email
    );

    if (totalUserTokens <= 0) {
      return "Not enough tokens";
    }

    // TODO: check if character plot, type, and items are from the data lists

    let level = "";
    let image = "";
    let gameId = "";
    let levelNumber = 0;

    // First level
    if (game.levels.length === 0) {
      level = (await creator.getGptStoryPrompt(game)).basePrompt;
      levelNumber = 1;

      const [newGame] = await db
        .insert(games)
        .values({
          email: user.email,
          genre: game.genre,
          choice: "",
        })
        .returning({ id: games.id });

      await db.insert(characters).values({
        name: game.character.name,
        plot: game.character.plot,
        type: game.character.type,
        items: game.character.items,
        gender: game.character.gender,
        gameId: newGame.id,
      });

      gameId = newGame.id;
      image = await getImage(game);
    } else {
      level = (await creator.getNextLevel(game)).basePrompt;
      gameId = game.id ?? "";
      image = "";
      levelNumber = +game.levels[0].level + 1;
    }

    await db.insert(tokenSpends).values({
      amount: 1,
      email: user.email,
      action: "level",
    });

    const response = await chainWithHistory.invoke(
      {
        input: level,
      },
      { configurable: { sessionId: gameId } }
    );

    const aiJSON = await JSON.parse(response);

    if (aiJSON.items) {
      await db
        .update(characters)
        .set({
          items: JSON.stringify(aiJSON.items),
        })
        .where(eq(characters.gameId, gameId));
    }

    await db.insert(levels).values({
      storyline: aiJSON.storyline,
      choices: JSON.stringify(aiJSON.choices),
      image,
      level: String(levelNumber),
      gameId,
    });

    return { gameId, level: aiJSON };
  } catch (e) {
    throw e;
  }
}
