import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import Split from "react-split";
import Console from "./Console";
import { useProblem } from "~/context/ProblemContext";

type View = "ts" | "js";

export default function CodeEditor() {
  const { problem, tsCode, setTSCode, jsCode } = useProblem();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [codeView, setCodeView] = useState<View>("ts");

  return (
    <Split
      sizes={[75, 25]}
      gutterSize={5}
      gutterAlign="center"
      className="flex h-[calc(100vh-8rem)] flex-col"
      direction="vertical"
    >
      <div className="flex flex-col">
        <div className="flex h-12 items-center space-x-6 bg-base-300">
          <div className="flex-1">
            <div
              onClick={() => setCodeView((v) => (v === "js" ? "ts" : "js"))}
              className="flex w-min cursor-pointer items-center"
            >
              <button className="h-8 w-24 rounded-md bg-base-100 px-3 text-center">
                {codeView === "ts" ? "Typescript" : "Javascript"}
              </button>
              <div
                className={`transition-all ${
                  codeView === "ts" ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaRetweet size={20} />
              </div>
            </div>
          </div>
          <button className="h-full">
            <FaCog className="hover:scale-125" size={20} />
          </button>
          <button className="pr-4">
            {isFullscreen ? (
              <AiOutlineFullscreenExit size={20} className="hover:scale-125" />
            ) : (
              <AiOutlineFullscreen size={20} className="hover:scale-125" />
            )}
          </button>
        </div>
        <ReactCodeMirror
          theme="dark"
          readOnly={codeView === "js"}
          value={codeView === "js" ? jsCode : tsCode}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          extensions={[javascript({ typescript: true })]}
          className="flex-1 overflow-auto"
          height="100%"
          onChange={(v) => setTSCode(v)}
        />
      </div>
      <Console />
    </Split>
  );
}
