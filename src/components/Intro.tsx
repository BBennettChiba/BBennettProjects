import Image from "next/image";
import { useState, useEffect } from "react";

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
    <div className="flex h-[calc(100vh-64px)] snap-start bg-white">
      <div className="m-auto w-1/2">
        <div className="m-auto h-[50vh] w-[50vh] overflow-hidden rounded-full bg-red-500 object-cover">
          <Image
            src="/me.png"
            width={458}
            alt="Bryson"
            height={545}
            className="m-auto object-cover"
          />
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-center">
        <div>
          <h3 className="text-4xl">Hello,</h3>
          <h2 className="text-5xl">I&apos;m Bryson Bennett</h2>
          <h4 className="text-3xl">{fullstack}</h4>
        </div>
      </div>
    </div>
  );
}
