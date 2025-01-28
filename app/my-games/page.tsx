import { Plus } from "lucide-react";
import Link from "next/link";

import GameCard from "@/components/features/game/game-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getGames } from "@/server/games";

export default async function MyGamesPage() {
  const games = await getGames();

  return (
    <>
      <h2>Continue Your Stories</h2>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {games
          ?.filter((game) => game.character)
          .map((game) => {
            return <GameCard game={game} key={game.id} />;
          })}

        <Link href={"/create-character"} className="flex">
          <Card className="flex cursor-pointer flex-col items-center justify-center from-primary/40 to-transparent transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-br">
            <CardHeader>Play New Story</CardHeader>
            <CardContent>
              <Plus className="size-32" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {!games?.length && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl">No started games yet!</h2>
          <Link href={"/create-character"}>
            <Button>Create Your Character</Button>
          </Link>
        </div>
      )}
    </>
  );
}
