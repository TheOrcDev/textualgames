"use server";

import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

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
  const items = story.characterStory.items.toString();

  const imagePrompt = `
  Give me a scenery image for the visual novel game.

  The main storyline is ${story.characterStory.plot}.

  My character is a ${story.characterStory.characterType}, and is carrying these items: ${items}

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
    }
  );

  const image = await imageResponse.json();

  return image.data[0].url;
};

import StoryCreator from "./story-creator";
import { Story } from "../components/shared/types";

export const chatGptData = async (story: Story) => {
  try {
    const creator = new StoryCreator();

    const input =
      story.level === 1
        ? (await creator.getGptStoryPrompt(story)).basePrompt
        : (await creator.getNextLevel(story)).basePrompt;

    const image = await getDalle3Image(input, story);

    const response = await chain.call({ input });
    const data = await response.response;

    return {
      data,
      level: story.level + 1,
      image,
    };
  } catch (error) {
    throw error;
  }
};
