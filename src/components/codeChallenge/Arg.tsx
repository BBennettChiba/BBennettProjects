import { useState } from "react";

type Props = {
  name: string;
  arg: unknown;
  setArg: (value: unknown) => void;
  disabled: boolean
};

export default function Arg({
  name,
  disabled,
  arg,
  setArg,
}: Props) {
  const argAsString = JSON.stringify(arg);
  const [value, setValue] = useState(argAsString);
  const typeOfArg = typeof arg;

  const handleEdit = (content: string) => {
    setValue(content);
  };

  const checkIfSerializable = () => {
    let parsedValue: unknown;
    try {
      parsedValue = JSON.parse(value);
      if (typeof parsedValue !== typeOfArg) {
        alert("invalid type");
        return setValue(argAsString);
      }
    } catch (e) {
      console.log(e);
      alert("not serializable");
      return setValue(argAsString);
    }
    setArg(parsedValue);
  };

  return (
    <div className="flex flex-col">
      <div className="pt-2 text-xs font-medium">{name} =</div>
      <div className="mt-2 h-8 cursor-text rounded-lg border border-solid">
        <input
          type="text"
          className="h-full w-full appearance-none bg-inherit p-2"
          onChange={(e) => handleEdit(e.target.value)}
          onBlur={checkIfSerializable}
          value={value}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
