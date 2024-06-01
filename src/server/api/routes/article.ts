import { createTRPCRouter, publicProcedure } from "../trpc";

export const ArticleRouter = createTRPCRouter({
  getArticles: publicProcedure.query(async ({ ctx }) => {
    const articles = await ctx.db.article.findMany();
    return articles;
  }),
});
