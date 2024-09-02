"use client";

import { StoryLevel } from "@/components/features";
import { Game } from "@/components/shared/types";
import { Skeleton } from "@/components/ui";
import { trpc } from "@/server/client";

export default function GamePage({ params }: { params: { gameId: string } }) {
  const game = trpc.games.get.useQuery({
    gameId: params.gameId,
  });

  const gameData: Game = {
    ...game.data!,
    character: game?.data?.character ?? {
      type: "",
      id: "",
      name: "",
      createdAt: "",
      plot: "",
      items: "",
      gameId: "",
    },
  };

  return (
    <main className="p-10">
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

      {!game.isPending && game.data && <StoryLevel game={gameData} />}
    </main>
  );
}
