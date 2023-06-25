import { type } from "arktype";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { makeId } from "~/utils/server";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      type({
        url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      }).assert
    )
    .mutation(async ({ ctx: { prisma }, input: { url } }) => {
      const id = makeId();
      return prisma.link.create({ data: { id, url } });
    }),
  get: publicProcedure
    .input(type("string").assert)
    .query(async ({ ctx: { prisma }, input: id }) =>
      prisma.link.findUnique({ where: { id } })
    ),
});

