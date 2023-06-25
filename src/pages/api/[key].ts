import { type NextApiHandler } from "next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const handler: NextApiHandler = async (req, res) => {
  const caller = appRouter.createCaller(await createTRPCContext({ req, res }));
  const key = req.query.key;
  if (typeof key !== "string") return res.status(400);
  const link = await caller.link.get(key);
  if (!link) return res.status(404);
  return res.redirect(301, link.url);
};

export default handler;

/**@TODO write server logic for redirect */
