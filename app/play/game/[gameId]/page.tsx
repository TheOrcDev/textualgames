import type { Metadata } from "next";
import Link from "next/link";

import { getGame } from "@/server/games";

import { Button } from "@/components/ui/button";

import GameLevel from "@/components/features/game/level";

export const metadata: Metadata = {
  title: "Play Your Game: Interactive Story on Textual Games",
  description:
    "Immerse yourself in your own story. Play, make choices, and experience your interactive adventure with Textual Games.",
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
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-5 py-10 pt-20 md:p-24">
        No character found
        <Link href={"/create-character"}>
          <Button>Create New Character</Button>
        </Link>
      </div>
    );
  }

  return (
    <main>
      <GameLevel game={game} />
    </main>
  );
}
