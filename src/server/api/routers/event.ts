import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {auth} from "@clerk/nextjs";

export const eventRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({text: z.string()}))
        .query(({input}) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    create: publicProcedure
        .input(z.object({name: z.string(), date: z.date()}))
        .mutation(async ({ctx, input}) => {
            const {userId} = auth()

            if (!userId) return new TRPCError({code: "UNAUTHORIZED"})

            const event = await ctx.db.event.create({
                data: {
                    name: input.name,
                    date: input.date,
                    userId
                }
            })

            return event
        }),

});
