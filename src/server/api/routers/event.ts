import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {auth} from "@clerk/nextjs";

export const eventRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({name: z.string(), date: z.date()}))
        .mutation(async ({ctx, input}) => {
            const {userId} = auth()

            if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})

            const event = await ctx.db.event.create({
                data: {
                    name: input.name,
                    date: input.date,
                    userId
                }
            })

            return event
        }),
    getByDate: publicProcedure
        .input(z.object({date: z.date()}))
        .query(async ({ctx, input}) => {
            const {userId} = auth()
            if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})

            return await ctx.db.event.findMany({
                where: {
                    date: input.date,
                    userId
                }
            })
        })
});
