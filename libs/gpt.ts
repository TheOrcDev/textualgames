"use server";

import StoryCreator, { Story } from "./story-creator";

export const chatGptData = async (story: Story) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GPT_API_KEY}`,
    "Access-Control-Allow-Origin": "*",
  };

  const creator = new StoryCreator();
  const storyPrompt = await creator.getGptStoryPrompt(story);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: process.env.GPT_MODEL,
      messages: [{ role: "user", content: storyPrompt.basePrompt }],
      temperature: parseInt(process.env.GPT_TEMPERATURE ?? "0.8"),
      max_tokens: parseInt(process.env.GPT_MAX_TOKENS ?? "1048"),
    }),
  });

  const data = await response.json();

  if (data.choices[0].finish_reason === "length") {
    console.log("Too long prompt");
    throw new Error("Too long prompt");
  }

  return {
    message: "success",
    data: {
      data: data.choices[0].message.content,
      story: story.level,
      level: story.level + 1,
    },
  };
};
