import type { Metadata } from "next";
import Link from "next/link";

import { getGames } from "@/server/games";
import { Library, Plus } from "lucide-react";

import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import GameCard from "@/components/features/game/game-card";

export const metadata: Metadata = {
  title: "My Games: Explore Your Creations on Textual Games",
  description:
    "View, edit, and continue your stories. Explore all your past creations and keep the adventure going with Textual Games.",
};

export default async function MyGamesPage() {
  const games = await getGames();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-12 pt-6 md:px-10">
      <UplinkHeader
        leftText="STORY ARCHIVE"
        rightText={`${games?.length ?? 0} SAVED`}
      />
      {!games?.length ? (
        <Empty className="min-h-[360px] border border-primary/30 bg-card/70">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="border border-primary/40 bg-primary/10 text-primary"
            >
              <Library className="size-6" />
            </EmptyMedia>
            <EmptyTitle className="font-mono uppercase tracking-wider">
              No started games yet
            </EmptyTitle>
            <EmptyDescription>
              Build a story profile and open your first scene.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href={"/play/create-character"}>
                <Plus className="size-4" />
                Create Story
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-mono text-2xl font-bold uppercase tracking-wider">
              Continue Your Stories
            </h1>
            <Button asChild>
              <Link href={"/play/create-character"}>
                <Plus className="size-4" />
                New Story
              </Link>
            </Button>
          </div>

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
