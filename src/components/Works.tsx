import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Works.module.css";
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
          <h1 className="text-4xl">My Projects</h1>
          <div className="flex flex-1">
            <div className="flex h-full w-3/4 flex-col">
              <div className={styles.title}>{current.name}</div>
              {current.description}
              {current.tech && (
                <div className="flex mt-auto justify-between items-center">
                  <h2>Tech Stack</h2>{" "}
                  {current.tech.map((a, i) => (
                    <Image
                      // height={70}
                      width={70}
                      key={i}
                      src={a}
                      alt={a}
                      title={a}
                    />
                  ))}
                </div>
              )}
            </div>
            {current.img && (
              <div className="w-1/4">
                {current.img.length === 1 && (
                  <Image
                    height={100}
                    width={100}
                    className="img"
                    src={current.img[0]}
                    alt={current.img[0]}
                    title={current.img[0]}
                  />
                )}
                {current.img.length > 1 && (
                  <div className={styles.thisDiv}>
                    <span
                      className={styles.arrow}
                      style={{ opacity: image === 0 ? "30%" : "100%" }}
                      onClick={() => image !== 0 && handleSlide("left")}
                    >
                      {"<"}
                    </span>
                    <Image
                      height={100}
                      width={100}
                      className="img"
                      src={current.img[image]!}
                      alt={current.img[image]!}
                      title={current.img[image]}
                    />
                    <span
                      className={styles.arrow}
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
            )}
            {current.video && (
              <div className={styles.vid}>
                <NewIFrame source={current.video} />
              </div>
            )}
          </div>
          <div className="flex h-12 w-full">
            {projects.map((a, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(a);
                  setImage(0);
                }}
                className="h-full flex-1 hover:bg-gray-500"
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
    className={styles.video}
    src={source}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);
