import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { CommentsFromByIdQuery as Comments } from "~/server/api/root";
import { Comment } from "src/components/Comment";
type Props = {
  comments: Comments;
};

export const CommentsList = ({ comments }: Props) => {
  const [parent] = useAutoAnimate();
  return (
    <div ref={parent}>
      {comments.map((comment) => (
        <div key={comment.id} className="mx-0 my-2 last:mb-0">
          <Comment {...comment} />
        </div>
      ))}
    </div>
  );
};
