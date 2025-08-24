import { loadChat, saveChat } from '@/lib/chat-store';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const model = 'openai/gpt-4o';

export async function POST(req: Request) {
    const {
        messages,
        id
    }: { messages: UIMessage[]; id: string } =
        await req.json();

    // Load previous messages from database
    const previousMessages = await loadChat(id);

    // Append new message to previousMessages messages
    const allMessages = [...previousMessages, ...messages];


    const result = streamText({
        model,
        messages: convertToModelMessages(allMessages),
        system:
            'You are a storyteller and you are helping a user to create a story.',
    });

    return result.toUIMessageStreamResponse({
        onFinish: ({ messages }) => {
            saveChat({ chatId: id, messages });
        },
    });
}

