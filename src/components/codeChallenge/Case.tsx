import DisabledLabel from "./DisabledLabel";
import EnabledLabel from "./EnabledLabel";
import { type Test } from "~/utils/problems";

type BaseProps = {
  test: Test;
  argNames: string[];
  isVisible: boolean;
};

type TestProps = BaseProps & {
  type: "test";
  disabled: boolean;
  changeTestCase: ({
    parsedValue,
    argIndex,
  }: {
    parsedValue: unknown;
    argIndex?: number;
  }) => void;
};
type ResultProps = BaseProps & {
  type: "result";
  disabled: true;
  output: unknown;
};

type Props = TestProps | ResultProps;

export const Case = (props: Props) => {
  const { type, test, argNames, isVisible, disabled } = props;
  const output = type === "result" ? props.output : undefined;
  return (
    <div className={`${isVisible ? "" : "hidden"}`}>
      <div className="mt-4 text-xs font-medium">
        <div className="text-xs font-medium">Input</div>
        <div className="ml-4 mt-2 rounded-md bg-slate-700 p-2">
          {test.args.map((arg, argIndex) =>
            disabled ? (
              <DisabledLabel key={argIndex} value={arg} />
            ) : (
              <EnabledLabel
                key={argIndex}
                name={argNames[argIndex]}
                value={arg}
                changeTestCase={({ parsedValue }: { parsedValue: unknown }) =>
                  props.changeTestCase({ parsedValue, argIndex })
                }
              />
            )
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xs font-medium ">Expected output =</div>
        {disabled ? (
          <DisabledLabel value={test.answer} />
        ) : (
          <EnabledLabel
            value={test.answer}
            changeTestCase={({ parsedValue }: { parsedValue: unknown }) =>
              props.changeTestCase({ parsedValue })
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
