import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

export default function SpongeMock() {
  const session = useSession();
  console.log(session);

  const isLowerCase = (char: string) => char.toLowerCase() === char;
  const [originalText, setOriginalText] = useState("");

  const mockedText = useMemo(() => {
    let result = "";
    for (let i = 0; i < originalText.length; i++) {
      const char = originalText[i];
      const lastChar = i === 0 ? " " : result[i - 1];
      console.log(char, lastChar);
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
    <div className="container mx-auto px-4">
      <div className="text-gray-400">
        <h3 className="my-5 text-[1.17rem] font-bold">
          Type / paste your text here
        </h3>
        <textarea
          onChange={(e) => setOriginalText(e.target.value)}
          className="m-3.5 h-32 w-96 cursor-text resize whitespace-pre-wrap break-words border border-neutral-500 bg-white p-1 text-[0.83rem] text-black"
        ></textarea>

        <h3 className="my-5 text-[1.17rem] font-bold">
          Click your mocking text below to copy to your clipboard
        </h3>

        <textarea
          value={mockedText}
          className="m-3.5 h-32 w-96 cursor-text resize whitespace-pre-wrap break-words border border-neutral-500 bg-white p-1 text-[0.83rem] text-black"
        ></textarea>
      </div>
      <button
        className="btn-primary btn"
        onClick={() => {
          void navigator.clipboard.writeText(mockedText);
        }}
      >
        Copy text to clipboard
      </button>
    </div>
  );
}
