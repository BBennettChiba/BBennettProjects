import Image from "next/image";
import { useState, useEffect } from "react";
import me from "/public/me.png";

export default function Intro() {
  const [fullstack, setFullstack] = useState("");

  useEffect(() => {
    const developer = "Full-stack Developer";
    let temp = "";
    (function go(ind) {
      if (ind === developer.length) return;
      setTimeout(() => {
        temp += developer[ind];
        setFullstack(temp);
        go(ind + 1);
      }, 200);
    })(0);
  }, []);

  return (
    <div className="h-[calc(100dvh-64px)] snap-start bg-white p-8 sm:flex">
      <div className="m-auto lg:w-1/2">
        <div className="m-auto h-[40vh] w-[40vh] overflow-hidden rounded-full bg-rose-600 object-cover">
          <Image src={me} alt="Bryson" className="m-auto object-contain" />
        </div>
      </div>
      <div className="flex flex-col justify-center lg:w-1/2">
        <div>
          <h3 className="text-4xl">Hello,</h3>
          <h2 className="text-5xl">I&apos;m Bryson Bennett</h2>
          <h4 className="text-3xl">{fullstack}</h4>
        </div>
      </div>
    </div>
  );
}
