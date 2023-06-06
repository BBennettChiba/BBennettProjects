import { Comment } from "src/components/Comment";
import type { CommentsFromByIdQueryOutput } from "~/server/api/root";

type Props = {
  comments: CommentsFromByIdQueryOutput;
};

export function CommentsList({ comments }: Props) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment {...comment} />
        </div>
      ))}
    </>
  );
}
