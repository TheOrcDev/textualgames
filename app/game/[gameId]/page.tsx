import type { Metadata } from "next";

import GameLevel from "@/components/features/game/level";
import { getGame } from "@/server/games";

export const metadata: Metadata = {
  title: "Play Your Game: Interactive Story on Textual Games",
  description:
    "Immerse yourself in your own AI-generated story. Play, make choices, and experience your interactive adventure with Textual Games.",
};

interface Props {
  params: Promise<{
    gameId: string;
  }>;
}

export default async function GamePage({ params }: Props) {
  const { gameId } = await params;

  const game = await getGame(gameId);

  if (!game?.character) {
    return <div>No character found</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center gap-5 p-5 py-10 pt-20 md:p-24">
      {game && <GameLevel game={game} />}
    </main>
  );
}
