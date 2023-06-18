import { useSession } from "next-auth/react";
import { type Dispatch, useState, type SetStateAction } from "react";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import IconBtn from "./IconBtn";
import { usePost } from "~/context/PostContext";

type Props = {
  likeCount: number;
  likedByMe: boolean;
  id: string;
  isReplying: boolean;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  user: { name: string | null; id: string };
};
export default function Buttons({
  likeCount,
  likedByMe,
  id,
  user,
  isReplying,
  setIsReplying,
  isEditing,
  setIsEditing,
}: Props) {

  const { data } = useSession();
  const currentUser = data ? data.user : null;

  const [liked, setLiked] = useState<null | boolean>(null);

  const {
    editCommentMutation: {
      variables: editVariables,
      error: editError,
      isError: editIsError,
    },
    commentDeleteMutation: {
      variables: deleteId,
      mutate: deleteMutate,
      error: deleteError,
      isLoading: deleteIsLoading,
      isError: deleteIsError,
    },
    toggleLikeMutation: {
      mutate: toggleLikeMutate,
      isLoading: toggleLikeIsLoading,
    },
  } = usePost();

  const toggleLike = () => {
    toggleLikeMutate(id, {
      onSuccess: (value) => {
        value === "created" ? setLiked(true) : setLiked(false);
      },
    });
  };
  const isThisComment = (variable: string | { id: string } | undefined) =>
    !variable
      ? false
      : typeof variable === "string"
      ? variable === id
      : variable.id === id;

  return (
    <>
      <div className="relative mt-2 flex gap-2">
        <IconBtn
          aria-label={likedByMe ? "Unlike" : "Like"}
          Icon={likedByMe ? FaHeart : FaRegHeart}
          onClick={toggleLike}
          disabled={toggleLikeIsLoading}
        >
          {likeCount}
        </IconBtn>
        {liked && (
          <FaHeart
            className="fa animate absolute left-0 top-0 my-auto flex items-center p-1 text-3xl text-pink-300"
            onAnimationEnd={() => setLiked(false)}
          />
        )}
        <IconBtn
          Icon={FaReply}
          onClick={() => setIsReplying((prev) => !prev)}
          isActive={isReplying}
          aria-label={isReplying ? "Cancel Reply" : "Replying"}
          color={isReplying ? "red-600" : ""}
        />
        {currentUser && currentUser.id === user.id ? (
          <>
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
              disabled={deleteIsLoading}
              onClick={() => confirm("You sure?") && deleteMutate(id)}
            />
          </>
        ) : null}
      </div>
      {deleteIsError && isThisComment(deleteId) ? (
        <div className="mt-1 text-red-600">{deleteError?.message}</div>
      ) : null}
      {editIsError && isThisComment(editVariables) ? (
        <div className="mt-1 text-red-600">{editError?.message}</div>
      ) : null}
    </>
  );
}
