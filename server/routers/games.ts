import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import db from "@/db/drizzle";
import { games } from "@/db/schema";

import { publicProcedure, router } from "../trpc";

export const gamesRouter = router({
  get: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async (opts) => {
      const { input } = opts;

      try {
        const game = await db.query.games.findFirst({
          with: {
            levels: {
              orderBy: (levels, { desc }) => [desc(levels.createdAt)],
              limit: 1,
            },
            character: true,
          },
          where: eq(games.id, input.gameId),
        });

        return game;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  getAllGames: publicProcedure.query(async () => {
    try {
      const user = await currentUser();

      return await db.query.games.findMany({
        with: {
          character: true,
        },
        where: eq(games.email, user?.emailAddresses[0].emailAddress!),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }),
});
