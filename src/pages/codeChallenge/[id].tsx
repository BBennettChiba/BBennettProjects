import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import Split from "react-split";
import superjson from "superjson";
import CodeEditor from "~/components/codeChallenge/CodeEditor";
import Description from "~/components/codeChallenge/Description";
import { ProblemContextProvider } from "~/context/ProblemContext";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

type Context = {
  tutorialIndex: number;
  setTutorialIndex: Dispatch<SetStateAction<number>>;
};

const TutorialContext = createContext<Context>({} as Context);
export const useTutorial = () => useContext(TutorialContext);

const Problem = () => {
  const [isTutorial, setIsTutorial] = useState(false);
  const [tutorialIndex, setTutorialIndex] = useState(1);

  return (
    <>
      {isTutorial ? (
        <div className="absolute z-10 h-full w-full backdrop-blur" />
      ) : null}
      <TutorialContext.Provider value={{ tutorialIndex, setTutorialIndex }}>
        <Split className="flex h-full" gutterSize={10} gutterAlign="center">
          <Description />
          <CodeEditor />
        </Split>
      </TutorialContext.Provider>
    </>
  );
};

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
      <div className="relative">
        <Problem />
      </div>
    </ProblemContextProvider>
  );
}
