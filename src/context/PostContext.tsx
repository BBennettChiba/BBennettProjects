import { type ReactNode, createContext, useContext, useMemo } from "react";
import { type PostByIdQueryOutput } from "~/server/api/root";
import { api } from "~/utils/api";
import type { CommentFromByIdQuery as Comment } from "src/server/api/root";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
  id: string;
};

type CommentsByParentId = Map<string | null, Comment[]>;

type Context = {
  post: NonNullable<PostByIdQueryOutput>;
  commentsByParentId: CommentsByParentId;
  rootComments: Comment[];
  createComment: ({
    parentId,
    message,
  }: {
    parentId: string | null;
    message: string;
  }) => void;
  editComment: ({ id, message }: { id: string; message: string }) => void;
  deleteComment: (id: string) => void;
};

type CreateCommentArg = Parameters<Context["createComment"]>[0];
type EditCommentArg = Parameters<Context["editComment"]>[0];
type DeleteCommentArg = Parameters<Context["deleteComment"]>[0];

const PostContext = createContext<Context>({} as Context);

export const usePost = () => useContext<Context>(PostContext);

export const PostContextProvider = ({ children, id }: Props) => {
  const { data: post, status } = api.post.byId.useQuery({ id });
  const client = useQueryClient();
  const queryKey = [["post", "byId", { input: { id }, type: "query" }]];

  const commentsByParentId = useMemo(() => {
    if (!post?.comments) return new Map<string | null, Comment[]>();
    return post.comments.reduce((acc, comment) => {
      const key = comment.parentId;
      if (acc.has(key)) acc.get(key)?.push(comment);
      else acc.set(key, [comment]);
      return acc;
    }, new Map<string | null, Comment[]>());
  }, [post?.comments]);

  const {
    mutate: creationMutate,
    // error: creationError
  } = api.comment.create.useMutation({
    onSuccess: (data) => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        queryKey,
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          const oldComments = oldData.comments;
          return { ...oldData, comments: [data, ...oldComments] };
        }
      );
    },
  });

  const {
    mutate: editMutate,
    // error: editError
  } = api.comment.edit.useMutation({
    onSuccess: (data) => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        queryKey,
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          const newComments = [...oldData.comments];
          const commentIndex = newComments.findIndex((c) => c.id === id);
          newComments[commentIndex] = data;
          return { ...oldData, comments: newComments };
        }
      );
    },
  });

  const {
    mutate: deleteMutate,
    //error: deleteError
  } = api.comment.delete.useMutation({
    onSuccess: () => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        queryKey,
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          const newComments = [...oldData.comments];
          const commentIndex = newComments.findIndex((c) => c.id === id);
          newComments.splice(commentIndex, 1);
          return {
            ...oldData,
            comments: newComments,
          };
        }
      );
    },
  });

  const deleteComment = (id: DeleteCommentArg) => deleteMutate(id);

  const editComment = ({ id, message }: EditCommentArg) =>
    editMutate({ message, id });

  const createComment = ({ parentId, message }: CreateCommentArg) =>
    creationMutate({ parentId, message, postId: id });

  if (status === "loading") return <div>loading</div>;
  if (status === "error") return <div>error</div>;
  if (!post) throw new Error("Post not found");

  return (
    <PostContext.Provider
      value={{
        post,
        commentsByParentId,
        rootComments: commentsByParentId.get(null) || [],
        createComment,
        editComment,
        deleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
