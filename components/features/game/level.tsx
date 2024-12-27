"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Game } from "@/db/schema";
import { getLevel } from "@/server/ai";

import NotEnoughTokens from "../not-enough-tokens/not-enough-tokens";

interface Props {
  game: Game;
}

export default function GameLevel({ game }: Props) {
  const storylineParts = game.levels[0].storyline
    .split(".")
    .filter((part: string) => part.trim());

  const defaultChoices = JSON.parse(game.levels[0].choices);

  const [isLoading, setIsLoading] = useState(false);
  const [hasNoTokens, setHasNoTokens] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showChoices, setShowChoices] = useState(false);
  const [gameText, setGameText] = useState(storylineParts);
  const [choices, setChoices] = useState(defaultChoices);

  const goToNextLevel = async (choice: string) => {
    game.choice = choice;

    try {
      const data = await getLevel(game);

      if (data === "Not enough tokens") {
        setHasNoTokens(true);
        return;
      }

      const storylineParts = data.level.storyline
        .split(".")
        .filter((part: string) => part.trim());

      const newChoices = data.level.choices;

      setGameText(storylineParts);
      setChoices(newChoices);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    try {
      await goToNextLevel(userInput);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    setUserInput("");
  };

  const handleChoiceSelect = async (choice: string) => {
    setIsLoading(true);
    setShowChoices(false);

    try {
      await goToNextLevel(choice);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasNoTokens) {
    return <NotEnoughTokens />;
  }

  return (
    <div className="p-6 font-mono">
      {game.levels.length}
      <div className="mx-auto max-w-4xl space-y-6">
        {game.levels[0].image && (
          <Image
            src={game.levels[0].image}
            alt={game.character.name}
            width={1000}
            height={1000}
            className="rounded-lg"
          />
        )}

        {/* Story Display */}
        <div className="rounded-lg border border-red-900/50 bg-background p-6 shadow-lg">
          <div className="space-y-4 whitespace-pre-wrap">
            {isLoading ? (
              <p>Your story is loading...</p>
            ) : (
              gameText.map((part, index) => (
                <p key={index} className="mb-2">
                  {part.trim() + "."}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="rounded-lg border border-red-900/50 bg-transparent p-1">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="What do you do?"
            className="min-h-[100px] resize-none border-0 bg-transparent text-white placeholder:text-gray-500 focus-visible:ring-0"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleInputSubmit}
            className="w-32 bg-red-700 font-mono hover:bg-red-600"
            disabled={!userInput.trim()}
          >
            Go
          </Button>
          <Dialog open={showChoices} onOpenChange={setShowChoices}>
            <DialogTrigger asChild>
              <Button className="w-32 bg-red-700 font-mono hover:bg-red-600">
                Choices
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Available Choices</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Select your next action carefully
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {choices?.map((choice: string) => (
                  <Button
                    type="button"
                    key={choice}
                    onClick={() => handleChoiceSelect(choice)}
                    variant="outline"
                    className="justify-start text-wrap p-10 text-left font-mono"
                  >
                    {choice}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
