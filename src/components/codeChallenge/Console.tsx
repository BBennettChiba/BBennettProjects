import { useState } from "react";
import ConsoleDisplay from "./ConsoleDisplay";
import { type Problem } from "~/server/api/root";
import { type Results } from "~/utils/problems";

type Props = {
  problem: NonNullable<Problem>;
  run: () => Results;
};

type Display = "test cases" | "results";

export default function Console({ problem, run }: Props) {
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
          onClick={() => setResults(run())}
          className="btn btn-accent btn-xs ml-auto mr-3"
        >
          run
        </button>
      </div>
      <div className="flex flex-1 flex-col">
        {display === "test cases" ? (
          <ConsoleDisplay problem={problem} type="problem" />
        ) : (
          <div className="flex flex-1 flex-col">
            {results ? (
              <ConsoleDisplay results={results} type="results" />
            ) : (
              <div className="flex h-full flex-1 items-center justify-center">
                <div>Please Run</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
