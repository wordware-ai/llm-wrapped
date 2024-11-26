import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env";

export const wordwareRouter = createTRPCRouter({
  runWordware: publicProcedure
    .input(z.object({ text: z.string(), promptId: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(
        `https://app.wordware.ai/api/released-app/${input.promptId}/run`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.WORDWARE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              data: input.text,
            },
            version: "^1.0",
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Wordware API error: ${response.statusText}`);
      }
      console.log(response);
      const data = await response.json();
      console.log(data);
      return data;
    }),
});
