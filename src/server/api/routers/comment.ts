import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        parentId: z.string().nullable(),
        message: z.string().nonempty(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, parentId, message } = input;
      return ctx.prisma.comment.create({
        data: { message, postId, parentId, userId: ctx.session.user.id },
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
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const comment = await ctx.prisma.comment.findUnique({ where: { id } });
      if (!comment) throw new TRPCError({ code: "NOT_FOUND" });
      if (comment.userId !== ctx.session.user.id)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return ctx.prisma.comment.update({
        where: { id },
        data: input,
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
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      const comment = await ctx.prisma.comment.findUnique({ where: { id } });
      if (!comment) throw new TRPCError({ code: "NOT_FOUND" });
      if (comment.userId !== ctx.session.user.id)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return ctx.prisma.comment.delete({
        where: { id },
      });
    }),

  byPostId: publicProcedure.input(z.string()).query(({ ctx, input }) =>
    ctx.prisma.comment.findMany({
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
    })
  ),
});
