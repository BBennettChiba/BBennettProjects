import { useState } from "react";
import { Case } from "./Case";
import { raise } from "~/utils/client";
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

const isSuccessful = (arr: { success: boolean }[], index: number) => {
  const obj = arr[index];
  if (!obj) return raise("Invalid index");
  return obj.success;
};

export default function ConsoleDisplay(props: Props) {
  const isProblem = props.type === "problem";
  const [selected, setSelected] = useState(0);

  const argNames = isProblem ? props.problem.argNames : props.results.argNames;

  const testResults = isProblem ? null : props.results.testResults;

  const cases = isProblem
    ? props.problem.examples.map((e) => e.test)
    : props.results.testResults.map((r) => r.input);

  const [testCases, setTestCases] = useState(cases);

  const outputs = isProblem
    ? null
    : props.results.testResults.map((r) => r.output);

  const handleSelect = (i: number) => {
    if (i === selected && i > cases.length - 1) {
      setTestCases(testCases.filter((_, ind) => i !== ind));
      return setSelected(i - 1);
    }
    setSelected(i);
  };

  const addNewTestCase = () => {
    setTestCases([
      ...testCases,
      {
        args: [...testCases[0]!.args],
        answer: testCases[0]!.answer,
      },
    ]);
    setSelected(testCases.length);
  };

  const changeTestCase = ({
    parsedValue,
    caseIndex,
    argIndex,
  }: {
    parsedValue: unknown;
    argIndex?: number;
    caseIndex: number;
  }) => {
    const isArg = !!argIndex;
    setTestCases((t) => {
      const testCasesCopy = [...t];
      if (isArg) testCasesCopy[caseIndex]!.args[argIndex] = parsedValue;
      else testCasesCopy[caseIndex]!.answer = parsedValue;
      return testCasesCopy;
    });
  };

  return (
    <div className="mx-5 my-4 flex flex-col">
      {!isProblem ? <Result success={props.results.success} /> : null}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {testCases.map((_, i) => (
            <button
              onClick={() => handleSelect(i)}
              key={i}
              className={`
                ${
                  selected === i && i > cases.length - 1
                    ? "hover:bg-red-500"
                    : "hover:bg-slate-600"
                }
                flex cursor-pointer items-center rounded-lg px-4 py-1 text-center font-medium ${
                  selected === i ? "bg-slate-600" : ""
                }  outline outline-1 outline-slate-600 hover:outline-none`}
            >
              {testResults ? (
                <div
                  className={`h-1 w-1 rounded-full ${
                    isSuccessful(testResults, i) ? "bg-green-500" : "bg-red-500"
                  } mr-1`}
                />
              ) : null}
              <div>Case {i + 1}</div>
            </button>
          ))}
          {isProblem ? (
            <button
              className="flex h-4 w-4 cursor-pointer items-center justify-center rounded"
              onClick={addNewTestCase}
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
      {testCases.map((cas, caseIndex) => (
        <Case
          key={caseIndex}
          type={isProblem ? "test" : "result"}
          isVisible={selected === caseIndex}
          cas={cas}
          argNames={argNames}
          disabled={!isProblem || caseIndex < cases.length}
          output={outputs ? outputs[caseIndex] : undefined}
          changeTestCase={(parsedValue: unknown, argIndex?: number) =>
            changeTestCase({ parsedValue, argIndex, caseIndex })
          }
        />
      ))}
    </div>
  );
}

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
