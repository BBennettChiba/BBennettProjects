import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import Buttons from "./Buttons";
import CommentForm from "./CommentForm";
import { CommentsList } from "./CommentsList";
import { usePost } from "~/context/PostContext";
import { type CommentFromByIdQuery } from "~/server/api/root";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type Props = CommentFromByIdQuery;

export const Comment = ({
  createdAt,
  id,
  message: commentMessage,
  user,
  likeCount,
  likedByMe,
}: Props) => {
  const [editParent] = useAutoAnimate();
  const [replyParent] = useAutoAnimate();

  const {
    editCommentMutation: {
      mutate: editMutate,
      error: editError,
      isLoading: editIsLoading,
    },
    createCommentMutation: {
      mutate: createMutate,
      error: createError,
      isLoading: createIsLoading,
    },
    post,
  } = usePost();

  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { commentsByParentId } = usePost();
  const childComments = commentsByParentId.get(id);

  const handleCreateSubmit = (message: string) => {
    createMutate(
      { message, parentId: id, postId: post.id },
      { onSettled: () => setIsReplying(false) }
    );
  };

  const handleEditSubmit = (message: string) => {
    editMutate({ message, id }, { onSettled: () => setIsEditing(false) });
  };

  return (
    <>
      <div className="rounded-lg border border-solid border-blue-300 p-2">
        <div className="mb-1 flex justify-between text-xs text-blue-300">
          <span className="font-bold">{user.name}</span>
          <span className="date">{dateFormatter.format(createdAt)}</span>
        </div>
        <div ref={editParent}>
          {isEditing ? (
            <CommentForm
              error={editError?.message}
              autoFocus
              initialValue={commentMessage}
              handleSubmit={handleEditSubmit}
              loading={editIsLoading}
            />
          ) : (
            <div className="mx-2 whitespace-pre-wrap">{commentMessage}</div>
          )}
          <Buttons
            likeCount={likeCount}
            likedByMe={likedByMe}
            id={id}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
      <div ref={replyParent}>
        {isReplying ? (
          <div className="ml-4 mt-1">
            <CommentForm
              autoFocus
              handleSubmit={handleCreateSubmit}
              error={createError?.message}
              loading={createIsLoading}
            />
          </div>
        ) : null}
      </div>
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
