import { type NextPage } from "next";
import Head from "next/head";

/**@TODO make this my landing page */

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reddit comments clone</title>
        <meta
          name="an attempt at making a comment system similar to Reddit"
          content="t3-stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full"> my page</main>
    </>
  );
};

export default Home;

