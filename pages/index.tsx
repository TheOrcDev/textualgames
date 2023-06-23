import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";
import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import { getStory } from "@/libs/libs";
import { CharacterStory } from "@/libs/story-creator";
import { LoadingSentences } from "@/components/LoadingSentences/LoadingSentences";

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
  const [storyLevel, setStoryLevel] = useState<string>("");
  const [character, setCharacter] = useState<string>("");
  const [characterName, setCharacterName] = useState<string>("");
  const [level, setLevel] = useState<number>(1);
  const [characterStory, setCharacterStory] = useState<CharacterStory>();
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
  const [genre, setGenre] = useState<string>();

  const getData = async (genre: string) => {
    const characterStory = getStory();
    setCharacterStory(characterStory);
    setGenre(genre);
    setLoading(true);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ genre, characterStory }),
    });
    const result = await chatGptData.json();
    try {
      const firstLevel = await JSON.parse(result.data.data);
      const storyLevel = result.data.story;
      setStoryLevel(storyLevel);
      setCharacter(result.data.character);
      setCharacterName(firstLevel.characterName);
      setStory(firstLevel);
      setLoading(false);
    } catch (e) {
      console.log(e);
      console.log("restarting");
      getData(genre);
    }
  };

  const getNextLevel = async (choice: string, story: string) => {
    setLoading(true);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({
        choice,
        story,
        character,
        level,
        genre,
        storyLevel,
        characterName,
        characterStory,
      }),
    });
    const result = await chatGptData.json();
    try {
      const nextLevel = await JSON.parse(result.data.data);
      setLevel(result.data.level);
      setStory(nextLevel);
      window.scrollTo(0, 0);
      setLoading(false);
    } catch (e) {
      console.log(e);
      console.log("restarting");
      getNextLevel(choice, story);
    }
  };

  return (
    <main className={`${pressStart2P.className} bg-fixed h-screen`}>
      <h1 className="fixed bottom-5 left-5 text-xs">Textual Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-20 mx-4 sm:mx-10 md:mx-32">
        {!story.story &&
          !loading &&
          genres.map((genre: string, index: number) => (
            <div className="flex items-center" key={index}>
              <ButtonBadge
                content={genre}
                onClick={() => getData(genre)}
                color="bg-slate-400"
              />
            </div>
          ))}
      </div>
      {loading && <LoadingSentences />}
      {story.story && !loading && (
        <div className="flex-row justify-center text-center px-5 sm:px-40">
          <p className="text-sm md:text-xl mt-10 mb-5">{story.story}</p>
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
    </main>
  );
}
