import Link from "next/link";
import { useRouter } from "next/router";
import { type Dispatch, type SetStateAction } from "react";

const PAGES = [
  { name: "Home", href: "" },
  { name: "Posts", href: "posts" },
  { name: "SpongeMock", href: "spongeMock" },
  { name: "URL Shortener", href: "urlShortener" },
  { name: "Weather", href: "weather" },
  { name: "Leet Clone", href: "codeChallenge" },
];

type Props = {
  setIsChecked: Dispatch<SetStateAction<boolean>>;
};

export default function Drawer({ setIsChecked }: Props) {
  const router = useRouter();
  const here = router.asPath.split("/")[1]?.trim();
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        className="drawer-overlay"
        onClick={() => setIsChecked(false)}
      />
      <ul className="menu h-full w-60 bg-base-200 p-4 text-base-content">
        {PAGES.map((page, index) => (
          <li key={index} onClick={() => setIsChecked(false)}>
            <Link key={index} href={`/${page.href}`}>
              <div
                className={`my-3 text-xl normal-case ${
                  page.href === here ? "text-white" : "text-gray-400"
                }`}
              >
                {page.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**@todo fix tailwind drawer animation bug */
