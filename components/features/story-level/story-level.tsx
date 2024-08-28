"use client";

import { useState } from "react";

import { Level } from "@/components/shared/types";
import { Button, Textarea } from "@/components/ui";

type Props = {
  getNextLevel: (choice: string, storyLevel: string) => void;
  level: Level;
};

export default function StoryLevel({ getNextLevel, level }: Props) {
  const [choice, setChoice] = useState<string>("");
  const [choicesOption, setChoicesOption] = useState<boolean>(false);

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      getNextLevel(choice, level.storyline);
    }
  };

  return (
    <div className="flex-row justify-center px-5 text-center sm:px-40">
      <p className="mb-5 mt-10 text-sm md:text-xl">{level.storyline}</p>

      <div className="flex flex-col gap-3">
        <div className="flex w-full items-center justify-center gap-5">
          {level.choices &&
            choicesOption &&
            level.choices.map((choice: string, index: number) => (
              <Button
                className="h-40 w-60 text-wrap"
                key={index}
                onClick={() => getNextLevel(choice, level.storyline)}
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
                onClick={() => getNextLevel(choice, level.storyline)}
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
  );
}
