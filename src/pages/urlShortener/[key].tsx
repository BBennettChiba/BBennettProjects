import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";
import { getAbsoluteUrl } from "~/utils/client";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
/**
 * @TODO make this prettier and supply more information 
 */
export default function URL({ id }: Props) {
  const { data } = api.link.get.useQuery(id);
  if (!data) throw new Error("Error finding data");
  const url = `${getAbsoluteUrl()}/${data.id}`;
  return (
    <div className="flex h-full items-center justify-center bg-base-100">
      <div className="card h-1/3 w-96 bg-info-content shadow-xl">
        <div className="justify-between card-body flex flex-col">
          <h1 className="card-title">Your Link</h1>
          <h2>{url}</h2>
          <button
            className="btn-primary btn"
            onClick={() => {
              void navigator.clipboard.writeText(url);
            }}
          >
            Copy
          </button>
          <h2>{data.url}</h2>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ key: string }>
) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.key as string;

  await helpers.link.get.prefetch(id);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
