import db from "@/db/drizzle";
import { InsertLevel, levels } from "@/db/schema";

export const saveLevel = async (gameId: string, level: InsertLevel) => {
    try {
        await db.insert(levels).values({
            ...level,
            gameId: gameId,
        });
    } catch (error) {
        console.error(error);
    }
};