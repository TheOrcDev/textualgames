import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type Story = {
  story: string;
  choices: string[];
};

export default function Home() {
  const [story, setStory] = useState<Story>({
    story: "",
    choices: [],
  });

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
    });
    const result = await chatGptData.json();
    const firstLevel = await JSON.parse(result.data.message.content);
    setStory(firstLevel);
    setLoading(false);
    console.log(firstLevel);
  };

  const getNextLevel = async (choice: string, story:string) => {
    console.log(story);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ choice, story }),
    });
    const result = await chatGptData.json();
    const nextLevel = await JSON.parse(result.data.message.content);
    setStory(nextLevel);
    console.log(nextLevel);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <div className="flex flex-col items-center">
        <div className="grid h-screen place-items-center">
          {!story.story && !loading && (
            <ButtonBadge content="Play The Game" onClick={getData} />
          )}
          {loading && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
          )}
          {story.story && (
            <div className="flex-row justify-center text-center max-w-6xl">
              <p className="text-2xl mt-10 mb-5">{story.story}</p>
              {story.choices && story.choices.map((choice: string, index: number) => (
                <div className="flex justify-center" key={index}>
                  <ButtonBadge
                    content={choice}
                    onClick={() => getNextLevel(choice, story.story)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
