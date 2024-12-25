import { StoryLevel } from "@/components/features";
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

  return <>{game && <StoryLevel game={game} />}</>;
}
