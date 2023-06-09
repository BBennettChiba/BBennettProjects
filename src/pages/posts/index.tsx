import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

export default function Posts() {
  const { data: posts, isLoading, error } = api.post.getPosts.useQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="error-msg">Something went wrong</h1>;
  return (
    <div className="container">
      {posts && posts.length > 0
        ? posts.map((post) => (
            <Link href={`posts/${post.id}`} key={post.id}>
              <h1>{post.title}</h1>
            </Link>
          ))
        : null}
    </div>
  );
}
