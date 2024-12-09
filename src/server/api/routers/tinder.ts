import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TinderResultCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const tinderResultsRouter = createTRPCRouter({
  create: publicProcedure
    .input(TinderResultCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tinderResult.create({
        data: input,
      });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tinderResult.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getByIds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tinderResult.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
});
