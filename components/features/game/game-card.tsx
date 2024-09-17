"use client";

import Link from "next/link";

import { useToast } from "@/components/hooks/use-toast";
import { Character } from "@/components/shared/types";
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
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { trpc } from "@/server/client";

interface Props {
  game: {
    id: string;
    character: Character | null;
    genre: string;
  };
}
export default function GameCard({ game }: Props) {
  const deleteGame = trpc.games.delete.useMutation();
  const utils = trpc.useUtils();

  const { toast } = useToast();

  const handleDelete = async (gameId: string) => {
    try {
      const characterName = await deleteGame.mutateAsync({
        gameId,
      });

      utils.games.getAll.refetch();

      toast({
        title: `Goodbye ${characterName}`,
        description: "Successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Couldn't delete",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Card
      key={game.id}
      className="flex cursor-pointer flex-col justify-between from-primary/40 to-transparent transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-br"
    >
      <Link href={`/game/${game.id}`}>
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
      </Link>

      <CardFooter className="flex items-center justify-center gap-3">
        <Link href={`/game/${game.id}`}>
          <Button>Continue</Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete</Button>
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
              <AlertDialogAction onClick={() => handleDelete(game.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
