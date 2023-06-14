import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { appRouter } from "src/server/api/root";
import superjson from "superjson";
import { CommentsList } from "src/components/CommentsList";
import { createInnerTRPCContext } from "~/server/api/trpc";
import CommentForm from "~/components/CommentForm";
import { PostContent } from "~/components/PostContent";
import { PostContextProvider, usePost } from "~/context/PostContext";

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

function PostViewPage() {
  /**@todo make it so only logged in users can access certain parts like create new post and whatnot */
  const { rootComments, createComment } = usePost();

  return (
    <div className="container mx-auto px-4 pb-10 pt-5">
      <PostContent
        onDelete={() => {
          null;
        }}
      />
      <h3 className="mb-2">Comments</h3>
      <section>
        <CommentForm
          handleSubmit={(message: string) =>
            createComment({ message, parentId: null })
          }
        />
        <div className="mt-4">
          <CommentsList comments={rootComments} />
        </div>
      </section>
    </div>
  );
}

export default function PostViewPageWithContext({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PostContextProvider id={id}>
      <PostViewPage />
    </PostContextProvider>
  );
}
