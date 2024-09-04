import Game from "@/components/features/game/game";

export default function GamePage({ params }: { params: { gameId: string } }) {
  return (
    <main>
      <Game gameId={params.gameId} />
    </main>
  );
}
