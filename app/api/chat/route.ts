import { convertToModelMessages, streamText, UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const {
        messages,
        model,
    }: { messages: UIMessage[]; model: string } =
        await req.json();

    const result = streamText({
        model,
        messages: convertToModelMessages(messages),
        system:
            'You are a storyteller and you are helping a user to create a story.',
    });

    return result.toUIMessageStreamResponse();
}