import { type } from "arktype";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { problems } from "~/utils/problems";

export const problemRouter = createTRPCRouter({
  get: publicProcedure
    .input(type("string").assert)
    .query(({ input }) => problems.find((p) => p.id === input)),
  getAll: publicProcedure.query(() => problems.map((p) => p.title)),
});
