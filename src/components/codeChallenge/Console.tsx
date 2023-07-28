import { useState } from "react";
import ResultDisplay from "./ResultDisplay";
import TestCasesDisplay from "./TestCasesDisplay";
import { useProblem } from "~/context/ProblemContext";
import { type Results } from "~/utils/problems";

type Display = "test cases" | "results";

export default function Console() {
  const { problem, runCode, tests } = useProblem();
  const [display, setDisplay] = useState<Display>("test cases");
  const [results, setResults] = useState<null | Results>(null);

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-auto break-words text-sm text-white">
      <div className="tabs flex-nowrap">
        <a
          onClick={() => setDisplay("test cases")}
          className={`tab tab-bordered ${
            display === "test cases" ? "tab-active" : ""
          }`}
        >
          test cases
        </a>
        <a
          onClick={() => setDisplay("results")}
          className={`tab tab-bordered ${
            display === "results" ? "tab-active" : ""
          }`}
        >
          results
        </a>

        <button
          onClick={() => setResults(runCode(tests))}
          className="btn btn-accent btn-xs ml-auto mr-3"
        >
          run
        </button>
      </div>
      <div className="flex flex-1 flex-col">
        {display === "test cases" ? (
          <TestCasesDisplay />
        ) : (
          <>
            {results ? (
              <ResultDisplay results={results} />
            ) : (
              <div className="flex h-full flex-1 items-center justify-center">
                <div>Please Run</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
