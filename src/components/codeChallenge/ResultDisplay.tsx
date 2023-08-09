import { useState } from "react";
import { Case } from "./Case";
import { raise } from "~/utils/client";
import { type Results } from "~/utils/problems";

type Props = {
  results: Results | null;
};

const isSuccessful = (arr: { success: boolean }[], index: number) => {
  const obj = arr[index];
  if (!obj) return raise("Invalid index");
  return obj.success;
};

export default function ResultDisplay({ results }: Props) {
  const [selected, setSelected] = useState(0);

  const testResults = results?.testResults || [];
  const cases = testResults.map((r) => r.input);
  const [testCases, setTestCases] = useState(cases);

  if (!results)
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <div>Please Run</div>
      </div>
    );

  const argNames = results.argNames;

  const outputs = testResults.map((r) => r.output);

  const handleSelect = (i: number) => {
    if (i === selected && i > cases.length - 1) {
      setTestCases(testCases.filter((_, ind) => i !== ind));
      return setSelected(i - 1);
    }
    setSelected(i);
  };

  return (
    <div className="mx-5 my-4 flex flex-col">
      <Result success={results.success} />
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {testCases.map((_, i) => (
            <button
              onClick={() => handleSelect(i)}
              key={i}
              className={`flex cursor-pointer items-center rounded-lg px-4 py-1 text-center font-medium ${
                selected === i ? "bg-slate-600" : ""
              }  outline outline-1 outline-slate-600 hover:outline-none`}
            >
              <div
                className={`h-1 w-1 rounded-full ${
                  isSuccessful(testResults, i) ? "bg-green-500" : "bg-red-500"
                } mr-1`}
              />
              <div>Case {i + 1}</div>
            </button>
          ))}
        </div>
      </div>
      {testCases.map((cas, caseIndex) => (
        <Case
          key={caseIndex}
          type={"result"}
          isVisible={selected === caseIndex}
          test={cas}
          argNames={argNames}
          disabled={true}
          output={outputs[caseIndex]}
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
