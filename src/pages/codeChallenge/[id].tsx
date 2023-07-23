import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Split from "react-split";
import { problems } from "../../utils/problems";
import CodeEditor from "~/components/codeChallenge/CodeEditor";
import Description from "~/components/codeChallenge/Description";
import { raise } from "~/utils/client";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Problem({ problem }: Props) {
  return (
    <Split
      //   sizes={[50, 50]}
      className="flex h-[calc(100vh-8rem)]"
      gutterSize={10}
      gutterAlign="center"
      //   snapOffset={30}
      //   dragInterval={1}
      //   cursor="col-resize"
    >
      <Description problem={problem} />
      <CodeEditor />
    </Split>
  );
}

export const getServerSideProps = (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  //   const helpers = createServerSideHelpers({
  //     router: appRouter,
  //     ctx: createInnerTRPCContext({ session: null }),
  //     transformer: superjson,
  //   });
  const id = context.params?.id as string;
  const problem =
    problems.find((p) => p.id === id) ?? raise("problem not found");
  problem.handlerFunction = problem.handlerFunction.toString();

  //   await helpers.post.byId.prefetch(id);

  return {
    props: {
      //   trpcState: helpers.dehydrate(),
      problem,
    },
  };
};
