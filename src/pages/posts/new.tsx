import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import NoteEditor from "~/components/NoteEditor";
import { api } from "~/utils/api";

export default function New() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { mutate, error } = api.post.create.useMutation({
    onError: () => {
      console.log(error);
    },
    onSuccess: () => {
      router.back();
    },
  });

  if (status === "loading") return null;

  if (!session) {
    return <div>Access Denied. Please Sign In</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mt-10">New Post</h1>
      <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
        <NoteEditor
          onSave={({ body, title }) => mutate({ body, title })}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
