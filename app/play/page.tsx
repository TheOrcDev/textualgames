"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Genres,
  LoadingSentences,
  SelectItems,
  StoryLevel,
} from "@/components/features";
import NotEnoughTokens from "@/components/features/not-enough-tokens/not-enough-tokens";
import { characters, items, plots } from "@/components/shared/data";
import { Story } from "@/components/shared/types";
import { Button, Input } from "@/components/ui";
import { trpc } from "@/server/client";

import { createStory } from "..";

export default function PlayPage() {
  const level = trpc.ai.getLevel.useMutation();
  const [story, setStory] = useState<Story>(createStory);

  const [genreSelection, setGenreSelection] = useState(true);
  const [characterSelection, setCharacterSelection] = useState(false);
  const [nameSelection, setNameSelection] = useState(false);
  const [plotSelection, setPlotSelection] = useState(false);
  const [itemSelection, setItemSelection] = useState(false);
  const [hasNoTokens, setHasNoTokens] = useState(false);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchData = async (story: Story) => {
    setLoading(true);

    try {
      const gptData = await level.mutateAsync({
        story,
      });

      if (gptData === "Not enough tokens") {
        setLoading(false);
        setHasNoTokens(true);
        return;
      }

      const storyData = await JSON.parse(gptData.data);
      const { image } = gptData;

      story.level = storyData;
      story.image = image;

      setStory(story);

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

        {hasNoTokens && (
          <div className="flex flex-col items-center justify-center gap-5 p-24">
            <NotEnoughTokens />
          </div>
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
