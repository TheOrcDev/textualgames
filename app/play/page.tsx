"use client";

import { useState } from "react";

import { Story } from "@/components/shared/types";
import { characters, plots, items } from "@/components/shared/data";

import { Input } from "@/components/ui";
import {
  LoadingSentences,
  SelectItems,
  Genres,
  StoryLevel,
} from "@/components/features";

import { chatGptData } from "@/libs/gpt";

import { createStory } from "..";
import Image from "next/image";
import { Button } from "@/components/ui";

export default function PlayPage() {
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
    await fetchData(randomStory, true);
  };

  const getData = async (choice?: string) => {
    if (choice) {
      story.choice = choice;
    }

    await fetchData(story);
  };

  return (
    <>
      <main>
        {/* Genre select */}
        {genreSelection && (
          <>
            {/* <HeaderContent getRandomGame={getRandomGame} /> */}
            {/* <div id="play" className="mt-20"></div> */}
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
          <div className="mt-5 flex flex-col items-center justify-center gap-5 text-center">
            <Input
              placeholder="enter your name"
              value={name}
              className="w-96"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (name === "") return alert("Please enter a name");
                story.characterName = name;
                setStory(story);
                setNameSelection(false);
                setPlotSelection(true);
              }}
            >
              submit
            </Button>
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
          <div className="mt-5 flex items-center justify-center">
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
