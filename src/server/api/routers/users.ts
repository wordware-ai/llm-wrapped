import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type PrismaClient } from "@prisma/client";

export const spotifyRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),
});
