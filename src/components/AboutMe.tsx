import { useEffect, useState } from "react";

export default function AboutMe() {
  const [current, setCurrent] = useState(0);
  const sources = ["/me.jpg", "/fountain.jpg", "/vatican.jpg"];
  useEffect(() => {
    setTimeout(() => {
      const next = current >= sources.length - 1 ? 0 : current + 1;
      setCurrent(next);
    }, 5000);
  }, [current]);

  return (
    <div className="h-screen snap-start bg-red-500">
      <div>
        <div>
          <img src={sources[current]} alt="me" />
        </div>
      </div>
      <div>
        <h1 style={{ fontSize: "6vw", width: "100%", overflow: "hidden" }}>
          About me
        </h1>
        <div style={{ fontSize: "20px" }}>
          <br />
          <br />
          <br />
          <p>
            I&apos;m a fullstack developer living in Chiba Japan. Reading books
            in English and Japanese is my main joy in life. I&apos;m particular
            to Malazan Book of the Fallen, Lord of the Rings, Hyperion, Haruki
            Murakami and other SFF classics. With some friends, I talk about
            books on my main hobby my&nbsp;
            <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjHhKTOusbwAhWNFIgKHbIBBZYQFjAAegQIBhAD&url=https%3A%2F%2Fopen.spotify.com%2Fshow%2F7y28T1qUAaZAM75F4Yd1iN&usg=AOvVaw0huy9OuTbDV1nrDIi1ahWi">
              podcast
            </a>
            , I am also a gamer, particularly RPGs both Japanese and Western
            like The Witcher and Nier. I have created a few games myself using
            Unity and C# and plan to continue. I&apos;ve lived in Japan for 7
            years I moved here after graduating from the University of Kansas
            with a major in East Asian Languages and Culture. Go Jayhawks.
            I&apos;m a fast efficient learner who likes the challenge and
            problem solving that hacking requires.
          </p>
        </div>
      </div>
    </div>
  );
}
