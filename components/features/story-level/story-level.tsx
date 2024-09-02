"use client";

import { useState } from "react";
import Image from "next/image";

import { LoadingSentences, NotEnoughTokens } from "@/components/features";
import { Game } from "@/components/shared/types";
import { Button, Textarea } from "@/components/ui";
import { trpc } from "@/server/client";

type Props = {
  game: Game;
};

export default function StoryLevel({ game }: Props) {
  const currentLevel = trpc.ai.getLevel.useMutation();
  const utils = trpc.useUtils();

  const [choice, setChoice] = useState<string>("");
  const [isManualChoice, setIsManualChoice] = useState<boolean>(false);
  const [hasNoTokens, setHasNoTokens] = useState(false);

  const choices = JSON.parse(game.levels[0].choices);
  const level = game.levels[0];

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      goToNextLevel(choice);
    }
  };

  const goToNextLevel = async (choice: string) => {
    game.choice = choice;

    try {
      const data = await currentLevel.mutateAsync({
        game,
      });

      if (data === "Not enough tokens") {
        setHasNoTokens(true);
        return;
      }

      setChoice("");
      utils.games.get.refetch();
      utils.tokens.getTokens.refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {currentLevel.isPending && <LoadingSentences />}

      {hasNoTokens && (
        <div className="flex flex-col items-center justify-center gap-5 p-24">
          <NotEnoughTokens />
        </div>
      )}

      {!currentLevel.isPending && level.image && (
        <div className="mt-5 flex items-center justify-center">
          <Image src={level.image} width={1024} height={1024} alt="AI Image" />
        </div>
      )}

      {!currentLevel.isPending && !hasNoTokens && (
        <div className="flex-row justify-center text-center md:px-20 lg:px-40">
          <p className="mb-5 mt-10 text-sm md:text-xl">{level.storyline}</p>

          <div className="flex flex-col gap-3">
            <div className="flex w-full items-center justify-center gap-5">
              {choices &&
                isManualChoice &&
                choices.map((choice: string, index: number) => (
                  <Button
                    className="size-72 text-wrap"
                    key={index}
                    onClick={() => goToNextLevel(choice)}
                  >
                    {choice}
                  </Button>
                ))}
            </div>

            {isManualChoice ? (
              <div>
                <Button onClick={() => setIsManualChoice(!isManualChoice)}>
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
                    onClick={() => setIsManualChoice(!isManualChoice)}
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
