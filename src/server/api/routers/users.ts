import { UserCreateInputSchema } from "prisma/generated/zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

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

  delete: privateProcedure.mutation(async ({ ctx }) => {
    const supabase = await createClient({ admin: true });

    const id = ctx.user.id;

    const user = await ctx.db.user.delete({
      where: {
        id,
      },
    });

    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) {
      throw new Error(`Failed to delete auth user: ${error.message}`);
    }

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

  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { username: input.username },
        include: {
          spotifyResult: true,
        },
      });
      return user;
    }),
});
