"use client";

import { useState } from "react";

import { type Story } from "@/libs/story-creator";
import { characters, plots, items } from "@/libs/data";
import { chatGptData } from "@/libs/gpt";

import {
  LoadingSentences,
  Footer,
  SelectItems,
  StoryLevel,
  Input,
  Button,
  HeaderContent,
  Genres,
} from "@/components";
import { createStory } from ".";

export const Game: React.FC = () => {
  const [story, setStory] = useState<Story>(createStory);

  const [genreSelection, setGenreSelection] = useState(true);
  const [characterSelection, setCharacterSelection] = useState(false);
  const [nameSelection, setNameSelection] = useState(false);
  const [plotSelection, setPlotSelection] = useState(false);
  const [itemSelection, setItemSelection] = useState(false);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  // Random
  const getRandomGame = async () => {
    setLoading(true);
    setGenreSelection(false);
    const randomStory = createStory(true);

    try {
      const gptData = await chatGptData(randomStory);
      const storyData = await JSON.parse(gptData.data);
      const level = gptData.level;

      randomStory.story = storyData;
      randomStory.level = level;
      randomStory.characterName = storyData.characterName;
      setStory(randomStory);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Start the game
  const getData = async (choice?: string) => {
    setLoading(true);

    try {
      if (choice) {
        story.choice = choice;
      }
      const gptData = await chatGptData(story);
      const storyData = await JSON.parse(gptData.data.data);
      const level = gptData.data.level;

      story.story = storyData;
      story.level = level;
      story.characterName = storyData.characterName;
      setStory(story);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <main className={`bg-[url('/img/bg.jpg')] bg-no-repeat pt-20 pb-20`}>
        {/* Genre select */}
        {genreSelection && (
          <>
            <HeaderContent getRandomGame={getRandomGame} />
            <div id="play" className="mt-20"></div>
            <Genres
              select={(choice) => {
                story.genre = choice;
                setStory(story);
                setGenreSelection(false);
                setCharacterSelection(true);
              }}
            />
          </>
        )}

        {/* Character select */}
        {characterSelection && (
          <SelectItems
            items={characters}
            select={(choice) => {
              story.characterStory.characterType = choice;
              setStory(story);
              setCharacterSelection(false);
              setNameSelection(true);
            }}
          />
        )}

        {/* Character name input */}
        {nameSelection && (
          <div className="flex flex-col justify-center items-center text-center mt-5">
            <Input
              placeholder="enter your name"
              value={name}
              onChange={(e) => {
                setName(e);
              }}
            />
            <div className="w-60">
              <Button
                content="submit"
                onClick={() => {
                  if (name === "") return alert("Please enter a name");
                  story.characterName = name;
                  setStory(story);
                  setNameSelection(false);
                  setPlotSelection(true);
                }}
              />
            </div>
          </div>
        )}

        {/* Character plot select */}
        {plotSelection && (
          <SelectItems
            items={plots}
            select={(choice) => {
              story.characterStory.plot = choice;
              setStory(story);
              setPlotSelection(false);
              setItemSelection(true);
            }}
          />
        )}

        {/* Items select */}
        {itemSelection && (
          <SelectItems
            items={items}
            select={(choice) => {
              story.characterStory.items.push(choice);
              setStory(story);
              setItemSelection(false);
              getData();
            }}
          />
        )}

        {/* Story level */}
        {story.story.story && !loading && (
          <StoryLevel level={story.story} getNextLevel={getData} />
        )}

        {/* Loading */}
        {loading && <LoadingSentences />}

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default Game;
