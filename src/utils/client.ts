export const IS_SERVER = typeof window === "undefined";
export const getProtocol = () => {
  const isProd = process.env.VERCEL_ENV === "production";
  if (isProd) return "https://";
  return "http://";
};
export const getAbsoluteUrl = (): string => {
  //get absolute url in client/browser
  if (!IS_SERVER) {
    return location.origin;
  }
  //get absolute url in server.
  const protocol = getProtocol();
  if (process.env.VERCEL_URL) {
    return `${protocol}${process.env.VERCEL_URL}`;
  }
  return `${protocol}localhost:3000`;
};

export const raise = (message: string): never => {
  throw new Error(message);
};
