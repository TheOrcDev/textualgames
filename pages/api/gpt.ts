// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getStory } from "../../libs/libs";

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

  const { choice, story, character, level, genre } = body || {};

  let numberOfChoices = "two";

  if (level === 3 || level >= 5) {
    numberOfChoices = "three";
  }

  let firstPartOfPrompt = `Continue my story with ${character}. My current level is ${story}. My choice was ${choice}. Give me next level based on my choice, with ${numberOfChoices} new choices. Genre is ${genre}.`;
  const oneBadOutcome =
    "One choice outcome should be a bad one, and will harm the character.";

  const twoBadOutcomes =
    "Two choice outcomes should be a bad ones, and will harm the character.";

  if (level === 3) {
    const somethingBig = `In this level something big should happen, like a big fight or a big decision (depending on the current story circumstances). ${oneBadOutcome}`;
    firstPartOfPrompt = `${firstPartOfPrompt} ${somethingBig}`;
  }

  if (level === 5) {
    firstPartOfPrompt = `${firstPartOfPrompt} ${oneBadOutcome} and make some kind of nemesis for my character.`;
  }

  if (level >= 7) {
    firstPartOfPrompt = `${firstPartOfPrompt} ${twoBadOutcomes}`;
  }

  // If there is no story, we need to get it from the database
  const gameStory = story ? story : await getStory();
  if (!choice || !story) {
    firstPartOfPrompt = `Give me the first level of textual game story in ${genre} genre with two choices about ${gameStory}. First describe my character and give the apropiate name to it.`;
  }

  const settingsForPrompt = `in json format like this { story: string; choices: string[]; }, choices should sound like coming from first person game don't put any option 1, or 1) or a) or similar. Story string inside the object shouldn't have any choices in it. Make sure that the story is ${genre} genre, with choices in that manner also.`;

  let basePrompt = `${firstPartOfPrompt} ${settingsForPrompt}}`;

  // If level is 10, we are ending the story
  if (level === 10) {
    basePrompt = `End my story with ${character}. My current level is ${story}. My choice was ${choice}. Genre is ${genre}. in json format like this { story: string; }`;
  }

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
    throw new Error("Too long prompt");
  }

  res.status(200).json({
    message: "success",
    data: {
      data: data.choices[0] ? data.choices[0].text : undefined,
      story: gameStory ? gameStory : undefined,
      level: level + 1,
    },
  });
}
