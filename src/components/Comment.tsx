import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";
import type { CommentFromByIdQuery as Comment } from "~/server/api/root";
import IconBtn from "./IconBtn";
import { useContext, useState } from "react";
import { CommentsContext } from "~/pages/posts/[id]";
import { CommentsList } from "./CommentsList";
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
  const comments = useContext(CommentsContext);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  if (!comments) return null;
  const childComments = comments.get(id);

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">{dateFormatter.format(createdAt)}</span>
        </div>
        <div className="message">{message}</div>
        <div className="footer">
          <IconBtn aria-label="Like" Icon={FaHeart}>
            2
          </IconBtn>
          <IconBtn Icon={FaReply} />
          <IconBtn Icon={FaEdit} />
          <IconBtn Icon={FaTrash} color="red" />
        </div>
      </div>
      {childComments && childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              aria-label="hide replies"
              className="collapse-line"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentsList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
}
