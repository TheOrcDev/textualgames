"use client";

import { useState } from "react";

import { Story } from "@/components/shared/types";
import { characters, plots, items } from "@/components/shared/data";
import {
  LoadingSentences,
  SelectItems,
  StoryLevel,
  Input,
  Button,
  HeaderContent,
  Genres,
} from "@/components";

import { chatGptData } from "@/libs/gpt";

import { createStory } from ".";
import Image from "next/image";

export default function Home() {
  const [story, setStory] = useState<Story>(createStory);

  const [genreSelection, setGenreSelection] = useState(true);
  const [characterSelection, setCharacterSelection] = useState(false);
  const [nameSelection, setNameSelection] = useState(false);
  const [plotSelection, setPlotSelection] = useState(false);
  const [itemSelection, setItemSelection] = useState(false);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchData = async (input: Story, isRandom = false) => {
    setLoading(true);

    try {
      const gptData = await chatGptData(input);
      const storyData = await JSON.parse(gptData.data);
      const level = gptData.level;
      const image = gptData.image;

      input.levelInfo = storyData;
      input.level = level;
      input.characterName = storyData.characterName;
      input.image = image;
      setStory(input);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getRandomGame = async () => {
    setGenreSelection(false);
    const randomStory = createStory(true);
    const orc = "orc";
    await fetchData(orc, true);
  };

  const getData = async (choice?: string) => {
    if (choice) {
      story.choice = choice;
    }

    await fetchData(story);
  };

  return (
    <>
      <main className={`bg-[url('/img/bg.jpg')] bg-no-repeat pt-10 pb-20`}>
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

        <div className="flex flex-col bg-zinc-400"></div>

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

        {story.image && (
          <div className="flex justify-center items-center mt-5">
            <Image
              src={story.image}
              width={1024}
              height={1024}
              alt="AI Image"
            />
          </div>
        )}

        {/* Story level */}
        {story.levelInfo.storyline && !loading && (
          <StoryLevel level={story.levelInfo} getNextLevel={getData} />
        )}

        {/* Loading */}
        {loading && <LoadingSentences />}
      </main>
    </>
  );
}
