"use server";

import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

console.log(PromptTemplate);

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

import StoryCreator from "./story-creator";
import { Story } from "./types";

export const chatGptData = async (story: Story) => {
  try {
    const creator = new StoryCreator();

    const input =
      story.level === 1
        ? (await creator.getGptStoryPrompt(story)).basePrompt
        : (await creator.getNextLevel(story)).basePrompt;

    const response = await chain.call({ input });
    const data = await response.response;

    return {
      data,
      level: story.level + 1,
    };
  } catch (error) {
    throw error;
  }
};
