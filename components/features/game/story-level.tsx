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

  const onKeyDown = (event: React.KeyboardEvent) => {
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

  const storylineParts = level.storyline
    .split(".")
    .filter((part) => part.trim());

  return (
    <div className="flex flex-col gap-5">
      {currentLevel.isPending && <LoadingSentences />}

      {hasNoTokens && (
        <div className="flex flex-col items-center justify-center gap-5 p-24">
          <NotEnoughTokens />
        </div>
      )}

      {!currentLevel.isPending && level.image && (
        <div className="flex items-center justify-center">
          <Image src={level.image} width={1024} height={1024} alt="AI Image" />
        </div>
      )}

      {!currentLevel.isPending && !hasNoTokens && (
        <div className="flex flex-col justify-center gap-10 md:px-20 lg:px-40">
          <div className="bg-primary/15 p-10 text-sm md:text-xl">
            {storylineParts.map((part, index) => (
              <p key={index} className="mb-2">
                {part.trim() + "."}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-5">
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
              <div className="flex justify-center">
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
                  autoFocus={true}
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
    </div>
  );
}
