import { useState } from "react";
/**@TODO add loading */
type Props = {
  autoFocus?: boolean;
  handleSubmit: (message: string) => void;
  error?: string;
};

export default function CommentForm({
  autoFocus = false,
  handleSubmit,
  error,
}: Props) {
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(message);
      }}
      autoFocus={autoFocus}
    >
      <div className="min-h-20 flex gap-2">
        <textarea
          className="min-h-full flex-grow resize-y rounded-lg border-2 border-solid border-purple-700 p-2 focus:border-purple-300 focus:outline-none"
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn-primary btn h-20" disabled={!message.trim()}>
          Post
        </button>
      </div>
      <div className="text-red-600">{error ? "error" : ""}</div>
    </form>
  );
}
