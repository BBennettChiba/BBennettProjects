import { type } from "arktype";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
  toggle: protectedProcedure.input(type("string").assert).mutation(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input: commentId,
    }) => {
      const userId_commentId = { userId: user.id, commentId };
      const like = await prisma.like.findUnique({
        where: { userId_commentId },
      });
      if (like) {
        return prisma.like
          .delete({ where: { userId_commentId } })
          .then(() => "deleted");
      }
      return prisma.like
        .create({ data: userId_commentId })
        .then(() => "created");
    }
  ),
});
