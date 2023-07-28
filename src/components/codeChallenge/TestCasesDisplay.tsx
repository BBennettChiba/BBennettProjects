import { useState } from "react";
import { Case } from "./Case";
import { useProblem } from "~/context/ProblemContext";

export default function ConsoleDisplay() {
  const { problem, tests, setTests } = useProblem();
  console.log(tests);

  const [selected, setSelected] = useState(0);

  const argNames = problem.argNames;

  const handleSelect = (i: number) => {
    if (i === selected && i > problem.examples.length - 1) {
      setTests(tests.filter((_, ind) => i !== ind));
      return setSelected(i - 1);
    }
    setSelected(i);
  };

  const addNewTestCase = () => {
    setTests([
      ...tests,
      {
        args: [...tests[0]!.args],
        answer: tests[0]!.answer,
      },
    ]);
    setSelected(tests.length);
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
    console.log(parsedValue, caseIndex, argIndex, isArg);
    setTests((t) => {
      const testCasesCopy = [...t];
      if (isArg) testCasesCopy[caseIndex]!.args[argIndex] = parsedValue;
      else testCasesCopy[caseIndex]!.answer = parsedValue;
      return testCasesCopy;
    });
  };

  return (
    <div className="mx-5 my-4 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {tests.map((_, i) => (
            <button
              onClick={() => handleSelect(i)}
              key={i}
              className={`
                ${
                  selected === i && i > problem.examples.length - 1
                    ? "hover:bg-red-500"
                    : "hover:bg-slate-600"
                }
                flex cursor-pointer items-center rounded-lg px-4 py-1 text-center font-medium ${
                  selected === i ? "bg-slate-600" : ""
                }  outline outline-1 outline-slate-600 hover:outline-none`}
            >
              <div>Case {i + 1}</div>
            </button>
          ))}
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
        </div>
      </div>
      {tests.map((test, caseIndex) => (
        <Case
          key={caseIndex}
          type={"test"}
          isVisible={selected === caseIndex}
          test={test}
          argNames={argNames}
          disabled={caseIndex < problem.examples.length}
          changeTestCase={({
            parsedValue,
            argIndex,
          }: {
            parsedValue: unknown;
            argIndex?: number;
          }) => changeTestCase({ parsedValue, argIndex, caseIndex })}
        />
      ))}
    </div>
  );
}
