import type { CommentsFromByIdQueryOutput } from "~/server/api/root";
type Props = CommentsFromByIdQueryOutput[number];
export function Comment({
  createdAt,
  id,
  message,
  parentId,
  updatedAt,
  user,
}: Props) {
  return <div>{message}</div>;
}
