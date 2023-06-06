import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { appRouter } from "src/server/api/root";
import superjson from "superjson";
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
  if (postQuery.status !== "success") {
    return <>Loading...</>;
  }
  const { data } = postQuery;
  if (!data) throw new Error("Post not found");
  return (
    <>
      <h1>{data.title}</h1>
      {/* <em>Created {data.createdAt.toLocaleDateString()}</em> */}
      <p>{data.body}</p>
    </>
  );
}
