import { type NextApiHandler } from "next";

export const handler: NextApiHandler = (req, res) =>
  res.redirect(307, "https://www.youtube.com/");
