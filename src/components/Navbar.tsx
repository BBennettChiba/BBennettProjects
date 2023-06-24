import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const PAGES = [
  { name: "Home", href: "" },
  { name: "Posts", href: "posts" },
  { name: "SpongeMock", href: "spongeMock" },
  { name: "URL Shortener", href: "urlShortener" },
];

export const Navbar = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const here = router.asPath.split("/")[1]?.trim();
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        {PAGES.map((page, index) => (
          <Link key={index} href={`/${page.href}`}>
            <div
              className={`btn-ghost btn text-xl normal-case ${
                page.href === here ? "text-white" : "text-gray-400"
              }`}
            >
              {page.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown z-10">
          {status === "authenticated" ? (
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData.user.image ?? ""}
                  alt={sessionData.user.name ?? ""}
                  width="40"
                  height="40"
                />
              </div>
            </label>
          ) : null}{" "}
          {status === "unauthenticated" ? (
            <button className="btn-ghost rounded-btn btn">Sign in</button>
          ) : null}
          {status === "loading" ? (
            <span className="loading loading-ring loading-lg" />
          ) : null}
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  if (status === "authenticated") return void signOut();
                  return void signIn();
                }}
              >
                {status === "authenticated" ? "Logout" : "Sign in"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
