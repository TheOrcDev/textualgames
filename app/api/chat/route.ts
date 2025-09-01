import { Game } from '@/db/schema';
import { auth } from '@/lib/auth';
import { getChatByGameId, updateChat } from '@/lib/chat-store';
import StoryCreator from '@/lib/story-creator';
import { saveLevel } from '@/server/level';
import { isSubscriptionValid } from '@/server/subscriptions';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { headers } from 'next/headers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const model = process.env.AI_MODEL;

const creator = new StoryCreator();

export async function POST(req: Request) {
    try {
        // Get current user session
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return new Response('Unauthorized', { status: 401 });
        }

        const userId = session.user.id;

        // Check usage limit before processing
        const subscription = await isSubscriptionValid();
        if (!subscription) {
            return new Response(JSON.stringify({
                error: 'Usage limit exceeded',
                message: 'Usage limit exceeded',
            }), {
                status: 429,
                headers: { 'Content-Type': 'application/json' }
            });
        }

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
            model: model!,
            messages: convertToModelMessages(allMessages),
            system: prompt.basePrompt,
        });

        await saveLevel(game.id, {
            level: String(game.levels.length + 1),
            storyline: await result.text,
            choices: [],
            image: "",
            gameId: game.id,
        });

        return result.toUIMessageStreamResponse({
            onFinish: async ({ messages }) => {
                await updateChat({ gameId: game.id, messages: [...previousMessages, lastMessage, ...messages] });
            },
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

