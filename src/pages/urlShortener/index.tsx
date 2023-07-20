import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

/**@TODO maybe use capcha */

export default function UrlShortener() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const { mutate } = api.link.create.useMutation();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    mutate(
      { url },
      {
        onSuccess: (res) => {
          void router.push(`/urlShortener/${res.id}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="text-black">
        <form onSubmit={submit}>
          <div className="relative flex items-center">
            <svg
              style={{
                stroke: "rgb(156, 163, 175)",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "0.13rem",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-1 my-2 ml-3 h-6 w-5 truncate align-middle  text-gray-400"
            >
              <path d="M9 17H7A5 5 0 0 1 7 7h2" />
              <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
            <input
              value={url}
              type="url"
              placeholder="Shorten your link"
              className="h-10 cursor-text rounded-md border border-gray-200 bg-white py-2 pl-10 pr-12 text-[0.88rem]"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="absolute right-1 my-1.5 mr-1.5 flex h-7 w-10 cursor-pointer items-center justify-center rounded border border-gray-200 text-center text-[0.88rem] font-medium text-gray-400">
              <p>↵</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

