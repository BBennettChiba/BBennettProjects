type Props = {
  name?: string;
  value: unknown;
};

export default function Label({
  name,
  value,
}: Props) {
  const valueAsString = JSON.stringify(value);
  return (
    <div className="flex flex-col">
      {name ? <div className="pt-2 text-xs font-medium">{name} =</div> : null}
      <div className="mt-2 h-8 cursor-text rounded-lg border border-solid">
        <input
          type="text"
          className="h-full w-full appearance-none bg-inherit p-2"
          value={valueAsString}
          disabled={true}
        />
      </div>
    </div>
  );
}
