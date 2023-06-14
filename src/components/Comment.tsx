import { useState } from "react";
import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";
import CommentForm from "./CommentForm";
import { CommentsList } from "./CommentsList";
import IconBtn from "./IconBtn";
import { usePost } from "~/context/PostContext";
import { type CommentFromByIdQuery } from "~/server/api/root";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type Props = CommentFromByIdQuery;

/**@TODO functionality to buttons e.g. like, edit, delete */
/**@TODO move logic into another hook */

export const Comment = ({
  createdAt,
  id,
  message: commentMessage,
  user,
}: Props) => {
  const { editComment, createComment, deleteComment } = usePost();

  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { commentsByParentId } = usePost();
  const childComments = commentsByParentId.get(id);

  const handleCreateSubmit = (message: string) => {
    createComment({ message, parentId: id });
    /**@todo check for errors , make it async*/
    setIsEditing(false);
  };

  const handleEditSubmit = (message: string) => {
    editComment({ message, id });
    /**@todo check for errors  make async*/
    setIsEditing(false);
  };

  return (
    <>
      <div className="rounded-lg border border-solid border-blue-300 p-2">
        <div className="mb-1 flex justify-between text-xs text-blue-300">
          <span className="font-bold">{user.name}</span>
          <span className="date">{dateFormatter.format(createdAt)}</span>
        </div>
        {isEditing ? (
          <CommentForm error={""} autoFocus handleSubmit={handleEditSubmit} />
        ) : (
          <div className="mx-2 whitespace-pre-wrap">{commentMessage}</div>
        )}
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
          <IconBtn
            Icon={FaEdit}
            onClick={() => setIsEditing((prev) => !prev)}
            isActive={isEditing}
            aria-label={isEditing ? "Cancel Edit" : "Editing"}
            color={isEditing ? "red-600" : ""}
          />
          <IconBtn
            Icon={FaTrash}
            color="red"
            onClick={() => deleteComment(id)}
          />
        </div>
      </div>
      {isReplying ? (
        <div className="ml-4 mt-1">
          <CommentForm autoFocus handleSubmit={handleCreateSubmit} error={""} />
        </div>
      ) : null}
      {childComments && childComments.length > 0 && (
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
            className={`btn-primary btn mt-1 ${
              !areChildrenHidden ? "hidden" : ""
            }`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
};
