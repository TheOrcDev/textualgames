"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Genres,
  LoadingSentences,
  NotEnoughTokens,
  SelectItems,
} from "@/components/features";
import { characters, items, plots } from "@/components/shared/data";
import { Game } from "@/components/shared/types";
import { Button, Input } from "@/components/ui";
import { trpc } from "@/server/client";

import { createStory } from "..";

export default function PlayPage() {
  const router = useRouter();
  const level = trpc.ai.getLevel.useMutation();
  const utils = trpc.useUtils();
  const [story, setStory] = useState<Game>(createStory);

  const [genreSelection, setGenreSelection] = useState(true);
  const [characterSelection, setCharacterSelection] = useState(false);
  const [nameSelection, setNameSelection] = useState(false);
  const [plotSelection, setPlotSelection] = useState(false);
  const [itemSelection, setItemSelection] = useState(false);
  const [hasNoTokens, setHasNoTokens] = useState(false);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchData = async (game: Game) => {
    setLoading(true);

    try {
      const data = await level.mutateAsync({
        game,
      });

      if (data === "Not enough tokens") {
        setLoading(false);
        setHasNoTokens(true);
        return;
      }

      utils.tokens.getTokens.refetch();
      router.push(`/game/${data}`);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (genreSelection) {
    return (
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
    );
  }

  if (loading) {
    return <LoadingSentences />;
  }

  return (
    <main className="p-12 lg:p-24">
      {/* Character select */}
      {characterSelection && (
        <>
          <SelectItems
            items={characters}
            select={(characterType) => {
              story.character.type = characterType;
              setStory(story);
              setCharacterSelection(false);
              setNameSelection(true);
            }}
          />
        </>
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
              // TODO: Validation for name
              if (name === "") return alert("Please enter a name");
              story.character.name = name;
              setStory(story);
              setNameSelection(false);
              setPlotSelection(true);
            }}
          >
            Submit
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
            story.character.items = JSON.stringify([item]);
            setStory(story);
            setItemSelection(false);
            fetchData(story);
          }}
        />
      )}

      {hasNoTokens && (
        <div className="flex flex-col items-center justify-center gap-5">
          <NotEnoughTokens />
        </div>
      )}
    </main>
  );
}
