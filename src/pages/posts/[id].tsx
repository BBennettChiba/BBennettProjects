import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { CommentsList } from "src/components/CommentsList";
import { appRouter } from "src/server/api/root";
import CommentForm from "~/components/CommentForm";
import { PostContent } from "~/components/PostContent";
import { PostContextProvider, usePost } from "~/context/PostContext";
import { createInnerTRPCContext } from "~/server/api/trpc";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await helpers.post.byId.prefetch(id);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

const PostViewPage = () => {
  const { rootComments, createCommentMutation, post } = usePost();
  const { mutate, status, error } = createCommentMutation;

  return (
    <div className="container mx-auto px-4 pb-10 pt-5">
      <PostContent />
      <h3 className="mb-2">Comments</h3>
      <section>
        <CommentForm
          handleSubmit={(message: string) =>
            mutate({ message, parentId: null, postId: post.id })
          }
          loading={status === "loading"}
          error={error?.message}
        />
        <div className="mt-4">
          <CommentsList comments={rootComments} />
        </div>
      </section>
    </div>
  );
};

export default function PostViewPageWithContext({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PostContextProvider id={id}>
      <PostViewPage />
      <ReactQueryDevtools initialIsOpen={true} />
    </PostContextProvider>
  );
}
