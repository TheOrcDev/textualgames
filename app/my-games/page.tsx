import Link from "next/link";

import { Plus } from "lucide-react";

import GameCard from "@/components/features/game/game-card";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { getGames } from "@/server/games";

export default async function MyGamesPage() {
  const games = await getGames();

  return (
    <>
      <h2 className="text-2xl">My Games</h2>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {games?.map((game) => {
          const validCharacter = game.character ?? {
            id: "",
            name: "",
            gender: "male",
            plot: "",
            type: "",
            items: "",
            gameId: "",
            createdAt: new Date(),
          }; // Provide a default character
          return (
            <GameCard
              game={{ ...game, character: validCharacter }}
              key={game.id}
            />
          );
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
