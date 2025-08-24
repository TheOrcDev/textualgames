import { generateId, UIMessage } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export async function createChat(): Promise<string> {
    const id = generateId(); // generate a unique chat ID
    await writeFile(getChatFile(id), '[]'); // create an empty chat file
    return id;
}

function getChatFile(id: string): string {
    const chatDir = path.join(process.cwd(), '.chats');
    if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
    return path.join(chatDir, `${id}.json`);
}

export async function loadChat(id: string): Promise<UIMessage[]> {
    return JSON.parse(await readFile(getChatFile(id), 'utf8'));
}

export async function saveChat(chat: { chatId: string; messages: UIMessage[] }) {
    await writeFile(getChatFile(chat.chatId), JSON.stringify(chat.messages));
}