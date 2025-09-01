"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Game } from "@/db/schema";
import { deleteGame } from "@/server/games";
import { Trash } from "lucide-react";

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
} from "@/components/ui/8bit/alert-dialog";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";
import { toast } from "@/components/ui/8bit/toast";

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
    <Card className="flex cursor-pointer flex-col justify-between from-primary/40 to-transparent hover:bg-linear-to-br h-full">
      <Link href={`/play/game/${game.id}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>{game.character?.name}</div>
            <Badge>{game.genre}</Badge>
          </CardTitle>
          <CardDescription>
            {game.character?.type.charAt(0).toUpperCase() +
              game.character?.type.slice(1)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              {game.character?.plot.charAt(0).toUpperCase() +
                game.character?.plot.slice(1)}
              .
            </p>

            <Separator />

            <p>Items:</p>
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
            })()}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex items-center justify-between gap-3">
        <Button asChild>
          <Link href={`/play/game/${game.id}`}>Continue</Link>
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
