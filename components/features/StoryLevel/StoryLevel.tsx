"use client";

import { useState } from "react";

import Button from "@/components/shared/ui/TButton/TButton";
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
    <div className="flex-row justify-center text-center px-5 sm:px-40">
      <p className="text-sm md:text-xl mt-10 mb-5">{level.storyline}</p>

      {level.availableChoices &&
        choicesOption &&
        level.availableChoices.map((choice: string, index: number) => (
          <div className="flex justify-center m-5" key={index}>
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
            className="border-2 border-black text-black w-full p-5"
            rows={5}
            onKeyDown={onKeyDown}
          ></textarea>
          <div className="w-full flex justify-center gap-5">
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
