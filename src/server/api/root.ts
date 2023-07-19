import { commentRouter } from "./routers/comment";
import { likeRouter } from "./routers/like";
import { linkRouter } from "./routers/link";
import { weatherRouter } from "./routers/weather";
import type { inferRouterOutputs } from "@trpc/server";
import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
  like: likeRouter,
  link: linkRouter,
  weather: weatherRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

type RouterOutput = inferRouterOutputs<AppRouter>;

export type PostByIdQueryOutput = RouterOutput["post"]["byId"];

export type CommentsFromByIdQuery =
  NonNullable<PostByIdQueryOutput>["comments"];

export type CommentFromByIdQuery = CommentsFromByIdQuery[number];
