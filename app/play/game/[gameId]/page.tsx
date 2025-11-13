import { notFound } from "next/navigation";

import { getGame } from "@/server/games";

import { getChatByGameId } from "@/lib/chat-store";

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

  const messages = await getChatByGameId(game.id);

  return (
    <div className="mx-auto max-w-4xl pb-10">
      <AIChat
        game={game}
        initialMessages={messages}
        level={game.levels[0]}
        isSubscriptionValid={true}
      />
    </div>
  );
}
