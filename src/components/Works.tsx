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
    <div className="h-screen snap-start overflow-hidden bg-base-300">
      <h1>My Projects</h1>
      <div className="box">
        <div className={`currentProject ${current.video ? "video" : ""}`}>
          <div className="left">
            <div className="title">{current.name}</div>
            {current.description}
            {current.tech && (
              <div className="techStack">
                <h2>Tech Stack</h2>{" "}
                {current.tech.map((a, i) => (
                  <img key={i} src={a} alt={a} title={a} />
                ))}
              </div>
            )}
          </div>
          {current.img && (
            <div className="right">
              {current.img.length === 1 && (
                <img
                  className="img"
                  src={current.img[0]}
                  alt={current.img[0]}
                  title={current.img[0]}
                />
              )}
              {current.img.length > 1 && (
                <div className="thisDiv">
                  <span
                    className="arrow"
                    style={{ opacity: image === 0 ? "30%" : "100%" }}
                    onClick={() => image !== 0 && handleSlide("left")}
                  >
                    {"<"}
                  </span>
                  <img
                    className="img"
                    src={current.img[image]}
                    alt={current.img[image]}
                    title={current.img[image]}
                  />
                  <span
                    className="arrow"
                    style={{
                      opacity: image < current.img.length - 1 ? "100%" : "30%",
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
            <div className="vid">
              <NewIFrame source={current.video} />
            </div>
          )}
        </div>
        <div className="choices">
          {projects.map((a, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrent(a);
                setImage(0);
              }}
              className="project"
            >
              {a.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const NewIFrame = ({ source }: { source: string }) => (
  <iframe
    className="video"
    src={source}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);
