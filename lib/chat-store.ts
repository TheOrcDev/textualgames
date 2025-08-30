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
    try {
        await db.insert(chats).values({
            chatId: chat.chatId,
            gameId: chat.gameId,
            messages: chat.messages,
            updatedAt: new Date()
        })
    } catch (error) {
        console.error(error);
    }
}

export async function updateChat(chat: { chatId: string; gameId: string; messages: UIMessage[] }) {
    try {
        await db.update(chats).set({
            messages: chat.messages,
            updatedAt: new Date()
        }).where(eq(chats.gameId, chat.gameId));
    } catch (error) {
        console.error(error);
    }
}

export async function deleteChat(id: string): Promise<void> {
    await db.delete(chats).where(eq(chats.chatId, id));
}

export async function getGameChats(gameId: string): Promise<{ chatId: string; messages: UIMessage[] }[]> {
    const result = await db.select().from(chats).where(eq(chats.gameId, gameId));
    return result.map(chat => ({
        chatId: chat.chatId,
        messages: chat.messages
    }));
}

export async function getChatByGameId(gameId: string): Promise<UIMessage[]> {
    const result = await db.select().from(chats).where(eq(chats.gameId, gameId));
    if (result.length > 0) {
        return result.flatMap(chat => chat.messages || []);
    }
    return [];
}