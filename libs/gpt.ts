"use server";

import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const model = new OpenAI({
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

import StoryCreator, { Story } from "./story-creator";

export const chatGptData = async (story: Story) => {
  const creator = new StoryCreator();

  const input =
    story.level === 1
      ? (await creator.getGptStoryPrompt(story)).basePrompt
      : (await creator.getNextLevel(story)).basePrompt;

  const response = await chain.call({ input });
  const data = await response.response;

  return {
    message: "success",
    data: {
      data,
      level: story.level + 1,
    },
  };
};
