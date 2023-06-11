import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdownLanguage, markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

type Props = {
  onSave: (post: { title: string; body: string }) => void;
};
export default function NoteEditor({ onSave }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Post title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </h2>
        <CodeMirror
          className="border border-gray-300"
          value={body}
          onChange={(e) => setBody(e)}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
        />
        <div className="card-actions justify-end">
          <button
            className="btn-primary btn"
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
    </div>
  );
}