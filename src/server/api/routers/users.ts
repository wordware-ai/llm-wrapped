import { UserCreateInputSchema } from "prisma/generated/zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          id: ctx.user?.id,
          ...input,
        },
      });

      return user;
    }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    });

    return user;
  }),
});
