import { useMemo, useState } from "react";

export default function SpongeMock() {
  const isLowerCase = (char: string) => char.toLowerCase() === char;
  const [originalText, setOriginalText] = useState("");

  const mockedText = useMemo(() => {
    let result = "";
    for (let i = 0; i < originalText.length; i++) {
      const char = originalText[i];
      const lastChar = i === 0 ? " " : result[i - 1];
      if (!char || !lastChar) throw new Error("something went very wrong");
      if (isLowerCase(lastChar)) {
        result += char.toUpperCase();
      } else {
        result += char;
      }
    }
    return result;
  }, [originalText]);

  return (
    <div className="container mx-auto flex-1 px-4">
      <div className="text-md h-full py-10 text-gray-400 md:text-3xl">
        <h3 className="m-3 font-bold">Type / paste your text here</h3>
        <textarea
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          className="h-1/3 w-full cursor-text resize whitespace-pre-wrap break-words rounded-md border border-neutral-500 bg-white p-1 text-sm text-black"
        />

        <h3 className="m-3 font-bold">
          Click your mocking text below to copy to your clipboard
        </h3>

        <textarea
          readOnly
          value={mockedText}
          className="h-1/3 w-full cursor-text resize whitespace-pre-wrap break-words rounded-md border border-neutral-500 bg-white p-1 text-sm text-black"
        />
        <button
          className="btn-primary btn"
          onClick={() => {
            void navigator.clipboard.writeText(mockedText);
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
