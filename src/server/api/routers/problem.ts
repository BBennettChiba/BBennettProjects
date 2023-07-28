import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { problems } from "~/utils/problems";

export const problemRouter = createTRPCRouter({
  get: publicProcedure.input(type("string").assert).query(({ input }) => {
    const problem = problems.find((p) => p.id === input);
    if (!problem)
      throw new TRPCError({ code: "NOT_FOUND", message: "Problem not found" });
    return problem;
  }),
  getAll: publicProcedure.query(() => problems.map((p) => p.title)),
});
