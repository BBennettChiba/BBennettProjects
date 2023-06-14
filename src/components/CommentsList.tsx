import type { CommentsFromByIdQuery as Comments } from "~/server/api/root";
import { Comment } from "src/components/Comment";

type Props = {
  comments: Comments;
};

export const CommentsList = ({ comments }: Props) => {
  comments;
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="mx-0 my-2 last:mb-0">
          <Comment {...comment} />
        </div>
      ))}
    </>
  );
};
