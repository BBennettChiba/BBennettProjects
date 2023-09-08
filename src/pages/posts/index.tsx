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
      <ul className="menu rounded-box w-full bg-base-100 p-2">
        {posts.length > 0
          ? posts.map((post) => (
              <li key={post.id} className="w-full hover:bg-opacity-20">
                <Link href={`posts/${post.id}`} className="text-lg inline-block">
                  {post.title}
                </Link>
              </li>
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
