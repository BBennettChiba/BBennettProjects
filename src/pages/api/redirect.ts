import { type NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) =>
  res.redirect(307, "https://www.youtube.com/");

export default handler;

/**@TODO write server logic for redirect */