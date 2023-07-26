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
  const [selected, setSelected] = useState(0);
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

/*<div className="h-full w-full text-white text-sm break-words bg-zinc-800">
  <div className="my-4 mx-5">
    <div className="items-center flex">
      <div className="text-green-500 text-xl font-medium">Accepted</div>
      <div className="text-gray-100/[0.6] ml-4">Runtime: 96 ms</div>
    </div>
    <div className="gap-2 flex flex-wrap mt-4">
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
    <div className="mt-4">
      <div>
        <div className="text-gray-100/[0.6] text-xs font-medium mb-2">Input</div>
        <div>
          <div className="bg-white/[0.07] relative rounded-lg">
            <div className="py-3">
              <div className="text-gray-100/[0.6] text-xs mb-2 mx-3">nums =</div>
              <div className="break-all">
                <div className="mx-3">[2,7,11,15]</div>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.07] mt-2 relative rounded-lg">
            <div className="py-3">
              <div className="text-gray-100/[0.6] text-xs mb-2 mx-3">target =</div>
              <div className="break-all">
                <div className="mx-3">9</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="text-gray-100/[0.6] flex text-xs font-medium">Output</div>
        <div className="bg-white/[0.07] mt-2 relative rounded-lg">
          <div className="py-3">
            <div className="break-all">
              <div className="mx-3">[0,1]</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="text-gray-100/[0.6] flex text-xs font-medium">Expected</div>
        <div className="bg-white/[0.07] mt-2 relative rounded-lg">
          <div className="py-3">
            <div className="break-all">
              <div className="mx-3">[0,1]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="items-center text-gray-100/[0.6] flex justify-center mx-auto mt-4">
      <div className="flex py-1.5 px-2 rounded">
        <svg className="h-5 w-5" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M12 5.236C10.56 4.156 9.12 3.47 7.68 3.47c-2.16 0-5.399 1.62-5.399 5.94 0 3.835 2.782 7.381 8.345 10.638l.384.221a2 2 0 001.98 0c5.82-3.317 8.729-6.936 8.729-10.86 0-4.319-3.24-5.939-5.4-5.939-1.439 0-2.88.688-4.319 1.767zm-1.2 1.6l1.2.9 1.2-.9c1.238-.928 2.267-1.367 3.12-1.367 1.804 0 3.399 1.396 3.399 3.94 0 2.993-2.346 5.981-7.357 8.912l-.362.21c-5.26-2.998-7.719-6.058-7.719-9.122 0-2.544 1.595-3.94 3.4-3.94.852 0 1.881.44 3.119 1.367z" fill="currentColor" fillRule="evenodd" />
        </svg>
        <div className="ml-1">Contribute a testcase</div>
      </div>
    </div>
  </div>
</div>
*/
