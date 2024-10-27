import Game from "@/components/features/game/game";

type Params = Promise<{ gameId: string }>;

export default async function GamePage({ params }: { params: Params }) {
  const { gameId } = await params;
  return (
    <main>
      <Game gameId={gameId} />
    </main>
  );
}
