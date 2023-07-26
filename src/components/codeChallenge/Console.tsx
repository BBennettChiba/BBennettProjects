import { type Problem } from "~/server/api/root";

type Props = {
  problem: NonNullable<Problem>;
  run: () => void;
};
export default function newFunction({ problem, run }: Props) {
  const selected = 1;
  return (
    <div className="h-full w-full overflow-auto break-words text-sm text-white">
      <div className="tabs flex-nowrap">
        <a className="tab">test cases</a>
        <a className="tab">results</a>

        <button onClick={run} className="btn btn-accent btn-xs ml-auto mr-3">
          run
        </button>
      </div>
      <div>
        <div className="mx-5 my-4 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {problem.examples.map((e, i) => (
                <button
                  key={i}
                  className={`flex cursor-pointer items-center rounded-lg px-4 py-1 text-center font-medium hover:bg-slate-600 ${
                    selected === i ? "bg-slate-600" : ""
                  } outline outline-1 outline-slate-600 hover:outline-none`}
                >
                  Case {i + 1}
                </button>
              ))}
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
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div className="flex flex-col">
                <div className="text-xs font-medium">nums =</div>
                <div className="mt-2 cursor-text rounded-lg border border-solid px-3 py-3">
                  <div>{problem.examples[0]?.inputText}</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col">
                <div className="text-xs font-medium ">target =</div>
                <div className="mt-2 cursor-text rounded-lg border border-solid  px-3 py-3">
                  <div>6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
