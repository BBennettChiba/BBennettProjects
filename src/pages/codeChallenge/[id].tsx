import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Split from "react-split";
import superjson from "superjson";
import CodeEditor from "~/components/codeChallenge/CodeEditor";
import Description from "~/components/codeChallenge/Description";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";
import { raise } from "~/utils/client";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Problem({ id }: Props) {
  const { data: problem } = api.problem.get.useQuery(id);
  if (!problem) return raise("Problem not found");

  return (
    <Split
      className="flex h-[calc(100vh-8rem)]"
      gutterSize={10}
      gutterAlign="center"
    >
      <Description problem={problem} />
      <CodeEditor problem={problem} />
    </Split>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  await helpers.problem.get.prefetch(id);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
