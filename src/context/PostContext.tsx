import { useQueryClient } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext, useMemo } from "react";
import type { CommentFromByIdQuery as Comment } from "src/server/api/root";
import { type PostByIdQueryOutput } from "~/server/api/root";
import { api } from "~/utils/api";

type Props = {
  children: ReactNode;
  id: string;
};

type CommentsByParentId = Map<string | null, Comment[]>;

type Context = {
  post: NonNullable<PostByIdQueryOutput>;
  commentsByParentId: CommentsByParentId;
  rootComments: Comment[];
  commentDeleteMutation: ReturnType<typeof api.comment.delete.useMutation>;
  createCommentMutation: ReturnType<typeof api.comment.create.useMutation>;
  editCommentMutation: ReturnType<typeof api.comment.edit.useMutation>;
  toggleLikeMutation: ReturnType<typeof api.like.toggle.useMutation>;
  deletePostMutation: ReturnType<typeof api.post.delete.useMutation>;
  updatePostMutation: ReturnType<typeof api.post.update.useMutation>;
};

const PostContext = createContext<Context>({} as Context);

export const usePost = () => useContext<Context>(PostContext);

export const PostContextProvider = ({ children, id: postId }: Props) => {
  const { data: post, status } = api.post.byId.useQuery({ id: postId });
  const client = useQueryClient();
  const queryKey = [["post", "byId"], { input: { id: postId }, type: "query" }];

  const commentsByParentId = useMemo(() => {
    if (!post?.comments) return new Map<string | null, Comment[]>();
    return post.comments.reduce((acc, comment) => {
      const key = comment.parentId;
      if (acc.has(key)) acc.get(key)?.push(comment);
      else acc.set(key, [comment]);
      return acc;
    }, new Map<string | null, Comment[]>());
  }, [post?.comments]);

  const createCommentMutation = api.comment.create.useMutation({
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

  const editCommentMutation = api.comment.edit.useMutation({
    onSuccess: (data) => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        queryKey,
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          const newComments = [...oldData.comments];
          const commentIndex = newComments.findIndex((c) => c.id === data.id);
          newComments[commentIndex] = data;
          return { ...oldData, comments: newComments };
        }
      );
    },
  });

  const deleteCommentMutation = api.comment.delete.useMutation({
    onSuccess: (data) => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        queryKey,
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          return {
            ...oldData,
            comments: oldData.comments.filter((c) => c.id !== data.id),
          };
        }
      );
    },
  });

  const toggleLikeMutation = api.like.toggle.useMutation({
    onSuccess: (action) => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        queryKey,
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          const newComments = [...oldData.comments];
          const theComment = newComments.find(
            (c) => c.id === toggleLikeMutation.variables
          );
          if (!theComment) throw new Error("comment not found");
          theComment.likedByMe = !theComment.likedByMe;
          theComment.likedByMe = action === "created" ? true : false;
          if (action === "created") {
            theComment.likedByMe = true;
            theComment.likeCount = theComment.likeCount + 1;
          } else {
            theComment.likedByMe = false;
            theComment.likeCount = theComment.likeCount - 1;
          }
          return {
            ...oldData,
            comments: newComments,
          };
        }
      );
    },
  });

  const deletePostMutation = api.post.delete.useMutation({
    onSuccess: () => {
      client.removeQueries(queryKey);
    },
  });

  const updatePostMutation = api.post.update.useMutation({
    onSuccess: (data) => {
      client.setQueryData<NonNullable<PostByIdQueryOutput>>(
        queryKey,
        (oldData) => {
          if (!oldData) throw new Error("no Old Data");
          oldData.title = data.title;
          oldData.body = data.body;
          return oldData;
        }
      );
    },
  });

  if (status === "loading") return <div>loading</div>;
  if (status === "error") return <div>error</div>;

  return (
    <PostContext.Provider
      value={{
        post,
        commentsByParentId,
        rootComments: commentsByParentId.get(null) || [],
        createCommentMutation,
        editCommentMutation,
        commentDeleteMutation: deleteCommentMutation,
        toggleLikeMutation,
        deletePostMutation,
        updatePostMutation,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
