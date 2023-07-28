import { useState } from "react";

type Props = {
  name?: string;
  value: unknown;

  changeTestCase?: ({ parsedValue }: { parsedValue: unknown }) => void;
};

export default function Arg({
  name,
  value,
  changeTestCase = () => null,
}: Props) {
  const argAsString = JSON.stringify(value);
  const [stateValue, setStateValue] = useState(argAsString);
  const typeOfArg = typeof value;

  const handleEdit = (content: string) => {
    setStateValue(content);
  };

  const checkIfSerializable = () => {
    let parsedValue: unknown;
    try {
      parsedValue = JSON.parse(stateValue);
      if (typeof parsedValue !== typeOfArg) {
        alert("invalid type");
        return setStateValue(argAsString);
      }
    } catch (e) {
      console.log(e);
      alert("not serializable");
      return setStateValue(argAsString);
    }
    changeTestCase({ parsedValue });
  };

  return (
    <div className="flex flex-col">
      {name ? <div className="pt-2 text-xs font-medium">{name} =</div> : null}
      <div className="mt-2 h-8 cursor-text rounded-lg border border-solid">
        <input
          type="text"
          className="h-full w-full appearance-none bg-inherit p-2"
          onChange={(e) => handleEdit(e.target.value)}
          onBlur={checkIfSerializable}
          value={stateValue}
        />
      </div>
    </div>
  );
}
