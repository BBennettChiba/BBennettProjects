import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createContext, useMemo } from "react";
import { appRouter } from "src/server/api/root";
import superjson from "superjson";
import { CommentsList } from "src/components/CommentsList";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";
import type { CommentFromByIdQuery as Comment } from "src/server/api/root";
import CommentForm from "~/components/CommentForm";
import { PostContent } from "~/components/PostContent";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await helpers.post.byId.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}

type Context = Map<
  string | null,
  {
    user: {
      id: string;
      name: string | null;
    };
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string;
    parentId: string | null;
  }[]
>;

export const CommentsContext = createContext<Context | null>(null);

export default function PostViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;
  const { data: post, status } = api.post.byId.useQuery({ id });

  const commentsByParentId = useMemo(() => {
    if (!post?.comments) return new Map<string | null, Comment[]>();
    return post.comments.reduce((acc, comment) => {
      const key = comment.parentId;
      if (acc.has(key)) acc.get(key)?.push(comment);
      else acc.set(key, [comment]);
      return acc;
    }, new Map<string | null, Comment[]>());
  }, [post?.comments]);

  if (status !== "success") {
    return <>Loading...</>;
  }

  if (!post) throw new Error("Post not found");

  /**@todo make it so only logged in users can access certain parts like create new post and whatnot */
  return (
    <div className="container mx-auto px-4 pb-10 pt-5">
      <CommentsContext.Provider value={commentsByParentId}>
        <PostContent
          post={post}
          onDelete={() => {
            null;
          }}
        />
        <h3 className="mb-2">Comments</h3>
        <section>
          <CommentForm postId={id} parentId={null} />
          <div className="mt-4">
            <CommentsList comments={commentsByParentId.get(null) || []} />
          </div>
        </section>
      </CommentsContext.Provider>
    </div>
  );
}
