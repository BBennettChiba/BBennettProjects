import chat from "/public/Chat.png";
import edit_profile from "/public/Edit Profile.jpg";
import homies_page from "/public/Homies Page.jpg";
import made_a_match from "/public/Made a Match.jpg";
import profile_page from "/public/Profile Page.jpg";
import swipe_page from "/public/Swipe page.jpg";
import typescript from "/public/typescript.png";
import amplify from "/public/amplify.png";
import appsync from "/public/appsync.png";
import cognito from "/public/cognito.png";
import dynamodb from "/public/dynamodb.svg";
import graphql from "/public/graphql.png";
import node from "/public/node.png";
import reactnative from "/public/reactnative.png";
import garbagemonster from "/public/garbage monster.png";
import heroku from "/public/heroku.png";
import mymizu from "/public/mymizu.png";
import postgres from "/public/postgres.png";
import typeorm from "/public/typeorm.png";
import vercel from "/public/vercel.png";
import react from "/public/react.png";
import vue from "/public/vue.png";
import truckstop from "/public/truckStop.png";
import bookDetails from "/public/Book Details.jpg";
import ownedBooks from "/public/Owned Books.jpg";
import toRead from "/public/To Read.jpg";
import { type StaticImageData } from "next/image";
import trpc from "/public/trpc.svg";
import prisma from "/public/prisma.png";
import nextjs from "/public/nextjs.png";
import tailwind from "/public/tailwind.png";
import authjs from "/public/authjs.png";
import Link from "next/link";

const description = (info: Desc) => (
  <p className="whitespace-pre-wrap pt-4 text-xl leading-8">
    <span className="text-xl font-bold">{info.title}</span>
    <br />
    <br />
    {info.data}
    {info.publicDemo !== undefined && (
      <span>
        <br />
        For a public demonstration of this app please{" "}
        <a href={info.publicDemo}>click here</a>
      </span>
    )}
  </p>
);

const YHDes = {
  title: "Position: Full Stack Engineer",
  data: ` YomiHomies is a SNS React Native App linking people by their interest in books. 
It was created in 3 weeks in a mulicultural team of four. I setup the backend on AWS using the AWS system and Amplify, Appsync, DynamoDB, Cognito. 
On the frontend I wrote the matching logic so users can find one another based on what books they enjoy. I also wrote the chat functionality 
implementing Appsync technology like graphql subscriptions which allowed matched users to chat with one another.`,
  publicDemo: "https://www.youtube.com/watch?v=S9GBXQEosK4&t=534s",
};
const BMDes = {
  title: "Position: Full Stack Engineer",
  data: `A React web app created in collaboration with myMizu which gamified water drinking by turning 
it into an RPG monster battler in which users refill their water using the myMizu API and grow stronger. It was created by a multicultural team over 
3 days. My Mizu is a NPO that is trying to reduce plastic from water bottles worldwide. They shared their API and we were charged with making an 
application around that.`,
  publicDemo: "https://youtu.be/vwMpFxsuQgQ?t=2042",
};
const GRDes = {
  title: "Position: Full Stack Engineer",
  data: `A Vue web app practice project for truckers. It too was created over 3 days by a 
multicultural team. It was my first full-stack group project. Truckers can search and filter using the app for a truckstop nearby. I wrote the 
entire backend myself in Typescript using TypeORM and an express server. I'm pretty proud of that.`,
};
const RNBRDes = {
  title: "Full Stack Solo project",
  data: `A React Native app for scanning your books for recordings purposes and adding books to a to be read list. My first React Native solo project. 
  I am still working on it every day. Will add features as I work. Supports AWS Cognito and AWS Appsync. Created with the help of Expo and AWS Amplify.`,
};
const TTDes = {
  title: "Tech Talk",
  data: `A tech talk I did about Emulators and how to understand computer science by understanding how emulation works.`,
};

type Desc = {
  title: string;
  data: string;
  publicDemo?: string;
};

const projects = [
  {
    name: "This Website",
    description: (
      <div className="whitespace-pre-wrap pt-4 text-xl leading-8">
        <span className="text-xl font-bold">Full-Stack Solo-Project</span>
        <br />
        <br />
        This app. If you click the hamburger menu at the top of the page you can
        navigate to each project.
        <br />
        <ul className="list-disc space-y-4 pl-2">
          <li>
            <Link href="posts" className="text-blue-400">
              Posts:
            </Link>
            A reddit-like post maker and comment system. Users must login with
            Discord (plan to add other oauth credentials in future) to post and
            write comments but they can see comments and posts without doing so.
          </li>
          <li>
            <Link className="text-blue-400" href="spongeMock">
              SpongeMock:
            </Link>
            Text mutator for MoCkInG YoUr EnEmIeS On ThE InTeRnEt. URL
          </li>
          <li>
            <Link className="text-blue-400" href="urlShortener">
              Shortener:
            </Link>
            A URL Shortener. Add a URL and click the button. You&apos;re sent to
            a new page with the new shorter URL.
          </li>
          <li>
            <Link className="text-blue-400" href="weather">
              Weather:
            </Link>
            Uses an external weather API to give you your local weather
            information. Just share location data.
          </li>
          <li>
            <Link className="text-blue-400" href="codeChallenge">
              Leet Clone:
            </Link>
            A Leet Code clone. I&apos;m most proud of this. Uses Typescript
            Virtual File System. Can write your own tests and code. I hope to
            add more challenges in the future. Now only TwoSum is available. Can
            only use typescript to write code but you can see the transpiled
            javascript if you click the arrows. Hope to add editor hints and
            errors.
          </li>
        </ul>
      </div>
    ),
    video: null,
    front: "https://github.com/BBennettChiba/BBennettProjects",
    img: null,
    tech: [
      typescript,
      trpc as StaticImageData,
      prisma,
      nextjs,
      tailwind,
      authjs,
      vercel,
    ],
  },
  {
    name: "YomiHomies",
    description: description(YHDes),
    video: null,
    front: "https://github.com/Book-Meet/YomiHomies",
    img: [
      chat,
      edit_profile,
      homies_page,
      made_a_match,
      profile_page,
      swipe_page,
    ],
    tech: [
      typescript,
      amplify,
      appsync,
      cognito,
      dynamodb as StaticImageData,
      graphql,
      node,
      reactnative,
    ],
  },
  {
    name: "BlasMisu",
    description: description(BMDes),
    video: null,
    front: "https://github.com/Shinji-Nishikita/team-project-mymizu-front",
    back: "https://github.com/Shinji-Nishikita/team-project-mymizu-back",
    img: [garbagemonster],
    tech: [heroku, mymizu, node, postgres, react, typeorm, vercel],
  },
  {
    name: "Go React",
    description: description(GRDes),
    video: null,
    front: "https://github.com/BBennettChiba/go-react",
    img: [truckstop],
    tech: [vue, node, heroku, typeorm, postgres],
  },
  {
    name: "React Native Book Records",
    description: description(RNBRDes),
    video: null,
    front: "https://github.com/BBennettChiba/ReactNativeBookRecords",
    img: [bookDetails, ownedBooks, toRead],
    tech: [
      amplify,
      appsync,
      cognito,
      dynamodb as StaticImageData,
      graphql,
      node,
      reactnative,
    ],
  },
  {
    name: "Emulators and Computer Science",
    description: description(TTDes),
    video: "https://www.youtube.com/embed/sKCzPlCle-Q",
    img: null,
    tech: null,
  },
] as const;

export default projects;
