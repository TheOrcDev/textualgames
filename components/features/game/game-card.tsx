"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Game } from "@/db/schema";
import { deleteGame } from "@/server/games";
import { Play, Trash } from "lucide-react";

import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const router = useRouter();

  const handleDelete = async (gameId: string) => {
    try {
      const characterName = await deleteGame(gameId);

      toast(`Goodbye ${characterName}. Successfully deleted.`);

      router.refresh();
    } catch (error) {
      console.error(error);
      toast("Couldn't delete. Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="relative flex h-full cursor-pointer flex-col justify-between overflow-hidden border-primary/25 bg-card/80 transition-all hover:border-primary/60 hover:bg-primary/5 hover:shadow-[0_0_28px_color-mix(in_oklch,var(--glow)_22%,transparent)]">
      <GridScanOverlay gridSize={72} scanSpeed={16} />
      <div className="relative">
        <UplinkHeader
          leftText={game.genre || "STORY"}
          rightText="SAVED GAME"
          variant="primary"
        />
      </div>
      <Link href={`/play/game/${game.id}`}>
        <CardHeader className="relative">
          <CardTitle className="flex items-center justify-between gap-3 font-mono uppercase tracking-wider">
            <div>{game.character?.name}</div>
            <Badge>{game.genre}</Badge>
          </CardTitle>
          <CardDescription>
            {game.character?.type.charAt(0).toUpperCase() +
              game.character?.type.slice(1)}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              {game.character?.plot.charAt(0).toUpperCase() +
                game.character?.plot.slice(1)}
              .
            </p>

            <Separator />

            {/* <p>Items:</p>
            {(() => {
              try {
                return JSON.parse(game.character?.items).map((item: string) => (
                  <p key={item} className="text-xs">
                    - {item}
                  </p>
                ));
              } catch {
                return <p className="text-xs">No items.</p>; // Fallback message
              }
            })()} */}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="relative flex items-center justify-between gap-3">
        <Button asChild>
          <Link href={`/play/game/${game.id}`}>
            <Play className="size-4" />
            Continue
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <Trash className="size-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                game and remove {game?.character?.name} character.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(game.id ?? "")}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
