import { type Dispatch, type SetStateAction } from "react";
import { FaRetweet } from "react-icons/fa";

type View = "js" | "ts";
type Props = {
  setCodeView: Dispatch<SetStateAction<View>>;
  tutorialIndex: number;
  codeView: View;
};

const CodeViw = ({ setCodeView, codeView, tutorialIndex }: Props) => (
  <div
    onClick={() => setCodeView((v) => (v === "js" ? "ts" : "js"))}
    className={`flex w-min cursor-pointer items-center ${
      tutorialIndex === 6 ? "z-30" : ""
    }`}
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
);

export default CodeViw;
