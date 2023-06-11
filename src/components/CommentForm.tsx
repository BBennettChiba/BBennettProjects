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
      <div className="comment-form-row">
        <textarea
          className="message-input"
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn" disabled={loading}>
          {loading ? "loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error ? "error" : ""}</div>
      <ReactQueryDevtools />
    </form>
  );
}
