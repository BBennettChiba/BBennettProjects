import Arg from "./Arg";

type Props = {
  cas: { args: unknown[]; answer: unknown };
  argNames: string[];
  output: unknown | null;
  visible: boolean;
  setArg: (parsedValue: unknown, argIndex: number) => void;
  disabled: boolean;
};

export const Case = ({
  cas,
  argNames,
  output,
  visible,
  setArg,
  disabled,
}: Props) => (
  <div className={`${visible ? "" : "hidden"}`}>
    <div className="mt-4 text-xs font-medium">
      <div className="text-xs font-medium">Input</div>
      <div className="ml-4 mt-2 rounded-md bg-slate-700 p-2">
        {cas.args.map((arg, j) => (
          <Arg
            key={j}
            name={argNames[j]!}
            arg={arg}
            setArg={(parsedValue: unknown) => setArg(parsedValue, j)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
    <div className="mt-4">
      <div className="text-xs font-medium ">Expected output =</div>
      <div className="flex flex-col">
        <div className="mt-2 cursor-text rounded-lg border border-solid  bg-slate-700 px-3 py-3">
          <div>{JSON.stringify(cas.answer)}</div>
        </div>
      </div>
    </div>
    {output ? (
      <div className="mt-4">
        <div className="text-xs font-medium">Actual Output</div>
        <div className="flex flex-col">
          <div className="mt-2 cursor-text rounded-lg border border-solid  bg-slate-700 px-3 py-3">
            <div>{JSON.stringify(output)}</div>
          </div>
        </div>
      </div>
    ) : null}
  </div>
);
