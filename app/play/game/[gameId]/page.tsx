import { notFound } from "next/navigation";

import { getGame } from "@/server/games";
import { isSubscriptionValid } from "@/server/subscriptions";
import { getUserSession } from "@/server/users";

import { getChatByGameId } from "@/lib/chat-store";
import { checkUsageLimit } from "@/lib/usage-tracking";

import AIChat from "@/components/ai-chat";

type Params = Promise<{
  gameId: string;
}>;

export default async function GameLevel({ params }: { params: Params }) {
  const { gameId } = await params;
  const session = await getUserSession();

  const game = await getGame(gameId);

  if (!game) {
    return notFound();
  }

  const [messages, isValid] = await Promise.all([
    getChatByGameId(game.id),
    isSubscriptionValid(),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 ">
      <AIChat
        game={game}
        initialMessages={messages}
        level={game.levels[0]}
        isSubscriptionValid={isValid}
      />
    </div>
  );
}
