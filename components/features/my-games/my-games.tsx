"use client";

import Link from "next/link";

import { useToast } from "@/components/hooks/use-toast";
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
  Skeleton,
} from "@/components/ui";
import { trpc } from "@/server/client";

export default function MyGames() {
  const games = trpc.games.getAllGames.useQuery();
  const deleteGame = trpc.games.deleteGame.useMutation();
  const utils = trpc.useUtils();

  const { toast } = useToast();

  const handleDelete = async (gameId: string) => {
    try {
      const characterName = await deleteGame.mutateAsync({
        gameId,
      });

      utils.games.getAllGames.refetch();

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
                <Button>Continue</Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your game and remove {game?.character?.name} character.
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
        ))}
      </div>
      {!games.isPending && !games.data?.length && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl">No started games yet!</h2>
          <Link href={"/play"}>
            <Button>Create Your Character</Button>
          </Link>
        </div>
      )}
    </>
  );
}
