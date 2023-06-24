import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { makeId } from "~/utils/server";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { url } }) => {
      const id = makeId();
      return prisma.link.create({ data: { id, url } });
    }),
  get: publicProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input: id }) =>
      prisma.link.findUnique({ where: { id } })
    ),
});
