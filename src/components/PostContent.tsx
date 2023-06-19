import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import NoteEditor from "./NoteEditor";
import { usePost } from "~/context/PostContext";

export const PostContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [parent] = useAutoAnimate();
  const user = session?.user || null;
  const {
    post,
    deletePostMutation: { mutate: deleteMutate },
    updatePostMutation: { mutate: updateMutate },
  } = usePost();

  const onDelete = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deleteMutate(post.id, { onSuccess: () => void router.replace("/posts") });
  };

  const handleEdit = ({ title, body }: { title: string; body: string }) =>
    updateMutate(
      { id: post.id, title, body },
      { onSuccess: () => setIsEditing(false) }
    );

  return (
    <div
      ref={parent}
      className="card mr-5 mt-5 border border-gray-200 bg-base-100 shadow-xl"
    >
      {isEditing ? (
        <NoteEditor
          initialValues={{ title: post.title, body: post.body }}
          onCancel={() => setIsEditing(false)}
          onSave={handleEdit}
        />
      ) : (
        <div className="card-body grow-0">
          <div className="collapse-title text-xl font-bold">{post.title}</div>
          <article className="prose max-w-full lg:prose-xl">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </article>
          {user && user.id === post.user.id && (
            <div className="card-actions mx-2 flex justify-end">
              <button
                className="btn-secondary btn-sm btn px-5"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn-warning btn-sm btn px-5"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
