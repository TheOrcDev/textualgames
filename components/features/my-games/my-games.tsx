"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from "@/components/ui";
import { trpc } from "@/server/client";

import GameCard from "../game/game-card";

export default function MyGames() {
  const games = trpc.games.getAll.useQuery();

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

      {!games.isPending && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {games.data?.map((game) => <GameCard game={game} key={game.id} />)}

          <Link href={"/create-character"} className="flex">
            <Card className="flex cursor-pointer flex-col items-center justify-center from-primary/40 to-transparent transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-br">
              <CardHeader>Play New Story</CardHeader>
              <CardContent>
                <Plus className="size-32" />
              </CardContent>
            </Card>
          </Link>
        </div>
      )}

      {!games.isPending && !games.data?.length && (
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
