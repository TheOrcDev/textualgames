"use server";

import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

import { isValidUUID } from "@/db";
import db from "@/db/drizzle";
import { characters, Game, games, levels } from "@/db/schema";

export const getGame = async (gameId: string): Promise<Game | null> => {
  const isValidGameId = isValidUUID(gameId);

  if (!isValidGameId) {
    return null;
  }

  try {
    const game = await db.query.games.findFirst({
      with: {
        levels: {
          orderBy: desc(levels.createdAt),
          limit: 1,
        },
        character: true,
      },
      where: eq(games.id, gameId),
    });

    if (!game || !game.character) {
      return null;
    }

    return game as Game;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGames = async (): Promise<Game[]> => {
  try {
    const user = await currentUser();

    const userEmail = user?.emailAddresses[0].emailAddress;

    if (!userEmail) {
      throw new Error("User email not found");
    }

    const userGames = await db.query.games.findMany({
      with: {
        levels: {
          orderBy: desc(levels.createdAt),
          limit: 1,
        },
        character: true,
      },
      where: eq(games.email, userEmail),
    });

    return userGames;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteGame = async (gameId: string) => {
  const isValidGameId = isValidUUID(gameId);

  if (!isValidGameId) {
    return false;
  }

  try {
    await db.delete(levels).where(eq(levels.gameId, gameId));

    const [character] = await db
      .delete(characters)
      .where(eq(characters.gameId, gameId))
      .returning({
        name: characters.name,
      });

    await db.delete(games).where(eq(games.id, gameId)).returning({
      id: games.id,
    });

    return character.name;
  } catch (error) {
    console.error("Failed to delete game:", error);
    throw error;
  }
};
