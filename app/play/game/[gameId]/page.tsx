import { notFound } from "next/navigation";

import { getGame } from "@/server/games";

import AIChat from "@/components/ai-chat";

type Params = Promise<{
  gameId: string;
}>;

export default async function GameLevel({ params }: { params: Params }) {
  const { gameId } = await params;

  const game = await getGame(gameId);

  if (!game) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 font-mono">
      <AIChat chatId={game.chatId} />
    </div>
  );
}
