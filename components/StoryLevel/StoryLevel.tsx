"use client";

import Button from "@/components/Button/Button";
import { Level } from "@/libs/story-creator";
import { useState } from "react";

export interface StoryLevelProps {
  getNextLevel: (choice: string, storyLevel: string) => void;
  level: Level;
}

export const StoryLevel: React.FC<StoryLevelProps> = ({
  getNextLevel,
  level,
}) => {
  const [choice, setChoice] = useState<string>("");
  const [choicesOption, setChoicesOption] = useState<boolean>(false);

  const enter = (event: any) => {
    if (event.key === "Enter") {
      getNextLevel(choice, level.story);
    }
  };

  return (
    <div
      className="
    flex-row justify-center text-center px-5 sm:px-40"
    >
      <p className="text-sm md:text-xl mt-10 mb-5">{level.story}</p>
      {level.choices &&
        choicesOption &&
        level.choices.map((choice: string, index: number) => (
          <div className="flex justify-center m-5" key={index}>
            <Button
              content={choice}
              onClick={() => getNextLevel(choice, level.story)}
            />
          </div>
        ))}
      {choicesOption && (
        <Button
          content="Manual"
          onClick={() => setChoicesOption(!choicesOption)}
        />
      )}
      {!choicesOption && (
        <>
          <textarea
            value={choice}
            onChange={(value) => setChoice(value.target.value)}
            className="border-2 border-black text-black w-full p-5"
            rows={5}
            onKeyDown={(e) => enter(e)}
          ></textarea>
          <div className="w-full flex justify-center gap-5">
            <Button
              content="Go"
              onClick={() => getNextLevel(choice, level.story)}
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
};

export default StoryLevel;
