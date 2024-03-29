import { useState } from "react";

type Props = {
  autoFocus?: boolean;
  handleSubmit: (message: string) => void;
  error?: string;
  initialValue?: string;
  loading: boolean;
};

export default function CommentForm({
  autoFocus = false,
  handleSubmit,
  error,
  initialValue,
  loading,
}: Props) {
  const [message, setMessage] = useState(initialValue || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(message);
      }}
      autoFocus={autoFocus}
    >
      <div className="flex min-h-20 gap-2">
        <textarea
          className="min-h-full flex-grow resize-y rounded-lg border-2 border-solid border-purple-700 bg-gray-400 p-2 focus:border-purple-300 focus:outline-none"
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="h-20 w-28 rounded-md bg-violet-700 disabled:bg-opacity-50"
          disabled={loading || !message.trim()}
        >
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="text-red-600">{error}</div>
    </form>
  );
}
