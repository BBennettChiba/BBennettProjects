import { useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PostByIdQueryOutput } from "~/server/api/root";

type Props = {
  postId: string;
  parentId: string | null;
};

export default function CommentForm({ postId, parentId }: Props) {
  const loading = false;
  const [message, setMessage] = useState("");
  const client = useQueryClient();

  const { mutate, error } = api.comment.create.useMutation({
    onSuccess: (data) => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        [
          ["post", "byId"],
          {
            input: {
              id: postId,
            },
            type: "query",
          },
        ],
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          const oldComments = oldData.comments;
          return { ...oldData, comments: [data, ...oldComments] };
        }
      );
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ message, postId, parentId });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-20 flex gap-2">
        <textarea
          className="min-h-full flex-grow resize-y rounded-lg border-2 border-solid border-purple-700 p-2 focus:border-purple-300 focus:outline-none"
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn-primary btn h-20"
          disabled={loading || !message.trim()}
        >
          {loading ? "loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error ? "error" : ""}</div>
      <ReactQueryDevtools />
    </form>
  );
}
