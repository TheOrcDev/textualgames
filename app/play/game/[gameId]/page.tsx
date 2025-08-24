import { notFound } from "next/navigation";

import { getGame } from "@/server/games";

import { loadChat } from "@/lib/chat-store";

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

  // TODO: Check if there are no levels, and if so, create a new game
  // Save to chat just the character stats, and send to AI actual prompt

  if (game.levels.length === 0) {
    // Create a new game
  }

  const messages = await loadChat(game.chatId);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 font-mono">
      <AIChat chatId={game.chatId} initialMessages={messages} />
    </div>
  );
}
