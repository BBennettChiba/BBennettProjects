import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const PAGES = [
  { name: "Home", href: "" },
  { name: "Posts", href: "posts" },
  { name: "SpongeMock", href: "SpongeMock" },
];

export const Navbar = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const here = router.asPath.split("/")[1]?.trim();

  return (
    <div className="navbar h-20 bg-primary text-primary-content">
      {PAGES.map((page, index) => (
        <div
          className={`pl-5 text-3xl font-bold hover:scale-105 ${
            page.href === here ? "text-white" : "text-gray-400"
          }`}
          key={index}
        >
          <Link href={`/${page.href}`}>{page.name}</Link>
        </div>
      ))}
      <div className="ml-auto flex-none gap-2">
        <div className="dropdown-end dropdown">
          {status === "authenticated" ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData?.user?.image ?? ""}
                  alt={sessionData?.user?.name ?? ""}
                  width="40"
                  height="40"
                />
              </div>
            </label>
          ) : null}{" "}
          {status === "unauthenticated" ? (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          ) : null}
          {status === "loading" ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
