import ReactMarkdown from "react-markdown";
import { usePost } from "~/context/PostContext";

type Props = {
  onDelete: () => void;
};

/**@Todo edit state, delete button fix */

export const PostContent = ({ onDelete }: Props) => {
  const { post } = usePost();
  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div className="collapse-title text-xl font-bold">{post.title}</div>
        <article className="prose max-w-full lg:prose-xl">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </article>
        <div className="card-actions mx-2 flex justify-end">
          <button className="btn-warning btn-xs btn px-5" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
