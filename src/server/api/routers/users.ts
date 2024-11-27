import { UserCreateInputSchema } from "prisma/generated/zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  create: privateProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          ...input,
          id: ctx.user.id,
        },
      });

      return user;
    }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      include: {
        spotifyResult: true,
      },
    });

    return user;
  }),
});
