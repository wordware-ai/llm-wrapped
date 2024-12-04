import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { SpotifyResultCreateInputSchema } from "prisma/generated/zod";

export const spotifyResultsRouter = createTRPCRouter({
  createSpotifyResult: privateProcedure
    .input(SpotifyResultCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.spotifyResult.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
