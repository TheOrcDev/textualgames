// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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
  console.log(req.body);
  let body;

  if (req.body) {
    body = JSON.parse(req.body);
  }

  const { choice, story } = body || {};

  console.log("choice", choice);
  console.log("story", story);

  let firstPartOfPrompt = `Continue my story ${story} and give me next level of textual game story with two choices. My choice was ${choice}`;

  if (!choice || !story) {
    const stories = [
      "me as a a knight trying to sell carrots to a dragon",
      "me as a banana sold cheap at market, and I am trying to survive in new home with my new friend apple",
      "me as a cyber cowboy fighting the aliens",
      "me as a teardrop in the ocean, trying to be a king of the sea",
      "me as a cat trying to find my way home",
      "me as a dragon trying to find love",
      "me as a barbarian which is trying to find a way to start sewing",
    ];

    firstPartOfPrompt =
      "Give me the first level of textual game story with two choices about";
    const gameStory = stories[Math.floor(Math.random() * stories.length)];
    firstPartOfPrompt = `${firstPartOfPrompt} ${gameStory}`;
    console.log("gameStory", gameStory);
  }

  const settingsForPrompt =
    "in json format like this { story: string; choices: string[]; }.";

  let basePrompt = `${firstPartOfPrompt} ${settingsForPrompt}}`;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: basePrompt }],
      temperature: 0.8,
      max_tokens: 1024,
    }),
  });

  const data = await response.json();

  if (data.choices[0].finish_reason === "length") {
    console.log("Too long prompt");
  }

  res.status(200).json({
    message: "success",
    data: data.choices[0],
  });
}
