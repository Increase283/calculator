import { createTRPCRouter, publicProcedure } from "../trpc";

export const RequestRouter = createTRPCRouter({
  getRequests: publicProcedure.query(async ({ ctx }) => {
    const requests = await ctx.db.request.findMany();
    return requests;
  }),
});
