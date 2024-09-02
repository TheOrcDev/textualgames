"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import { trpc } from "@/server/client";

export default function MyGames() {
  const games = trpc.games.getAllGames.useQuery();

  return (
    <main className="flex flex-col items-center justify-center gap-5 px-24">
      <h2 className="text-2xl">My Games</h2>

      {games.isPending && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="size-72" />
          <Skeleton className="size-72" />
          <Skeleton className="size-72" />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {!games.isPending &&
          games.data?.map((game) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <Card className="h-full cursor-pointer transition duration-300 ease-in-out hover:bg-primary/10">
                <CardHeader>
                  <CardTitle>
                    {game.character?.name} {game.character?.type}
                  </CardTitle>
                  <CardDescription>{game.genre}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p>{game.character?.plot}</p>

                  <p>Items:</p>
                  {game.character &&
                    JSON.parse(game.character.items).map((item: string) => (
                      <p key={item}>- {item}</p>
                    ))}
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
      {!games.isPending && !games.data?.length && (
        <h2 className="text-2xl">No started games yet!</h2>
      )}
    </main>
  );
}
