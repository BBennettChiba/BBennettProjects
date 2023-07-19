import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { CommentsFromByIdQuery as Comments } from "~/server/api/root";
import { Comment } from "src/components/Comment";
type Props = {
  comments: Comments;
};

export const CommentsList = ({ comments }: Props) => {
  const [top] = useAutoAnimate();
  const [nested] = useAutoAnimate();
  return (
    <div ref={top}>
      {comments.map((comment) => (
        <div ref={nested} key={comment.id} className="mx-0 my-2 last:mb-0">
          <Comment {...comment} />
        </div>
      ))}
    </div>
  );
};
