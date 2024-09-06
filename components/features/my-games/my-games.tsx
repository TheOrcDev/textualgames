"use client";

import Link from "next/link";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import { trpc } from "@/server/client";

export default function MyGames() {
  const games = trpc.games.getAllGames.useQuery();
  const deleteGame = trpc.games.deleteGame.useMutation();

  const handleDelete = (gameId: string) => {
    deleteGame.mutate({
      gameId,
    });
    // TODO: toast
  };

  return (
    <>
      <h2 className="text-2xl">My Games</h2>

      {games.isPending && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="size-72" />
          <Skeleton className="size-72" />
          <Skeleton className="size-72" />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {games.data?.map((game) => (
          <Card key={game.id} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle>
                  {game.character?.name} {game.character?.type}
                </CardTitle>
                <CardDescription>{game.genre}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <p>{game.character?.plot}</p>

                  <p>Items:</p>

                  {game.character &&
                    JSON.parse(game.character.items).map((item: string) => (
                      <p key={item}>- {item}</p>
                    ))}
                </div>
              </CardContent>
            </div>

            <CardFooter className="flex items-center justify-center gap-3">
              <Link href={`/game/${game.id}`}>
                <Button onClick={() => handleDelete(game.id)}>Continue</Button>
              </Link>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(game.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {!games.isPending && !games.data?.length && (
        <h2 className="text-2xl">No started games yet!</h2>
      )}
    </>
  );
}
