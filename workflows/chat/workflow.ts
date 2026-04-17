import { DurableAgent } from "@workflow/ai/agent";
import type { ModelMessage, UIMessage, UIMessageChunk } from "ai";
import { getWritable } from "workflow";

import { updateChat } from "@/lib/chat-store";
import { saveLevel } from "@/server/level";

const model = process.env.AI_MODEL!;

export interface ChatWorkflowInput {
  gameId: string;
  modelMessages: ModelMessage[];
  systemPrompt: string;
  previousMessages: UIMessage[];
  lastMessage: UIMessage;
  nextLevel: string;
}

export async function chatWorkflow(input: ChatWorkflowInput) {
  "use workflow";

  const writable = getWritable<UIMessageChunk>();

  const agent = new DurableAgent({
    model,
    instructions: input.systemPrompt,
  });

  const result = await agent.stream({
    messages: input.modelMessages,
    writable,
    collectUIMessages: true,
  });

  const assistantText =
    result.steps[result.steps.length - 1]?.text ?? "";

  await persistLevel(input.gameId, input.nextLevel, assistantText);

  await persistChat(
    input.gameId,
    input.previousMessages,
    input.lastMessage,
    result.uiMessages ?? []
  );

  return { status: "complete" };
}

async function persistLevel(
  gameId: string,
  level: string,
  storyline: string
) {
  "use step";

  await saveLevel(gameId, {
    level,
    storyline,
    choices: [],
    image: "",
    gameId,
  });
}

async function persistChat(
  gameId: string,
  previousMessages: UIMessage[],
  lastMessage: UIMessage,
  assistantMessages: UIMessage[]
) {
  "use step";

  await updateChat({
    gameId,
    messages: [...previousMessages, lastMessage, ...assistantMessages],
  });
}
