"use client";

import { StoryLevel } from "@/components/features";
import {
  Character,
  Genre,
  type Game as GameType,
} from "@/components/shared/types";
import { Skeleton } from "@/components/ui";
import { trpc } from "@/server/client";

import NoGame from "./no-game";

interface Props {
  gameId: string;
}

export default function Game({ gameId }: Props) {
  const game = trpc.games.get.useQuery({
    gameId,
  });

  if (!game.isLoading && !game.data) {
    return <NoGame />;
  }

  if (game.isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="grid gap-3 md:grid-cols-2">
          <Skeleton className="size-72" />
          <Skeleton className="size-72" />
          <Skeleton className="hidden size-72 md:block" />
          <Skeleton className="hidden size-72 md:block" />
        </div>
      </div>
    );
  }

  if (game.data) {
    const gameData: GameType = {
      ...game.data,
      character: (game?.data?.character as Character) ?? {
        type: "",
        id: "",
        name: "",
        createdAt: "",
        gender: "male",
        plot: "",
        items: "",
        gameId: "",
      },
      genre: Genre.FANTASY,
    };

    return <>{game.data && <StoryLevel game={gameData} />}</>;
  }
}
