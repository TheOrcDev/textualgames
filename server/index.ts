import { aiRouter } from "./routers/ai";
import { tokensRouter } from "./routers/tokens";
import { router } from "./trpc";

export const appRouter = router({
  ai: aiRouter,
  tokens: tokensRouter,
  // mealPlans: mealPlansRouter,
});

export type AppRouter = typeof appRouter;
