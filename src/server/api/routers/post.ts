import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.post.findUnique({
        where: { id: input.id },
        select: {
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
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      })
    ),

  create: protectedProcedure
    .input(z.object({ body: z.string(), title: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.post.create({
        data: {
          title: input.title,
          body: input.body,
          userId: ctx.session.user.id,
        },
      })
    ),
});
