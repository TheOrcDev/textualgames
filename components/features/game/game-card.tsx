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

import { useToast } from "@/components/hooks/use-toast";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async (gameId: string) => {
    try {
      const characterName = await deleteGame(gameId);

      toast({
        title: `Goodbye ${characterName}`,
        description: "Successfully deleted.",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Couldn't delete",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Card className="flex cursor-pointer flex-col justify-between from-primary/40 to-transparent transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-linear-to-br">
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
        <Link href={`/play/game/${game.id}`}>
          <Button>Continue</Button>
        </Link>

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
