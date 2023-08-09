import assert from "assert";
import debounce from "lodash.debounce";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { virtualTS } from "../utils/client";
import { api } from "~/utils/api";
import { type Problem } from "~/utils/problems";
import { type Results } from "~/utils/problems";

type Props = {
  children: ReactNode;
  id: string;
};

type Context = {
  problem: NonNullable<Problem>;
  runCode: (test: Test[]) => Results;
  tsCode: string;
  setTSCode: Dispatch<SetStateAction<string>>;
  jsCode: string;
  tests: Test[];
  setTests: Dispatch<SetStateAction<Test[]>>;
};

type Test = { args: unknown[]; answer: unknown };

const ProblemContext = createContext<Context>({} as Context);

export const useProblem = () => useContext<Context>(ProblemContext);

export const ProblemContextProvider = ({ children, id: problemId }: Props) => {
  const { data: problem, status } = api.problem.get.useQuery(problemId);
  const [tsCode, setTSCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const tsEnv = useRef<Awaited<typeof virtualTS>["env"] | null>(null);

  const debounced = useMemo(
    () =>
      debounce(() => {
        console.log(
          " in env ",
          tsEnv.current?.languageService.getEmitOutput("index.ts")
            .outputFiles[0]?.text
        );
        setJsCode(
          tsEnv.current?.languageService.getEmitOutput("index.ts")
            .outputFiles[0]?.text || ""
        );
      }, 500),
    []
  );

  debounced();

  const [tests, setTests] = useState<Test[]>([{ args: [], answer: null }]);

  useEffect(() => {
    if (!problem) return;
    setTSCode(problem.starterCode);
    setTests(problem.examples.map((e) => e.test));
  }, [problem]);

  useEffect(() => {
    virtualTS
      .then(({ env }) => (tsEnv.current = env))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (!tsEnv.current) return;
    const env = tsEnv.current;
    const sourceFile = env.getSourceFile("index.ts");
    if (!sourceFile) {
      console.log("no source file");
      return;
    }
    env.updateFile("index.ts", tsCode);
  }, [tsCode]);

  if (status === "error") return <div>error</div>;
  if (status === "loading") return <div>loading</div>;

  const runCode = () => {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const func: unknown = new Function(
      `${jsCode}return ${problem.starterFunctionName};`
    )();
    // eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-assignment
    const handler: (...args: unknown[]) => Results = new Function(
      `return ${problem.handlerFunction}`
    )();
    const result = handler(func, assert, tests);
    return result;
  };

  return (
    <ProblemContext.Provider
      value={{
        problem,
        runCode,
        tsCode,
        setTSCode,
        jsCode,
        tests,
        setTests,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};
