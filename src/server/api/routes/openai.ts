import { env } from "@/env";
import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
export const OpenaiRouter = createTRPCRouter({
  getAnswer: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const cleanQuery = input.query.trim().toLowerCase();
      const existingRequest = await ctx.db.request.findFirst({
        where: { input: cleanQuery },
      });
      if (existingRequest) return existingRequest.solution;
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Выведи пошаговое решение для этой задачи не используя latex, добавляя нумерацию действий 1, 2 итд ${cleanQuery}`,
          },
        ],
        model: "gpt-4o",
      });
      const res = chatCompletion.choices[0]?.message.content;
      await ctx.db.request.create({
        data: { solution: res ?? "", input: cleanQuery },
      });

      return res ?? "";
    }),
});
