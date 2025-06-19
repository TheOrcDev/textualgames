"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Game } from "@/db/schema";
import { getLevel } from "@/server/ai";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import LoadingSentences from "../loading-sentences";
import NotEnoughTokens from "../not-enough-tokens/not-enough-tokens";

interface Props {
  game: Game;
}

export default function GameLevel({ game }: Props) {
  const router = useRouter();

  const defaultChoices = JSON.parse(game.levels[0].choices);
  const storylineParts = game.levels[0].storyline
    .split(".")
    .filter((part: string) => part.trim());

  const [isLoading, setIsLoading] = useState(false);
  const [hasNoTokens, setHasNoTokens] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showChoices, setShowChoices] = useState(false);
  const [gameText, setGameText] = useState(storylineParts);
  const [choices, setChoices] = useState(defaultChoices);

  if (!game.levels[0]) {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <p>No levels found, please create a new game.</p>
        <Link href={"/play/create-character"}>
          <Button>Create New Game</Button>
        </Link>
      </div>
    );
  }

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
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey && e.key === "Enter") || (e.metaKey && e.key === "Enter")) {
      handleInputSubmit();
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

  if (isLoading) {
    return <LoadingSentences />;
  }

  return (
    <div className="p-6 font-mono">
      <div className="mx-auto max-w-4xl space-y-6">
        {game.levels[0].image && (
          <Image
            src={game.levels[0].image}
            alt={game.character?.name ?? game.genre}
            width={1000}
            height={1000}
            className="rounded-lg"
          />
        )}

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

        <div className="rounded-lg border border-red-900/50 bg-transparent p-1">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="What do you do?"
            className="min-h-[100px] resize-none border-0 bg-transparent focus-visible:ring-0"
          />
        </div>

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
