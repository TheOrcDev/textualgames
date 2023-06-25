import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";
import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import { getStory } from "@/libs/libs";
import { Story } from "@/libs/story-creator";
import { LoadingSentences } from "@/components/LoadingSentences/LoadingSentences";
import { Footer } from "@/components/Layout/Footer";
import { useRouter } from "next/router";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [story, setStory] = useState<Story>({
    story: {
      story: "",
      choices: [],
    },
    choice: "",
    character: "",
    characterName: "",
    level: 1,
    characterStory: {
      plot: "",
      characterType: "",
    },
    genre: "",
  });

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
    const characterStory = getStory();

    story.genre = genre;
    story.characterStory = characterStory;
    setStory(story);

    setLoading(true);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ story }),
    });
    const result = await chatGptData.json();
    try {
      const firstLevel = await JSON.parse(result.data.data);

      story.story = firstLevel;
      story.characterName = firstLevel.characterName;
      story.character = result.data.character;
      setStory(story);

      setLoading(false);
    } catch (e) {
      console.log(e);
      console.log("restarting");
      getData(genre);
    }
  };

  const getNextLevel = async (choice: string, storyLevel: string) => {
    setLoading(true);

    story.choice = choice;
    setStory(story);

    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ story }),
    });
    const result = await chatGptData.json();
    try {
      const nextLevel = await JSON.parse(result.data.data);

      story.story = nextLevel;
      story.level = result.data.level;
      setStory(story);

      window.scrollTo(0, 0);
      setLoading(false);
    } catch (e) {
      console.log(e);
      console.log("restarting");
      getNextLevel(choice, storyLevel);
    }
  };
  const router = useRouter();

  return (
    <main
      className={`${pressStart2P.className} bg-fixed h-screen bg-[url('/img/bg.webp')] bg-repeat-y`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-20 mx-4 sm:mx-10 md:mx-32">
        {!story.story.story &&
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
        <div className="flex-row justify-center text-center px-5 sm:px-40 pb-20">
          <p className="text-sm md:text-xl mt-10 mb-5">{story.story.story}</p>
          {story.story.choices ? (
            story.story.choices.map((choice: string, index: number) => (
              <div className="flex justify-center" key={index}>
                <ButtonBadge
                  content={choice}
                  onClick={() => getNextLevel(choice, story.story.story)}
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <ButtonBadge
                content="Play New Story"
                onClick={() => router.reload()}
              />
            </div>
          )}
        </div>
      )}
      <Footer />
    </main>
  );
}
