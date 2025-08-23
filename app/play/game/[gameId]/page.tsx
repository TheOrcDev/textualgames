import { getGame } from "@/server/games";

import AIChat from "@/components/ai-chat";

type Params = Promise<{
  gameId: string;
}>;

export default async function GameLevel({ params }: { params: Params }) {
  const { gameId } = await params;

  const game = await getGame(gameId);

  console.log(game);

  return (
    <div className="p-6 font-mono">
      <div className="mx-auto max-w-4xl space-y-6">
        <AIChat />
      </div>
    </div>
  );
}
