import { useState } from "react";
import { type Results, type Problem } from "~/utils/problems";

type ProblemProps = {
  type: "problem";
  problem: NonNullable<Problem>;
};

type ResultsProps = {
  type: "results";
  results: Results;
};

type Props = ProblemProps | ResultsProps;

export default function ConsoleDisplay(props: Props) {
  const isProblem = props.type === "problem";
  const [selected, setSelected] = useState(0);
  const argNames = isProblem ? props.problem.argNames : props.results.argNames;

  const testResults = isProblem ? null : props.results.testResults;

  const cases = isProblem
    ? props.problem.examples.map((e) => e.test)
    : props.results.testResults.map((r) => r.input);
  const outputs = isProblem
    ? null
    : props.results.testResults.map((r) => r.output);
  return (
    <div className="mx-5 my-4 flex flex-col">
      {!isProblem ? <Result success={props.results.success} /> : null}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {cases.map((_, i) => (
            <button
              onClick={() => setSelected(i)}
              key={i}
              className={`flex cursor-pointer items-center rounded-lg px-4 py-1 text-center font-medium hover:bg-slate-600 ${
                selected === i ? "bg-slate-600" : ""
              } outline outline-1 outline-slate-600 hover:outline-none`}
            >
              {testResults ? (
                <div
                  className={`h-1 w-1 rounded-full ${
                    testResults[i]!.success ? "bg-green-500" : "bg-red-500"
                  } mr-1`}
                />
              ) : null}
              <div>Case {i + 1}</div>
            </button>
          ))}
          {isProblem ? (
            <button
              className="flex h-4 w-4 cursor-pointer items-center justify-center rounded"
              onClick={() => console.log("add")}
            >
              <svg
                fill="currentColor"
                height="1em"
                viewBox="0 0 24 24"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M13 11h7a1 1 0 110 2h-7v7a1 1 0 11-2 0v-7H4a1 1 0 110-2h7V4a1 1 0 112 0v7z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      {cases.map((c, i) => (
        <div key={i} className={`${selected === i ? "" : "hidden"}`}>
          <div className="mt-4 text-xs font-medium">
            <div className="text-xs font-medium">Input</div>
            <div className="ml-4 mt-2 rounded-md bg-slate-700 p-2">
              {c.args.map((arg, j) => (
                <div key={j} className="flex flex-col">
                  <div className="pt-2 text-xs font-medium">
                    {argNames[j]} =
                  </div>
                  <div className="mt-2 cursor-text rounded-lg border border-solid px-3 py-3">
                    <div>{JSON.stringify(arg)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs font-medium ">Expected output =</div>
            <div className="flex flex-col">
              <div className="mt-2 cursor-text rounded-lg border border-solid  bg-slate-700 px-3 py-3">
                <div>{JSON.stringify(c.answer)}</div>
              </div>
            </div>
          </div>
          {!isProblem ? (
            <div className="mt-4">
              <div className="text-xs font-medium">Actual Output</div>
              <div className="flex flex-col">
                <div className="mt-2 cursor-text rounded-lg border border-solid  bg-slate-700 px-3 py-3">
                  <div>{JSON.stringify(outputs[i])}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/*<div className="text-white gap-[0.5rem] flex flex-wrap text-sm break-words bg-zinc-800">
  <div>
    <div className="bg-white/[0.1] cursor-pointer font-medium py-1 px-4 rounded-lg">
      <div className="items-center flex">
        <div className="ml-1.5">Case 1</div>
      </div>
    </div>
  </div>
  <div>
    <div className="text-gray-100/[0.6] cursor-pointer font-medium py-1 px-4 rounded-lg">
      <div className="items-center flex">
        <div className="ml-1.5">Case 2</div>
      </div>
    </div>
  </div>
  <div>
    <div className="text-gray-100/[0.6] cursor-pointer font-medium py-1 px-4 rounded-lg">
      <div className="items-center flex">
        <div className="ml-1.5">Case 3</div>
      </div>
    </div>
  </div>
</div>
*/

const Result = ({ success }: { success: boolean }) => (
  <div className="mb-2 flex items-center text-white">
    <div
      className={`text-2xl font-medium ${
        success ? "text-green-500" : "text-red-500"
      }`}
    >
      {success ? "Accepted" : "Wrong Answer"}
    </div>
  </div>
);
