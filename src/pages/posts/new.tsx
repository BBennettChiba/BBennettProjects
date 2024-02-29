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
      <h1 className="mt-10 text-4xl">New Post</h1>
      <div className="mt-5 rounded-md border border-gray-200 bg-secondary shadow-xl">
        <NoteEditor
          onSave={({ body, title }) => mutate({ body, title })}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
