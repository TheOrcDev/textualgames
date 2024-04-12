"use client";

import { useState } from "react";

import Button from "@/components/shared/ui/Button/Button";
import { GameLevel } from "@/components/shared/types";

type Props = {
  getNextLevel: (choice: string, storyLevel: string) => void;
  level: GameLevel;
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

      {level.availableChoices &&
        choicesOption &&
        level.availableChoices.map((choice: string, index: number) => (
          <div className="m-5 flex justify-center" key={index}>
            <Button
              content={choice}
              onClick={() => getNextLevel(choice, level.storyline)}
            />
          </div>
        ))}

      {choicesOption ? (
        <Button
          content="Manual"
          onClick={() => setChoicesOption(!choicesOption)}
        />
      ) : (
        <>
          <textarea
            value={choice}
            onChange={(value) => setChoice(value.target.value)}
            className="w-full border-2 border-black p-5 text-black"
            rows={5}
            onKeyDown={onKeyDown}
          ></textarea>
          <div className="flex w-full justify-center gap-5">
            <Button
              content="Go"
              onClick={() => getNextLevel(choice, level.storyline)}
            />
            <Button
              content="Choices"
              onClick={() => setChoicesOption(!choicesOption)}
            />
          </div>
        </>
      )}
    </div>
  );
}
