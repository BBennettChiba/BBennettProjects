import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Split from "react-split";
import superjson from "superjson";
import CodeEditor from "~/components/codeChallenge/CodeEditor";
import Description from "~/components/codeChallenge/Description";
import { ProblemContextProvider } from "~/context/ProblemContext";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Problem = () => (
  <Split
    className="flex h-[calc(100vh-8rem)]"
    gutterSize={10}
    gutterAlign="center"
  >
    <Description />
    <CodeEditor />
  </Split>
);

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
export default function ProblemWithContext({ id }: Props) {
  return (
    <ProblemContextProvider id={id}>
      <Problem />
    </ProblemContextProvider>
  );
}
