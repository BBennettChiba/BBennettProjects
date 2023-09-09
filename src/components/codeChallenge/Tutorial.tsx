import { useTutorial } from "~/pages/codeChallenge/[id]";

const BUTTONS = {
  left: "previous",
  right: "next",
};

export const TUTORIAL_INFO = [
  {
    position: "",
    text: {
      description: null,
      title: "Do you want a tutorial?",
      buttons: { left: "No", right: "Yes" },
    },
  },
  {
    position: "right-1/4 translate-x-1/2",
    text: {
      title: "Description",
      description:
        "This is the problem description. Read it to understand the problem",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2",
    text: {
      title: "Examples",
      description:
        "These are the problem examples. Make sure you understand why they work",
      buttons: BUTTONS,
    },
  },
  {
    position: "left-1/4 -translate-x-1/2",
    text: {
      title: "Console",
      description: "This is the interface.",
      buttons: BUTTONS,
    },
  },
  {
    position: "left-1/4 -translate-x-1/2 -translate-y-1/2 top-1/4",
    text: {
      title: "Code Editor",
      description: "This is the code Editor. You write your code here.",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2 -translate-y-1/2 top-1/4",
    text: {
      title: "Code View",
      description:
        "If you click the tab you can see the transpiled javascript.",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2 -translate-y-1/2 top-1/4",
    text: {
      title: "Settings",
      description: "Click the cog to open a menu to toggle vim mode.",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2 -translate-y-1/2 top-1/4",
    text: {
      title: "Fullscreen",
      description: "Click the arrows to toggle fullscreen mode",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2 translate-y-1/2",
    text: {
      title: "Test Cases",
      description:
        "Here you can see the test cases of which your code will be tested against",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2 translate-y-1/2",
    text: {
      title: "Extra Tests",
      description:
        "You can add custom cases by clicking the + button and delete them by clicking the case",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2 translate-y-1/2",
    text: {
      title: "Run",
      description: "You can run your code by hitting the run button",
      buttons: BUTTONS,
    },
  },
  {
    position: "right-1/4 translate-x-1/2 translate-y-1/2",
    text: {
      title: "Finished",
      description: "You can end the tutorial now.",
      buttons: { left: "Previous", right: "End" },
    },
  },
];

export default function Tutorial() {
  const { navigateTutorial, tutorialIndex } = useTutorial();
  const current = TUTORIAL_INFO[tutorialIndex];

  return (
    <div className="absolute z-10 h-full w-full backdrop-blur">
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className={`card absolute z-50 h-56 w-96 bg-base-100 shadow-xl transition-all ${
            current?.position || ""
          }`}
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">{current?.text.title}</h2>
            <p>{current?.text.description}</p>
            <div className="card-actions mt-3 flex w-full justify-around">
              <button
                className="btn btn-error w-20"
                onClick={() => navigateTutorial("prev")}
              >
                {current?.text.buttons.left}
              </button>
              <div
                className="btn btn-accent w-20"
                onClick={() => navigateTutorial("next")}
              >
                {current?.text.buttons.right}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
