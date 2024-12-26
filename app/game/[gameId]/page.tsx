import GameLevel from "@/components/features/game/level";
import { getGame } from "@/server/games";

interface Props {
  params: Promise<{
    gameId: string;
  }>;
}

export default async function GamePage({ params }: Props) {
  const { gameId } = await params;

  const game = await getGame(gameId);

  if (!game?.character) {
    return <div>No character found</div>;
  }

  return <>{game && <GameLevel game={game} />}</>;
}
