import { DiffurService } from "@/services/DiffurService";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const DiffureRoute = createTRPCRouter({
  getAnswer: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      const res = await DiffurService.getAnswer(input.query);
      return res;
    }),
});
