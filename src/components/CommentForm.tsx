import { useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { type PostByIdQueryOutput } from "~/server/api/root";

type Props = {
  postId: string;
  parentId: string | null;
  autoFocus?: boolean;
  close?: () => void;
};

export default function CommentForm({
  postId,
  parentId,
  autoFocus = false,
  close,
}: Props) {
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
      if (close) close();
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ message, postId, parentId });
  }

  return (
    <form onSubmit={handleSubmit} autoFocus={autoFocus}>
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
      <div className="text-red-600">{error ? "error" : ""}</div>
    </form>
  );
}
