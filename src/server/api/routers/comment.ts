import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        parentId: z.string().nullable(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, parentId, message } = input;
      const users = await ctx.prisma.user.findMany();
      const randomUser = users[Math.floor(Math.random() * users.length)];
      if (!randomUser) throw new Error("no users found");
      return ctx.prisma.comment.create({
        data: { message, postId, parentId, userId: randomUser.id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          message: true,
          parentId: true,
          user: { select: { id: true, name: true } },
        },
      });
    }),
  byPostId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.comment.findMany({
      where: { postId: input },

      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        message: true,
        parentId: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
