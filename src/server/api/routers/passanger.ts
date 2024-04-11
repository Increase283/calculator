import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs";

export const passangerRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), surname: z.string(), date: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = auth();

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const passanger = await ctx.db.passanger.create({
        data: {
          name: input.name,
          surname: input.surname,
          date: input.date,
          userId,
        },
      });

      return passanger;
    }),
  getByDate: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ ctx, input }) => {
      const { userId } = auth();
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      try {
        return await ctx.db.passanger.findMany({
          where: {
            date: input.date,
            userId,
          },
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Не удалось найти пассажиров на эту дату",
        });
      }
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = auth();
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      return await ctx.db.passanger.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
