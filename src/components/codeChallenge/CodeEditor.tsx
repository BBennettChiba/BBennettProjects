import { javascript } from "@codemirror/lang-javascript";
import { vim } from "@replit/codemirror-vim";
import ReactCodeMirror from "@uiw/react-codemirror";
import { basicSetup } from "codemirror";
import { useEffect, useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import Split from "react-split";
import Console from "./Console";
import { useProblem } from "~/context/ProblemContext";
import { useTutorial } from "~/pages/codeChallenge/[id]";

type View = "ts" | "js";

export default function CodeEditor() {
  const { tsCode, setTSCode, jsCode } = useProblem();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [codeView, setCodeView] = useState<View>("ts");
  const [vimMode, setVimMode] = useState(false);
  const { tutorialIndex } = useTutorial();

  const handleFullScreen = () => {
    if (isFullscreen) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
    setIsFullscreen((f) => !f);
  };

  useEffect(() => {
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        return;
      }
      setIsFullscreen(true);
    };

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);
    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
      document.removeEventListener("webkitfullscreenchange", exitHandler);
      document.removeEventListener("mozfullscreenchange", exitHandler);
      document.removeEventListener("MSFullscreenChange", exitHandler);
    };
  }, [isFullscreen]);

  const toggleVim = () => setVimMode((v) => !v);

  return (
    <Split
      sizes={[75, 25]}
      gutterSize={5}
      gutterAlign="center"
      className={`flex h-[calc(100vh-8rem)] flex-col ${
        tutorialIndex === 2 ? "z-30" : ""
      }`}
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
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              <FaCog className="hover:scale-125" size={20} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a onClick={toggleVim}>vim mode</a>
              </li>
            </ul>
          </div>
          <button className="pr-4" onClick={handleFullScreen}>
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
          extensions={[
            javascript({ typescript: true }),
            vimMode ? vim() : basicSetup,
          ]}
          className={`flex-1 overflow-auto ${
            tutorialIndex === 3 ? "z-30" : ""
          }`}
          height="100%"
          onChange={(v) => setTSCode(v)}
        />
      </div>
      <Console />
    </Split>
  );
}
