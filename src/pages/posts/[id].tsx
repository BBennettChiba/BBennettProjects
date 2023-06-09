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
  const postQuery = api.post.byId.useQuery({ id });
  const { data } = postQuery;

  const commentsByParentId = useMemo(() => {
    if (!data?.comments) return new Map<string | null, Comment[]>();
    return data.comments.reduce((acc, comment) => {
      const key = comment.parentId;
      if (acc.has(key)) acc.get(key)?.push(comment);
      else acc.set(key, [comment]);
      return acc;
    }, new Map<string | null, Comment[]>());
  }, [data?.comments]);

  if (postQuery.status !== "success") {
    return <>Loading...</>;
  }
  if (!data) throw new Error("Post not found");

  return (
    <div className="container">
      <CommentsContext.Provider value={commentsByParentId}>
        <h1>{data.title}</h1>
        <article>{data.body}</article>
        <h3 className="comments-title">Comments</h3>
        <section>
          <div className="mt-4">
            <CommentsList comments={commentsByParentId.get(null) || []} />
          </div>
        </section>
      </CommentsContext.Provider>
    </div>
  );
}
