import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { inferRouterOutputs } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

type RouterOutput = inferRouterOutputs<AppRouter>;

type ByIdQueryOutput = RouterOutput["post"]["byId"];

export type CommentsFromByIdQueryOutput = NonNullable<ByIdQueryOutput>["comments"];
