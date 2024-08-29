"use client";

import { useState } from "react";
import Image from "next/image";

import { Game } from "@/components/shared/types";
import { Button, Textarea } from "@/components/ui";
import { trpc } from "@/server/client";

import LoadingSentences from "../loading-sentences/loading-sentences";
import NotEnoughTokens from "../not-enough-tokens/not-enough-tokens";

type Props = {
  game: Game;
};

export default function StoryLevel({ game }: Props) {
  const nextLevel = trpc.ai.getLevel.useMutation();
  const utils = trpc.useUtils();

  const [choice, setChoice] = useState<string>("");
  const [choicesOption, setChoicesOption] = useState<boolean>(false);
  const [hasNoTokens, setHasNoTokens] = useState(false);

  const choices = JSON.parse(game.levels[0].choices);

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      goToNextLevel(choice);
    }
  };

  const goToNextLevel = async (choice: string) => {
    game.choice = choice;

    try {
      const data = await nextLevel.mutateAsync({
        game,
      });

      if (data === "Not enough tokens") {
        setHasNoTokens(true);
        return;
      }

      utils.games.get.refetch();
      utils.tokens.getTokens.refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {nextLevel.isPending && <LoadingSentences />}

      {hasNoTokens && (
        <div className="flex flex-col items-center justify-center gap-5 p-24">
          <NotEnoughTokens />
        </div>
      )}

      {!nextLevel.isPending && game.levels[0].image && (
        <div className="mt-5 flex items-center justify-center">
          <Image
            src={game.levels[0].image}
            width={1024}
            height={1024}
            alt="AI Image"
          />
        </div>
      )}

      {!nextLevel.isPending && (
        <div className="flex-row justify-center px-5 text-center sm:px-40">
          <p className="mb-5 mt-10 text-sm md:text-xl">
            {game.levels[0].storyline}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex w-full items-center justify-center gap-5">
              {choices &&
                choicesOption &&
                choices.map((choice: string, index: number) => (
                  <Button
                    className="h-40 w-60 text-wrap"
                    key={index}
                    onClick={() => goToNextLevel(choice)}
                  >
                    {choice}
                  </Button>
                ))}
            </div>

            {choicesOption ? (
              <div>
                <Button onClick={() => setChoicesOption(!choicesOption)}>
                  Manual
                </Button>
              </div>
            ) : (
              <>
                <Textarea
                  value={choice}
                  onChange={(value) => setChoice(value.target.value)}
                  rows={5}
                  onKeyDown={onKeyDown}
                ></Textarea>
                <div className="flex justify-center gap-5">
                  <Button
                    className="h-20 w-60"
                    onClick={() => goToNextLevel(choice)}
                  >
                    Go
                  </Button>
                  <Button
                    className="h-20 w-60"
                    onClick={() => setChoicesOption(!choicesOption)}
                  >
                    Choices
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
