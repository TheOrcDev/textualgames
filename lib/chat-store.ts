import { generateId, UIMessage } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export async function createChat(): Promise<string> {
    const id = generateId(); // generate a unique chat ID
    await writeFile(getChatFile(id), '[]'); // create an empty chat file
    return id;
}

function getChatDir() {
    if (process.env.APP_ENV === 'production') {
        return '/tmp/.chats';
    }
    return path.join(process.cwd(), '.chats');
}

function getChatFile(id: string): string {
    const chatDir = getChatDir();
    if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
    return path.join(chatDir, `${id}.json`);
}

export async function loadChat(id: string): Promise<UIMessage[]> {
    const chatFile = getChatFile(id);
    if (!existsSync(chatFile)) return [];
    // check if the file is empty
    const fileContent = await readFile(chatFile, 'utf8');
    if (fileContent.trim() === '') return [];
    return JSON.parse(await readFile(chatFile, 'utf8'));
}

export async function saveChat(chat: { chatId: string; messages: UIMessage[] }) {
    await writeFile(getChatFile(chat.chatId), JSON.stringify(chat.messages));
}