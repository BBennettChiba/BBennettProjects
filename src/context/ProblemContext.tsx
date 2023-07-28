import { type ReactNode, createContext, useContext } from "react";
import { api } from "~/utils/api";
import { type Problem } from "~/utils/problems";

type Props = {
  children: ReactNode;
  id: string;
};

type Context = {
  problem: NonNullable<Problem>;
};

const ProblemContext = createContext<Context>({} as Context);

export const useProblem = () => useContext<Context>(ProblemContext);

export const ProblemContextProvider = ({ children, id: problemId }: Props) => {
  const { data: problem, status } = api.problem.get.useQuery(problemId);
  // const client = useQueryClient();
  // const queryKey = [["problem", "get"], { input: problemId, type: "query" }];

  problem;
  if (status === "loading") return <div>loading</div>;
  if (status === "error") return <div>error</div>;

  problem;
  return (
    <ProblemContext.Provider
      value={{
        problem,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};
