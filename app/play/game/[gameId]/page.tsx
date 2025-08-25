import Image from "next/image";
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

  const messages = await loadChat(game.chatId);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 font-mono">
      <Image
        src={game.levels[0].image}
        alt="Level Image"
        width={1000}
        height={1000}
      />

      <AIChat game={game} initialMessages={messages} level={game.levels[0]} />
    </div>
  );
}
