import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const posts = api.post.getPosts.useQuery();

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
      <main className="">
        <div className="">
          <h1 className=""></h1>
          <div className="">
            <p className="">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
              {posts.data && posts.data.length > 0
                ? posts.data.map((post) => (
                    <Link href={`posts/${post.id}`} key={post.id}>
                      <h1>{post.title}</h1>
                    </Link>
                  ))
                : null}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
