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
import { tokenSpends } from "@/db/schema";
import { getTotalTokens } from "@/lib/queries";
import StoryCreator from "@/lib/story-creator";

import { Story } from "../../components/shared/types";
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

const getDalle3Image = async (prompt: string, story: Story) => {
  const items = story.character.items.toString();

  const imagePrompt = `
  Give me a scenery image for the visual novel game.

  The main storyline is ${story.character.plot}.

  My character is a ${story.character.type}, and is carrying these items: ${items}

  The story genre is: "${story.genre}", and keep the image in that mood.

  My current level description is this: ${prompt}

  My choice was: "${story.choice}"

  Image should be in photorealistic art.
`;

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
        story: z.custom<Story>(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await currentUser();

      try {
        const creator = new StoryCreator();

        const totalUserTokens = await getTotalTokens(
          user?.emailAddresses[0].emailAddress!,
        );

        if (totalUserTokens <= 0) {
          return "Not enough tokens";
        }

        const level =
          input.story.level.levelNumber === 1
            ? (await creator.getGptStoryPrompt(input.story)).basePrompt
            : (await creator.getNextLevel(input.story)).basePrompt;

        const image = await getDalle3Image(level, input.story);

        await db.insert(tokenSpends).values({
          amount: 1,
          email: user?.emailAddresses[0].emailAddress!,
          action: "level",
        });

        const response = await chain.call({ input: level });
        const data = await response.response;

        return {
          data,
          level: input.story.level.levelNumber + 1,
          image,
        };
      } catch (e) {
        throw e;
      }
    }),
});
