import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai";
import { start } from "workflow/api";

import { Game } from "@/db/schema";
import { getChatByGameId } from "@/lib/chat-store";
import GameCreator from "@/lib/game-creator";
import { chatWorkflow } from "@/workflows/chat/workflow";

export const maxDuration = 60;

const creator = new GameCreator();

export async function POST(req: Request) {
  try {
    const {
      messages,
      game,
    }: { messages: UIMessage[]; game: Game; userId: string } = await req.json();

    const lastMessage = messages[messages.length - 1];

    const previousMessages = await getChatByGameId(game.id);

    const prompt = await creator.getNextStep(game);

    const allMessages = [...previousMessages, ...messages];
    const modelMessages = await convertToModelMessages(allMessages);

    const run = await start(chatWorkflow, [
      {
        gameId: game.id,
        modelMessages,
        systemPrompt: prompt.basePrompt,
        previousMessages,
        lastMessage,
        nextLevel: String(game.levels.length + 1),
      },
    ]);

    return createUIMessageStreamResponse({
      stream: run.readable,
      headers: {
        "x-workflow-run-id": run.runId,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
