import { Game } from '@/db/schema';
import { getChatByGameId, updateChat } from '@/lib/chat-store';
import GameCreator from '@/lib/game-creator';
import { saveLevel } from '@/server/level';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export const maxDuration = 60;
const model = process.env.AI_MODEL;

const creator = new GameCreator();

export async function POST(req: Request) {
    try {
        const {
            messages,
            game,
            userId,
        }: { messages: UIMessage[]; game: Game; userId: string } =
            await req.json();

        const lastMessage = messages[messages.length - 1];

        // Load previous messages from database
        const previousMessages = await getChatByGameId(game.id);

        const prompt = await creator.getNextStep(game);

        // Append new message to previousMessages messages
        const allMessages = [...previousMessages, ...messages];

        const result = streamText({
            model: model!,
            messages: await convertToModelMessages(allMessages),
            system: prompt.basePrompt,
        });

        return result.toUIMessageStreamResponse({
            onFinish: async ({ messages }) => {
                // Save level after streaming is complete
                await saveLevel(game.id, {
                    level: String(game.levels.length + 1),
                    storyline: await result.text,
                    choices: [],
                    image: "",
                    gameId: game.id,
                });

                // Update chat with all messages
                await updateChat({ gameId: game.id, messages: [...previousMessages, lastMessage, ...messages] });
            },
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

