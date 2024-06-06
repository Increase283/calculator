import { env } from "@/env";
import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import dedent from "ts-dedent"

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
            content: dedent`
            Your task is to print the solution for the provided problem in Russian using Latex.

            IMPORTANT: 
            - Provide only step-by-step solution with description.
            - Do not print \begin{document} or smth. Just solution with description. 
            - Do not use bold or italic style.
            - Do not print "Solution:".
            - Each step should start with new line and number with dot, i.e. "1. Calculate...".

            
            Here is a problem: "${cleanQuery}"
            `,
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
