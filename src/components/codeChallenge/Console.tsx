import { useState } from "react";
import ResultDisplay from "./ResultDisplay";
import TestCasesDisplay from "./TestCasesDisplay";
import { useProblem } from "~/context/ProblemContext";
import { useTutorial } from "~/pages/codeChallenge/[id]";
import { type Results } from "~/utils/problems";

type Display = "test cases" | "results";

/**@TODO see why results isn't working when you first run it */

export default function Console() {
  const { runCode, tests } = useProblem();
  const [display, setDisplay] = useState<Display>("test cases");
  const [results, setResults] = useState<null | Results>(null);
  const { tutorialIndex } = useTutorial();

  return (
    <div
      className={`flex h-full w-full flex-1 flex-col overflow-auto break-words text-sm text-white ${
        tutorialIndex === 4 ? "z-30" : ""
      }`}
    >
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
          onClick={() => {
            setResults(runCode(tests));
            setDisplay("results");
          }}
          className="btn btn-accent btn-xs ml-auto mr-3"
        >
          run
        </button>
      </div>
      <div className="flex flex-1 flex-col">
        {display === "test cases" ? (
          <TestCasesDisplay />
        ) : (
          <ResultDisplay results={results} />
        )}
      </div>
    </div>
  );
}
