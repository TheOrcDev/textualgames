import { aiRouter } from "./routers/ai";
import { gamesRouter } from "./routers/games";
import { tokensRouter } from "./routers/tokens";
import { router } from "./trpc";

export const appRouter = router({
  ai: aiRouter,
  tokens: tokensRouter,
  games: gamesRouter,
});

export type AppRouter = typeof appRouter;
