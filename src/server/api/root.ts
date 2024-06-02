import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { ArticleRouter } from "./routes/article";
import { DiffureRoute } from "./routes/diffur";
import { GuideRouter } from "./routes/guide";
import { OpenaiRouter } from "./routes/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  diffur: DiffureRoute,
  openai: OpenaiRouter,
  article: ArticleRouter,
  guide: GuideRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
