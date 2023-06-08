import type { CommentFromByIdQuery as Comment } from "~/server/api/root";
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type Props = Comment;

export function Comment({
  createdAt,
  id,
  message,
  parentId,
  updatedAt,
  user,
}: Props) {
  return (
    <div>
      <div>
        <span>{user.name}</span>
        <span>{dateFormatter.format(createdAt)}</span>
      </div>
      <div>{message}</div>
    </div>
  );
}
