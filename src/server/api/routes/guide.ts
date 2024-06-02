import { createTRPCRouter, publicProcedure } from "../trpc";

export const GuideRouter = createTRPCRouter({
  getGuide: publicProcedure.query(async ({ ctx }) => {
    const guide = await ctx.db.guide.findMany();
    return guide;
  }),
});
