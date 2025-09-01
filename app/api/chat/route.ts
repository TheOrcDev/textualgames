import { Game } from '@/db/schema';
import { auth } from '@/lib/auth';
import { getChatByGameId, updateChat } from '@/lib/chat-store';
import StoryCreator from '@/lib/story-creator';
import { checkUsageLimit, updateUserUsage } from '@/lib/usage-tracking';
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
        const usageCheck = await checkUsageLimit(userId);
        if (!usageCheck.canProceed) {
            return new Response(JSON.stringify({
                error: 'Usage limit exceeded',
                message: usageCheck.message,
                currentLevels: usageCheck.currentLevels,
                maxLevels: usageCheck.maxLevels,
                remainingLevels: usageCheck.remainingLevels,
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

        return result.toUIMessageStreamResponse({
            onFinish: async ({ messages }) => {
                // Note: We can't get exact token usage from onFinish
                // Using more realistic token estimation based on content analysis
                const estimatedTokens = messages.reduce((total, msg) => {
                    const content = typeof msg === 'string' ? msg : JSON.stringify(msg);

                    // More realistic token estimation:
                    // - Words: ~1.3 tokens per word
                    // - Punctuation and special chars: ~1 token each
                    // - Base overhead for message structure
                    const words = content.split(/\s+/).length;
                    const specialChars = (content.match(/[^\w\s]/g) || []).length;
                    const baseTokens = 10; // Base overhead for message structure

                    return total + Math.round(words * 1.3 + specialChars + baseTokens);
                }, 0);

                // Update user usage with estimated token consumption
                await updateUserUsage(userId, {
                    totalTokens: estimatedTokens,
                });

                await updateChat({ gameId: game.id, messages: [...previousMessages, lastMessage, ...messages] });
            },
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

