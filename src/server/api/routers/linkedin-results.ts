import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { LinkedinResultCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const linkedinResultsRouter = createTRPCRouter({
  createLinkedinResult: privateProcedure
    .input(LinkedinResultCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.linkedinResult.create({
        data: {
          ...input,
        },
      });
    }),
  getByUsername: privateProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.linkedinResult.findUnique({
        where: {
          username: input.username,
        },
      });
    }),
});
