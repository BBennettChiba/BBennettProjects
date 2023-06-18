import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import NoteEditor from "./NoteEditor";
import { usePost } from "~/context/PostContext";

export const PostContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
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

  if (isEditing)
    return (
      <NoteEditor
        initialValues={{ title: post.title, body: post.body }}
        onCancel={() => setIsEditing(false)}
        onSave={handleEdit}
      />
    );

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div className="collapse-title text-xl font-bold">{post.title}</div>
        <article className="prose max-w-full lg:prose-xl">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </article>
        <div className="card-actions mx-2 flex justify-end">
          <button
            className="btn-secondary btn-sm btn px-5"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button className="btn-warning btn-sm btn px-5" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/**@TODO add an expanding animation when opening editor */
