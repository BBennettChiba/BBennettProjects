import { createServerSideHelpers } from "@trpc/react-query/server";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";

export default function Posts() {
  const { data: posts, isLoading, error } = api.post.getPosts.useQuery();
  const { status } = useSession();
  const [message, setMessage] = useState("New Post");

  const handleClick = (e: React.MouseEvent) => {
    if (status === "unauthenticated") {
      e.preventDefault();
      setMessage("Please Sign In");
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-600">Something went wrong</h1>;

  return (
    <div className="container mx-auto px-4 pt-5">
      <Link href="posts/new">
        <button
          className="btn-primary btn-lg rounded-lg w-32"
          onClick={handleClick}
        >
          {message}
        </button>
      </Link>
      <div className="grid grid-cols-4 gap-2">
        <ul className="menu rounded-box bg-base-100 p-2">
          {posts.length > 0
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

export const getServerSideProps = async () => {
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
};
