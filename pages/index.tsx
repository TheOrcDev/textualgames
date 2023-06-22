import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";
import { Inter } from "next/font/google";
import { useState } from "react";
import { Press_Start_2P } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Story = {
  story: string;
  choices: string[];
};

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [story, setStory] = useState<Story>({
    story: "",
    choices: [],
  });
  const [character, setCharacter] = useState<string>("");
  const [level, setLevel] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const genres = [
    "Fantasy",
    "Adventure",
    "Comedy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
  ];

  const getData = async (genre: string) => {
    console.log(genre);
    setLoading(true);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ genre }),
    });
    const result = await chatGptData.json();
    const firstLevel = await JSON.parse(result.data.data.message.content);
    const character = result.data.story;
    setCharacter(character);
    setStory(firstLevel);
    setLoading(false);
  };

  const getNextLevel = async (choice: string, story: string) => {
    setLoading(true);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ choice, story, character, level }),
    });
    const result = await chatGptData.json();
    const nextLevel = await JSON.parse(result.data.data.message.content);
    setLevel(result.data.level);
    setStory(nextLevel);
    setLoading(false);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <div className={pressStart2P.className}>
        <div className="absolute bottom-5 left-22">
          <h1 className="text-xs mt-10">Textual Games</h1>
        </div>
        <div className="flex h-screen place-items-center">
          {!story.story && !loading && (
            <div className="flex">
              {genres.map((genre: string, index: number) => (
                <div className="flex justify-center" key={index}>
                  <ButtonBadge
                    content={genre}
                    onClick={() => getData(genre)}
                    color="bg-slate-400"
                  />
                </div>
              ))}
            </div>
          )}
          {loading && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
          )}
          {story.story && !loading && (
            <div className="flex-row justify-center text-center max-w-6xl">
              <p className="text-xl mt-10 mb-5">{story.story}</p>
              {story.choices &&
                story.choices.map((choice: string, index: number) => (
                  <div className="flex justify-center" key={index}>
                    <ButtonBadge
                      content={choice}
                      onClick={() => getNextLevel(choice, story.story)}
                      color="#8294C4"
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
