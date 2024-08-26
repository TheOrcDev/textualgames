"use client";

import { useState } from "react";

import Image from "next/image";

import { Story } from "@/components/shared/types";
import { characters, plots, items } from "@/components/shared/data";
import { chatGptData } from "@/libs/gpt";
import { createStory } from "..";

import { Input } from "@/components/ui";
import {
  LoadingSentences,
  SelectItems,
  Genres,
  StoryLevel,
} from "@/components/features";
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

  const fetchData = async (input: Story) => {
    setLoading(true);

    try {
      const gptData = await chatGptData(input);
      const storyData = await JSON.parse(gptData.data);
      const { image } = gptData;

      input.level = storyData;
      input.image = image;

      setStory(input);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
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
            select={(characterType) => {
              story.character.type = characterType;
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
                story.character.name = name;
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
            select={(plot) => {
              story.character.plot = plot;
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
            select={(item) => {
              story.character.items.push(item);
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
        {story.level.storyline && !loading && (
          <StoryLevel level={story.level} getNextLevel={getData} />
        )}

        {/* Loading */}
        {loading && <LoadingSentences />}
      </main>
    </>
  );
}
