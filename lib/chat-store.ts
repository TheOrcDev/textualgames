import { generateId, UIMessage } from 'ai';
import { eq } from 'drizzle-orm';
import db from '../db/drizzle';
import { chats } from '../db/schema';

export async function createChat(gameId: string): Promise<string> {
    const id = generateId(); // generate a unique chat ID
    await db.insert(chats).values({
        chatId: id,
        gameId: gameId,
        messages: []
    });
    return id;
}

export async function loadChat(id: string): Promise<UIMessage[]> {
    const result = await db.select().from(chats).where(eq(chats.chatId, id));
    return result[0]?.messages || [];
}

export async function saveChat(chat: { chatId: string; gameId: string; messages: UIMessage[] }) {
    await db.insert(chats).values({
        chatId: chat.chatId,
        gameId: chat.gameId,
        messages: chat.messages,
        updatedAt: new Date()
    }).onConflictDoUpdate({
        target: chats.chatId,
        set: {
            messages: chat.messages,
            updatedAt: new Date()
        }
    });
}

export async function deleteChat(id: string): Promise<void> {
    await db.delete(chats).where(eq(chats.chatId, id));
}

// New function to get all chats for a game
export async function getGameChats(gameId: string): Promise<{ chatId: string; messages: UIMessage[] }[]> {
    const result = await db.select().from(chats).where(eq(chats.gameId, gameId));
    return result.map(chat => ({
        chatId: chat.chatId,
        messages: chat.messages
    }));
}