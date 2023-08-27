import Image from "next/image";
import { useEffect, useState } from "react";
import me from "/public/me.jpg";
import fountain from "/public/fountain.jpg";
import vatican from "/public/vatican.jpg";

const sources = [me, fountain, vatican] as const;

export default function AboutMe() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const next = current >= sources.length - 1 ? 0 : current + 1;
      setCurrent(next);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <div className="h-screen snap-start bg-rose-600">
      <div className="flex h-full flex-col lg:flex-row">
        <div className="my-8 flex items-center justify-center lg:mx-10">
          <div className="flex h-56 w-56 items-end  overflow-hidden rounded-full border-[5px] border-black bg-white lg:h-96 lg:w-96">
            <Image
              className="object-cover"
              src={sources[current] || me}
              alt="me travelling"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-black md:h-full lg:mx-20 lg:w-3/5">
          <h1 className="text-2xl lg:text-7xl">About me</h1>
          <div className="p-2 lg:p-8 lg:text-xl">
            <p className="text-lg short:text-sm">
              I&apos;m a fullstack developer living in Chiba Japan. Reading
              books in English and Japanese is my main joy in life. I&apos;m
              particular to the works of James Joyce, Steven Erikson, Gene
              Wolfe, Haruki Murakami and other SFF classics. With some friends,
              I talk about books on my main hobby my&nbsp;
              <a
                className="text-blue-400"
                href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjHhKTOusbwAhWNFIgKHbIBBZYQFjAAegQIBhAD&url=https%3A%2F%2Fopen.spotify.com%2Fshow%2F7y28T1qUAaZAM75F4Yd1iN&usg=AOvVaw0huy9OuTbDV1nrDIi1ahWi"
              >
                podcast
              </a>
              . I&apos;ve lived in Japan for 10+ years I moved here after
              graduating from the University of Kansas with a major in East
              Asian Languages and Culture. Go Jayhawks. I&apos;m a fast
              efficient learner who likes the challenge and problem solving that
              software engineering requires.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
