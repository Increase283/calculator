import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { DiffurSirvice } from "@/services/DiffurService";

export const DiffureRoute = createTRPCRouter({
  getAnswer: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      return (await DiffurSirvice.getAnswer(input.query)) as string;
    }),
});
