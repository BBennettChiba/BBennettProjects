import { markdownLanguage, markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

type Props = {
  onSave: (post: { title: string; body: string }) => void;
  onCancel: () => void;
  initialValues?: { title: string; body: string };
};
export default function SDFANoteEditor({
  onSave,
  onCancel,
  initialValues,
}: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [body, setBody] = useState(initialValues?.body ?? "");

  return (
    <div className="lg-w-3/4 w-full p-2">
      <div className="p-2">
        <h2 className="text-xl">TITLE</h2>
        <input
          type="text"
          placeholder="Post title"
          className="input w-full bg-gray-400 font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="lg-min-h-[30vh] min-h-[50vh]">
        <CodeMirror
          className="h-full border border-gray-300 p-2"
          value={body}
          onChange={(e) => setBody(e)}
          height="50vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
        />
      </div>
      <div className="flex justify-end gap-3 pt-3">
        <button
          className="h-8 w-16 rounded-sm bg-red-500 px-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="h-8 w-16 rounded-sm bg-green-500 px-2 text-black disabled:bg-opacity-40"
          onClick={() => {
            onSave({ title, body });
            setBody("");
            setTitle("");
          }}
          disabled={!title.trim() || !body.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
