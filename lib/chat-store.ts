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
    const chatFile = getChatFile(id);
    if (!existsSync(chatFile)) return [];
    // check if the file is empty
    const fileContent = await readFile(chatFile, 'utf8');
    if (fileContent.trim() === '') return [];
    return JSON.parse(await readFile(chatFile, 'utf8'));
}

export async function saveChat(chat: { chatId: string; messages: UIMessage[] }) {
    // Load existing messages first
    const existingMessages = await loadChat(chat.chatId);

    // Find the last existing message ID to determine where to start adding new ones
    const lastExistingId = existingMessages.length > 0
        ? existingMessages[existingMessages.length - 1].id
        : null;

    // Find new messages (those that come after the last existing message)
    let newMessages: UIMessage[] = [];
    if (lastExistingId) {
        const lastExistingIndex = chat.messages.findIndex(msg => msg.id === lastExistingId);
        if (lastExistingIndex !== -1 && lastExistingIndex < chat.messages.length - 1) {
            newMessages = chat.messages.slice(lastExistingIndex + 1);
        }
    } else {
        // If no existing messages, all messages are new
        newMessages = chat.messages;
    }

    // Combine existing and new messages
    const allMessages = [...existingMessages, ...newMessages];

    // Save the combined messages
    await writeFile(getChatFile(chat.chatId), JSON.stringify(allMessages));
}