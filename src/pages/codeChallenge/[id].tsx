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
import Tutorial, { TUTORIAL_INFO } from "~/components/codeChallenge/Tutorial";
import { ProblemContextProvider } from "~/context/ProblemContext";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

type Context = {
  tutorialIndex: number;
  navigateTutorial: (dir: "next" | "prev") => void;
};

const TutorialContext = createContext<Context>({} as Context);
export const useTutorial = () => useContext(TutorialContext);

const Problem = () => {
  const [isTutorial, setIsTutorial] = useState(true);
  const [tutorialIndex, setTutorialIndex] = useState(0);

  const navigateTutorial = (dir: "next" | "prev") => {
    switch (dir) {
      case "next":
        if (tutorialIndex === TUTORIAL_INFO.length - 1)
          return setIsTutorial(false);
        return setTutorialIndex((i) => i + 1);
      case "prev":
        if (tutorialIndex === 0) return setIsTutorial(false);
        return setTutorialIndex((i) => i - 1);
    }
  };

  return (
    <TutorialContext.Provider value={{ tutorialIndex, navigateTutorial }}>
      {isTutorial ? <Tutorial /> : null}
      <Split className="flex h-full" gutterSize={10} gutterAlign="center">
        <Description />
        <CodeEditor />
      </Split>
    </TutorialContext.Provider>
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
