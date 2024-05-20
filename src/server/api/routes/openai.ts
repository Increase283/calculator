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
    .mutation(async ({ input }) => {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Выведи пошаговое решение для этой задачи: ${input.query}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      return chatCompletion.choices[0]?.message;
    }),
});
