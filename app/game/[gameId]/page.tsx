"use client";

import { StoryLevel } from "@/components/features";
import { Game } from "@/components/shared/types";
import { trpc } from "@/server/client";

export default function MealPlanPage({
  params,
}: {
  params: { gameId: string };
}) {
  const game = trpc.games.get.useQuery({
    gameId: params.gameId,
  });

  if (!game.data) {
    return;
  }

  const gameData: Game = {
    ...game.data,
    character: game.data.character ?? {
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
    <main>
      {!game.isPending && game.data && <StoryLevel game={gameData} />}
    </main>
  );
}
