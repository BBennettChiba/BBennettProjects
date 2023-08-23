import Image from "next/image";
import { useState } from "react";
import projects from "./projects";

export default function Works() {
  const [current, setCurrent] = useState<(typeof projects)[number]>(
    projects[0]
  );
  const [image, setImage] = useState(0);

  const handleSlide = (dir?: string) => {
    if (dir === "left") setImage(image - 1);
    else setImage(image + 1);
  };

  return (
    <div className="snap-startbg-base-300 h-screen">
      <div className="flex h-full w-full">
        <div className="m-auto flex h-3/4 w-4/5 flex-col overflow-hidden rounded-xl border border-white p-4">
          <h1 className="text-5xl">My Projects</h1>
          <div className="flex flex-1">
            <div
              className={`flex h-full ${
                current.img ? "w-3/4" : "w-full"
              } flex-col`}
            >
              <h2 className="mt-6 text-3xl">{current.name}</h2>
              {current.description}
              {current.video ? (
                <div className="w-full flex-1 justify-self-center p-3">
                  <NewIFrame source={current.video} />
                </div>
              ) : null}
            </div>
            {current.img ? (
              <div className="w-1/4 p-2">
                {current.img.length === 1 && (
                  <div className="w-11/12">
                    <Image
                      src={current.img[0]}
                      alt={current.img[0].src}
                      title={current.img[0].src}
                    />
                  </div>
                )}
                {current.img.length > 1 && (
                  <div className="flex h-full items-center justify-center">
                    <span
                      className="w-1/12 cursor-pointer text-4xl hover:font-extrabold"
                      style={{ opacity: image === 0 ? "30%" : "100%" }}
                      onClick={() => image !== 0 && handleSlide("left")}
                    >
                      {"<"}
                    </span>
                    <div className="m-auto w-11/12">
                      <Image
                        src={current.img[image]!}
                        alt={current.img[image]!.src}
                        title={current.img[image]?.src}
                      />
                    </div>
                    <span
                      className="w-1/12 cursor-pointer text-4xl hover:font-extrabold"
                      style={{
                        opacity:
                          image < current.img.length - 1 ? "100%" : "30%",
                      }}
                      onClick={() =>
                        image < current.img.length - 1 && handleSlide()
                      }
                    >
                      {">"}
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          {current.tech && (
            <div className="mb-3 flex items-center justify-between">
              <div className="text-3xl">Tech Stack :</div>
              {current.tech.map((a, i) => (
                <Image height={70} key={i} src={a} alt={a.src} title={a.src} />
              ))}
            </div>
          )}
          <div className="flex h-12 w-full border border-white">
            {projects.map((a, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(a);
                  setImage(0);
                }}
                className={`h-full flex-1 border border-white hover:bg-gray-500 ${
                  current === a ? "bg-gray-500" : ""
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const NewIFrame = ({ source }: { source: string }) => (
  <iframe
    className="m-auto h-full w-11/12"
    src={source}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);
