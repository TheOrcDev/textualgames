import type { NextApiRequest, NextApiResponse } from "next";
import StoryCreator from "@/libs/story-creator";

type Data = {
  data: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GPT_API_KEY}`,
    "Access-Control-Allow-Origin": "*",
  };
  let body;

  if (req.body) {
    body = JSON.parse(req.body);
  }

  const { story } = body;

  const creator = new StoryCreator();
  const storyPrompt = await creator.getGptStoryPrompt(story);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: storyPrompt.basePrompt }],
      temperature: 0.8,
      max_tokens: 1024,
    }),
  });

  const data = await response.json();

  if (data.choices[0].finish_reason === "length") {
    console.log("Too long prompt");
    throw new Error("Too long prompt");
  }

  res.status(200).json({
    message: "success",
    data: {
      data: data.choices[0].message.content,
      story: story.storyLevel,
      level: story.level + 1,
    },
  });
}
