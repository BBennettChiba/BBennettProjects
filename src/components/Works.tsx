import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";
import projects from "./projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function Works() {
  const [current, setCurrent] = useState<(typeof projects)[number]>(
    projects[0]
  );

  return (
    <div className="flex h-[calc(100dvh-44px)] snap-start bg-gray-400 text-black">
      <div className="flex flex-1 flex-col p-4 lg:px-60 lg:py-16">
        <h1 className="pb-4 text-2xl lg:text-5xl">My Projects</h1>
        <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-white p-4 short:p-2">
          <div className="flex h-full">
            <div className={`flex flex-1 flex-col`}>
              <h2 className="text-xl lg:text-3xl">{current.name}</h2>
              {current.description}
              {current.video ? (
                <div className="w-full flex-1 justify-self-center p-3">
                  <NewIFrame source={current.video} />
                </div>
              ) : null}
            </div>
            {current.img ? (
              <div className="relative m-auto hidden flex-1 lg:block">
                <Carousel
                  plugins={[
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    Autoplay({
                      delay: 2000,
                    }),
                  ]}
                  className="left-1/2 w-[320px] -translate-x-1/2"
                >
                  <CarouselContent className="mx-auto">
                    {current.img.map((img) => (
                      <CarouselItem
                        className="relative h-[500px] pl-0"
                        key={img.src.toString()}
                      >
                        {
                          <Image
                            objectFit="contain"
                            fill
                            src={img}
                            alt="carousel image"
                          />
                        }
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {current.img.length > 1 ? (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  ) : null}
                </Carousel>
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
          <div className="flex w-full border border-white">
            {projects.map((a, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(a);
                }}
                className={`h-12 flex-1 border border-white hover:bg-gray-500 ${
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
