import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { LinkedinResultCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const linkedinResultsRouter = createTRPCRouter({
  create: publicProcedure
    .input(LinkedinResultCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.linkedinResult.create({
        data: {
          ...input,
        },
      });
    }),

  upsert: publicProcedure
    .input(LinkedinResultCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.linkedinResult.upsert({
        where: {
          username: input.username, // Using username as the unique identifier
        },
        create: {
          ...input,
        },
        update: {
          ...input,
        },
      });
    }),

  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.linkedinResult.findUnique({
        where: {
          username: input.username,
        },
      });
    }),
  getByUsernames: publicProcedure
    .input(z.object({ usernames: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.linkedinResult.findMany({
        where: {
          username: {
            in: input.usernames,
          },
        },
      });
    }),
});
