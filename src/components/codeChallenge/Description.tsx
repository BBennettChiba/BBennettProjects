import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useProblem } from "~/context/ProblemContext";
import { useTutorial } from "~/pages/codeChallenge/[id]";
import { type Problems } from "~/utils/problems";

export default function Description() {
  const { tutorialIndex } = useTutorial();
  const { problem } = useProblem();

  return (
    <div
      className={`flex flex-col overflow-auto ${
        tutorialIndex === 1 ? "z-30" : ""
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div className="tabs bg-base-300">
          <a className="tab tab-active tab-lifted tab-lg">Description</a>
        </div>
        <div className="max-w-[45vw] flex-1 space-y-4 bg-base-100 p-4">
          <h1 className="text-2xl">{problem.title}</h1>
          <div className="flex space-x-4 text-xs">
            <div className="badge badge-success">easy</div>
            <div>
              <FaCheckCircle size={20} />
            </div>
          </div>
          <div className="space-y-2">
            {problem.problemStatement.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="relative">
            <div className="space-y-3">
              <Examples examples={problem.examples} />
            </div>
            {tutorialIndex === 2 ? (
              <div className="absolute top-0 z-30 w-full space-y-3">
                <Examples examples={problem.examples} />
              </div>
            ) : null}
          </div>
          <div className="space-y-2">
            <h3 className="text-white">Constraints</h3>
            <ul className=" ml-5 list-disc space-y-2">
              {problem.constraints.map((c, i) => (
                <li key={i}>
                  <div>{c}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Examples = ({ examples }: { examples: Problems[number]["examples"] }) => (
  <>
    {examples.map((ex, i) => (
      <div key={i}>
        <h2 className="text-xl text-white">Example {ex.id}</h2>
        <div className="m-5 space-y-2 rounded-lg bg-slate-600 p-2">
          <div>
            <span className="text-white">Input:</span> {ex.inputText}
          </div>
          <div>
            <span className="text-white">Output:</span> {ex.outputText}
          </div>
          <div>
            <span className="text-white">Explanation:</span> {ex.explanation}
          </div>
        </div>
      </div>
    ))}
  </>
);
