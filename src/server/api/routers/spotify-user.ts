import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { SpotifyResultCreateInputSchema } from "prisma/generated/zod";

export const spotifyUserRouter = createTRPCRouter({
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

  // Add new procedure to get user's Spotify data
  getSpotifyResult: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.spotifyResult.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
