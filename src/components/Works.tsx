import Image from "next/image";
import { useState } from "react";
import projects from "./projects";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

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
    <div className="flex h-[calc(100dvh-44px)] snap-start bg-gray-400 text-black">
      <div className="flex flex-1 flex-col p-4 lg:px-60 lg:py-16">
        <h1 className="pb-4 lg:text-5xl text-2xl">My Projects</h1>
        <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-white p-4 short:p-2">
          <div className="flex h-full">
            <div
              className={`flex h-full ${
                current.img ? "lg:w-1/2" : ""
              } flex-col`}
            >
              <h2 className="text-xl lg:text-3xl">{current.name}</h2>
              {current.description}
              {current.video ? (
                <div className="w-full flex-1 justify-self-center p-3">
                  <NewIFrame source={current.video} />
                </div>
              ) : null}
            </div>
            {current.img ? (
              <div className="hidden w-1/4 p-4 lg:block">
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
                  <Carousel>
                  <CarouselContent>
                    {current.img.map(img =>(

                    <CarouselItem key={img.src}>{<Image src={img} alt="carosel image"/>}</CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                )}
              </div>
            ) : null}
          </div>
          {current.tech && (
            <div className="mb-3 flex items-center">
              <div className="lg:text-3xl">Tech Stack</div>
              <div className="flex w-full flex-wrap items-center justify-between">
                {current.tech.map((a, i) => (
                  <div className=" relative h-8 w-8 lg:h-20 lg:w-20" key={i}>
                    <Image
                      fill
                      src={a}
                      alt={a.src}
                      title={a.src}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
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
                <span className="block lg:hidden">
                  {a.name
                    .split("")
                    .filter((b) => b.toUpperCase() === b)
                    .join("")}
                </span>
                <span className="hidden lg:block">{a.name}</span>
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
