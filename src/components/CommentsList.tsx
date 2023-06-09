import { Comment } from "src/components/Comment";
import type { CommentsFromByIdQuery as Comments } from "~/server/api/root";

type Props = {
  comments: Comments;
};

export function CommentsList({ comments }: Props) {
  comments;
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-stack">
          <Comment {...comment} />
        </div>
      ))}
    </>
  );
}
