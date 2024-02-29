import { createServerSideHelpers } from "@trpc/react-query/server";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import superjson from "superjson";
import { useSignInEffect } from "~/context/SignInContext";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";

/**
 * @TODO fix long titles breaking mobile
 */

export default function Posts() {
  const { setEffect } = useSignInEffect();
  const { data: posts, isLoading, error } = api.post.getPosts.useQuery();
  const { status } = useSession();
  const [message, setMessage] = useState("New Post");

  const handleClick = (e: React.MouseEvent) => {
    if (status === "unauthenticated") {
      e.preventDefault();
      setMessage("Please Sign In");
      setEffect(true);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-600">Something went wrong</h1>;

  return (
    <div className="container mx-auto w-screen px-12 pt-6">
      <Link href="posts/new">
        <button
          className="btn-primary btn-lg w-32 rounded-lg"
          onClick={handleClick}
        >
          {message}
        </button>
      </Link>
      <ul className="rounded-box grid w-full grid-cols-2 gap-2 bg-secondary p-2 lg:grid-cols-4">
        {posts.length > 0
          ? posts.map((post) => (
              <Link
                key={post.id}
                href={`posts/${post.id}`}
                className="inline-block h-16 overflow-hidden text-ellipsis whitespace-nowrap text-lg lg:text-xl"
              >
                <li className="w-full rounded-md bg-gray-400 p-4 hover:bg-opacity-50">
                  {post.title}
                </li>
              </Link>
            ))
          : null}
      </ul>
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
