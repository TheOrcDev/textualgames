import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";
import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import { getStory } from "@/libs/libs";
import { Story } from "@/libs/story-creator";
import { LoadingSentences } from "@/components/LoadingSentences/LoadingSentences";
import { Footer } from "@/components/Layout/Footer";
import GenreSelect from "@/components/GenreSelect/GenreSelect";
import StoryLevel from "@/components/StoryLevel/StoryLevel";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [story, setStory] = useState<Story>({
    story: {
      story: "",
      choices: [],
      inventory: [],
      whatHappenedSoFar: "",
    },
    choice: "",
    character: "",
    characterName: "",
    level: 2,
    characterStory: {
      plot: "",
      characterType: "",
      items: [],
    },
    genre: "",
  });

  const [loading, setLoading] = useState(false);

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

  return (
    <main
      className={`${pressStart2P.className} bg-fixed h-screen bg-[url('/img/bg.webp')] bg-repeat-y pt-20`}
    >
      {/* Genre select */}
      {!story.story.story && !loading && <GenreSelect getData={getData} />}

      {/* Character select */}
      {/* {story.genre && !story.story && !loading &&
        <div className="flex justify-center">
          TODO: make character selection
        </div>
      } */}

      {/* Character plot select */}
      {/* {story.character && !story.story && !loading &&
        <div className="flex justify-center">
          TODO: make character plot
        </div>
      } */}

      {/* Items select */}
      {/* {story.plot && !story.story && !loading &&
        <div className="flex justify-center">
          TODO: make character plot
          TODO: Do getData() here
        </div>
      } */}

      {/* Story level */}
      {story.story && !loading && (
        <StoryLevel level={story.story} getNextLevel={getNextLevel} />
      )}

      {/* Loading */}
      {loading && <LoadingSentences />}

      {/* Footer */}
      <Footer />
    </main>
  );
}
