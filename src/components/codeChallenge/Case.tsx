import DisabledLabel from "./DisabledLabel";
import EnabledLabel from "./EnabledLabel";

type BaseProps = {
  cas: { args: unknown[]; answer: unknown };
  argNames: string[];
  isVisible: boolean;
  changeTestCase: ({
    parsedValue,
    argIndex,
  }: {
    parsedValue: unknown;
    argIndex?: number;
  }) => void;
  disabled: boolean;
};

type TestProps = BaseProps & { type: "test" };
type ResultProps = BaseProps & { type: "result"; output: unknown };

type Props = TestProps | ResultProps;

export const Case = (props: Props) => {
  const { type, cas, argNames, isVisible, changeTestCase, disabled } = props;
  const output = type === "result" ? props.output : undefined;
  return (
    <div className={`${isVisible ? "" : "hidden"}`}>
      <div className="mt-4 text-xs font-medium">
        <div className="text-xs font-medium">Input</div>
        <div className="ml-4 mt-2 rounded-md bg-slate-700 p-2">
          {cas.args.map((arg, argIndex) =>
            disabled ? (
              <DisabledLabel key={argIndex} value={arg} />
            ) : (
              <EnabledLabel
                key={argIndex}
                name={argNames[argIndex]}
                value={arg}
                changeTestCase={(parsedValue: unknown) =>
                  changeTestCase({ parsedValue, argIndex })
                }
              />
            )
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xs font-medium ">Expected output =</div>
        {disabled ? (
          <DisabledLabel value={cas.answer} />
        ) : (
          <EnabledLabel
            value={cas.answer}
            changeTestCase={({ parsedValue }: { parsedValue: unknown }) =>
              changeTestCase({ parsedValue })
            }
          />
        )}
      </div>
      {type === "result" ? (
        <div className="mt-4">
          <div className="text-xs font-medium">Actual Output</div>
          <DisabledLabel value={output || "undefined"} />
        </div>
      ) : null}
    </div>
  );
};
