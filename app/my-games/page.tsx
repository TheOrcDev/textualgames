import type { Metadata } from "next";
import Link from "next/link";

import GameCard from "@/components/features/game/game-card";
import { Button } from "@/components/ui/button";
import { getGames } from "@/server/games";

export const metadata: Metadata = {
  title: "My Games: Explore Your Creations on Textual Games",
  description:
    "View, edit, and continue your stories. Explore all your past creations and keep the adventure going with Textual Games.",
};

export default async function MyGamesPage() {
  const games = await getGames();

  return (
    <main className="flex flex-col items-center justify-center gap-5 p-5 py-10 pt-20 md:p-24">
      {!games?.length ? (
        <div className="flex flex-col items-center justify-center gap-3 font-mono">
          <h2 className="text-2xl">No started games yet!</h2>
          <Link href={"/create-character"}>
            <Button>Create Your Character</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 font-mono">
          <Link href={"/create-character"}>
            <Button>Create New Character</Button>
          </Link>

          <h2>Continue Your Stories</h2>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {games
              ?.filter((game) => game.character)
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          </div>
        </div>
      )}
    </main>
  );
}
