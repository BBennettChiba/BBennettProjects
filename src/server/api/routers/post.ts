import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(({ ctx }) => ctx.prisma.post.findMany()),

  byId: publicProcedure
    .input(type("string").assert)
    .query(({ ctx, input: postId }) =>
      ctx.prisma.post
        .findUnique({
          where: { id: postId },
          select: {
            user: { select: { id: true, name: true } },
            id: true,
            title: true,
            body: true,
            updatedAt: true,
            createdAt: true,
            comments: {
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
                _count: { select: { likes: true } },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        })
        .then(async (post) => {
          if (!post)
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Post not found",
            });
          const likes = ctx.session
            ? await ctx.prisma.like.findMany({
                where: {
                  userId: ctx.session.user.id,
                  commentId: { in: post.comments.map((c) => c.id) },
                },
              })
            : null;
          return {
            ...post,
            comments: post.comments.map(({ id, _count, ...fields }) => ({
              id,
              ...fields,
              likedByMe: !!likes?.find((like) => like.commentId === id),
              likeCount: _count.likes,
            })),
          };
        })
    ),

  create: protectedProcedure
    .input(type({ body: "string", title: "string" }).assert)
    .mutation(({ ctx, input }) =>
      ctx.prisma.post.create({
        data: {
          title: input.title,
          body: input.body,
          userId: ctx.session.user.id,
        },
      })
    ),
  delete: protectedProcedure.input(type("string").assert).mutation(
    async ({
      input: id,
      ctx: {
        prisma,
        session: { user },
      },
    }) => {
      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) throw new TRPCError({ code: "NOT_FOUND" });
      if (post.userId !== user.id)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return prisma.post.delete({ where: { id } });
    }
  ),
  update: protectedProcedure
    .input(type({ id: "string", "title?": "string", "body?": "string" }).assert)
    .mutation(
      async ({
        input: { id: postId, title, body },
        ctx: {
          prisma,
          session: { user },
        },
      }) => {
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) throw new TRPCError({ code: "NOT_FOUND" });
        if (post.userId !== user.id)
          throw new TRPCError({ code: "UNAUTHORIZED" });
        return prisma.post.update({
          data: { title, body },
          where: { id: postId },
        });
      }
    ),
});
