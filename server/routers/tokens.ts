import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

import db from "@/db/drizzle";
import { tokenSpends } from "@/db/schema";
import { getTotalTokens } from "@/lib/queries";

import { publicProcedure, router } from "../trpc";

export const tokensRouter = router({
  getTokens: publicProcedure.query(async () => {
    const user = await currentUser();

    try {
      const totalUserTokens = await getTotalTokens(
        user?.emailAddresses[0].emailAddress!,
      );

      return totalUserTokens;
    } catch (e) {
      throw e;
    }
  }),

  spendTokens: publicProcedure
    .input(
      z.object({
        amount: z.number(),
        email: z.string().email(),
        action: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      try {
        await db.insert(tokenSpends).values({
          amount: input.amount,
          email: input.email,
          action: input.action,
        });
      } catch (e) {
        throw e;
      }
    }),
});
