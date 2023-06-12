import NoteEditor from "~/components/NoteEditor";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function New() {
  const router = useRouter();
  const { mutate, error } = api.post.create.useMutation({
    onError: () => {
      console.log(error);
    },
    onSuccess: () => {
      router.back();
    },
  });
  return (
    <div className="container mx-auto p-4">
      <NoteEditor onSave={({ body, title }) => mutate({ body, title })} />
    </div>
  );
}
