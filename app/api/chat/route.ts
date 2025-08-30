import { Game } from '@/db/schema';
import { getChatByGameId, updateChat } from '@/lib/chat-store';
import StoryCreator from '@/lib/story-creator';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const model = 'openai/gpt-4o';

const creator = new StoryCreator();

export async function POST(req: Request) {
    const {
        messages,
        game,
    }: { messages: UIMessage[]; game: Game } =
        await req.json();

    const lastMessage = messages[messages.length - 1];

    // Load previous messages from database
    const previousMessages = await getChatByGameId(game.id);

    const prompt = await creator.getNextStep(game);

    // Append new message to previousMessages messages
    const allMessages = [...previousMessages, ...messages];

    const result = streamText({
        model,
        messages: convertToModelMessages(allMessages),
        system: prompt.basePrompt,
    });

    return result.toUIMessageStreamResponse({
        onFinish: ({ messages }) => {
            updateChat({ chatId: game.id, gameId: game.id, messages: [...previousMessages, lastMessage, ...messages] });
        },
    });
}

