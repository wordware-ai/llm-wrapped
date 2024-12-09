import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { SpotifyResultCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const spotifyResultsRouter = createTRPCRouter({
  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.spotifyResult.findUnique({
        where: { username: input.username },
      });
      return user;
    }),

  getByUsernames: publicProcedure
    .input(z.object({ usernames: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.spotifyResult.findMany({
        where: { username: { in: input.usernames } },
      });
      return users;
    }),

  create: privateProcedure
    .input(SpotifyResultCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.spotifyResult.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: privateProcedure.mutation(async ({ ctx }) => {
    const supabase = await createClient({ admin: true });

    const userId = ctx.user.id;

    const user = await ctx.db.spotifyResult.delete({
      where: {
        userId,
      },
    });

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      throw new Error(`Failed to delete auth user: ${error.message}`);
    }

    return user;
  }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const spotifyResult = await ctx.db.spotifyResult.findUnique({
      where: {
        userId: ctx.user.id,
      },
    });

    return spotifyResult;
  }),
});
