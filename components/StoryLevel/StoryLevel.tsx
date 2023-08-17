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

  return (
    <div
      className="
    flex-row justify-center text-center px-5 sm:px-40"
    >
      <p className="text-sm md:text-xl mt-10 mb-5">{level.story}</p>
      {level.choices ? (
        level.choices.map((choice: string, index: number) => (
          <div className="flex justify-center m-5" key={index}>
            <Button
              content={choice}
              onClick={() => getNextLevel(choice, level.story)}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center m-5">
          <Button content="Play New Story" />
        </div>
      )}
      {/* <input
        type="text"
        value={choice}
        onChange={(value) => setChoice(value.target.value)}
        className="border-2 border-black text-black w-full h-10"
      />
      <Button
        content={"Go"}
        onClick={() => getNextLevel(choice, level.story)}
      /> */}
    </div>
  );
};

export default StoryLevel;
