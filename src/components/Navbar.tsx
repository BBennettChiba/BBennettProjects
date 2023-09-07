import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { type Dispatch, type SetStateAction, useRef } from "react";
import RateMe from "./RateMe";


export const Navbar = () => {
  const { data: sessionData, status } = useSession();
  const dialog = useRef<HTMLDialogElement>(null);

  const toggleModal = () =>
    dialog.current?.open ? dialog.current.close() : dialog.current?.showModal();

  return (
    <header className="navbar bg-primary">
      <div className="navbar-start ml-2">
        <label
          htmlFor="my-drawer"
          className="drawer-button cursor-pointer"
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
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
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
            <button className="btn btn-ghost rounded-btn">Sign in</button>
          ) : null}
          {status === "loading" ? (
            <span className="loading loading-ring loading-lg" />
          ) : null}
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <button onClick={() => toggleModal()} className="justify-between">
                rate my website
              </button>
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
      <dialog ref={dialog} className="modal modal-bottom md:modal-middle">
        <RateMe toggleModal={toggleModal} />
      </dialog>
    </header>
  );
};
