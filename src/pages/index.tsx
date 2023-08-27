import { type NextPage } from "next";
import Head from "next/head";
import AboutMe from "~/components/AboutMe";
import Intro from "~/components/Intro";
import Works from "~/components/Works";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Bryson Bennett&aps;s Page</title>
      <meta name="Resume for Bryson Bennett" content="idk" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="snap-y snap-mandatory">
      <Intro />
      <AboutMe />
      <Works />
    </div>
  </>
);

export default Home;
