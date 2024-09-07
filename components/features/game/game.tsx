"use client";

import { StoryLevel } from "@/components/features";
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

  if (!game.isPending && !game.data) {
    return <NoGame />;
  }

  return (
    <>
      {game.isPending && (
        <div className="flex items-center justify-center">
          <div className="grid gap-3 md:grid-cols-2">
            <Skeleton className="size-72" />
            <Skeleton className="size-72" />
            <Skeleton className="hidden size-72 md:block" />
            <Skeleton className="hidden size-72 md:block" />
          </div>
        </div>
      )}

      {game.data && <StoryLevel game={game.data} />}
    </>
  );
}
