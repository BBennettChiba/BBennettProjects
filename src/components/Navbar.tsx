import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { type Dispatch, type SetStateAction } from "react";

type Props = { setIsChecked: Dispatch<SetStateAction<boolean>> };

export const Navbar = ({ setIsChecked }: Props) => {
  const { data: sessionData, status } = useSession();
  return (
    <header className="navbar bg-primary">
      <div className="navbar-start ml-2">
        <label
          htmlFor="my-drawer"
          className="drawer-button cursor-pointer"
          onClick={() => setIsChecked((v) => !v)}
        >
          <div className="space-y-2">
            <div className="h-0.5 w-8 bg-white" />
            <div className="h-0.5 w-8 bg-white" />
            <div className="h-0.5 w-8 bg-white" />
          </div>
        </label>
      </div>
      <div className="navbar-end">
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
    </header>
  );
};
