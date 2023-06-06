import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useMemo } from "react";
import { appRouter } from "src/server/api/root";
import superjson from "superjson";
import { CommentsList } from "src/components/CommentsList";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";

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

export default function PostViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;
  const postQuery = api.post.byId.useQuery({ id });
  const { data } = postQuery;

  type Comment = NonNullable<typeof data>["comments"][number];

  const commentsByParentId = useMemo(() => {
    if (!data?.comments) return new Map<string | null, Comment[]>();
    return data.comments.reduce((acc, comment) => {
      const key = comment.parentId;
      acc.has(comment.parentId)
        ? acc.get(key)!.push(comment)
        : acc.set(key, [comment]);
      return acc;
    }, new Map<string | null, Comment[]>());
  }, [data?.comments]);

  if (postQuery.status !== "success") {
    return <>Loading...</>;
  }
  if (!data) throw new Error("Post not found");

  return (
    <>
      <h1>{data.title}</h1>
      <em>Created {data.createdAt.toLocaleDateString()}</em>
      <p>{data.body}</p>
      <CommentsList comments={commentsByParentId.get(null) || []} />
    </>
  );
}
