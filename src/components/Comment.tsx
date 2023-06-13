import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";
import type { CommentFromByIdQuery as Comment } from "~/server/api/root";
import IconBtn from "./IconBtn";
import { useContext, useState } from "react";
import { CommentsContext } from "~/pages/posts/[id]";
import { CommentsList } from "./CommentsList";
import CommentForm from "./CommentForm";
import { useRouter } from "next/router";
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type Props = Comment;

/**@TODO functionality to buttons e.g. like, edit, delete */

export function Comment({ createdAt, id: commentId, message, user }: Props) {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== "string") throw new Error("id must be a string");

  const comments = useContext(CommentsContext);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  if (!comments) return null;
  const childComments = comments.get(commentId);

  return (
    <>
      <div className="rounded-lg border border-solid border-blue-300 p-2">
        <div className="mb-1 flex justify-between text-xs text-blue-300">
          <span className="font-bold">{user.name}</span>
          <span className="date">{dateFormatter.format(createdAt)}</span>
        </div>
        <div className="mx-2 whitespace-pre-wrap">{message}</div>
        <div className="mt-2 flex gap-2">
          <IconBtn aria-label="Like" Icon={FaHeart}>
            2
          </IconBtn>
          <IconBtn
            Icon={FaReply}
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            aria-label={isReplying ? "Cancel Reply" : "Replying"}
            color={isReplying ? "red-600" : ""}
          />
          <IconBtn Icon={FaEdit} />
          <IconBtn Icon={FaTrash} color="red" />
        </div>
      </div>
      {isReplying ? (
        <div className="ml-4 mt-1">
          <CommentForm
            autoFocus
            postId={id}
            parentId={commentId}
            close={() => setIsReplying(false)}
          />
        </div>
      ) : null}
      {childComments && childComments?.length > 0 && (
        <>
          <div className={`${areChildrenHidden ? "hidden" : ""} flex`}>
            <button
              aria-label="hide replies"
              className="background-none relative mt-2 w-4 -translate-x-2/4 cursor-pointer border-none p-0 outline-none before:absolute before:inset-y-0 before:left-2/4 before:w-px before:bg-[hsl(235,50%,74%)] before:transition-[background-color] before:duration-100 before:ease-[ease-in-out] before:content-[''] hover:before:bg-purple-600 focus-visible:before:bg-purple-600"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="flex-grow pl-2">
              <CommentsList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn btn-primary mt-1 ${!areChildrenHidden ? "hidden" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
}
