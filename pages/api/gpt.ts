// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GPT_API_KEY}`,
    'Access-Control-Allow-Origin': '*',
  };

  const settingsForPrompt = "with at least five levels in json format like this { story: string; choices: { text: string; story: Story; }[]; }.";

  let basePrompt = `Give me a textual game story with two choices on each level about a cowboy fighting aliens and using his gun ${settingsForPrompt}}`;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: basePrompt }
      ],
      temperature: 0.8,
      max_tokens: 1024,
    }),
  });

  const data = await response.json();

  console.log(data.choices);
  res.status(200).json({
    message: 'success',
    data: data.choices[0],
  })
}
