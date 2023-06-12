import { createServerSideHelpers } from "@trpc/react-query/server";
import Link from "next/link";
import React from "react";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";

export default function Posts() {
  const { data: posts, isLoading, error } = api.post.getPosts.useQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-600">Something went wrong</h1>;
  return (
    <div className="container mx-auto px-4 pt-5">
      <button className="btn-primary btn-lg rounded-lg">
        <Link href="posts/new">New Post</Link>
      </button>
      <div className="grid grid-cols-4 gap-2">
        <ul className="menu rounded-box bg-base-100 p-2">
          {posts && posts.length > 0
            ? posts.map((post) => (
                <li key={post.id}>
                  <Link href={`posts/${post.id}`} className="text-lg">
                    {post.title}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  await helpers.post.getPosts.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
