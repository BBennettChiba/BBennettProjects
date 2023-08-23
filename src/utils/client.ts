import { isServer } from "@tanstack/react-query";
import {
  createSystem,
  createVirtualTypeScriptEnvironment,
  // createVirtualCompilerHost,
  createDefaultMapFromCDN,
} from "@typescript/vfs";
import ts from "typescript";

const start = async () => {
  if (isServer) return null;
  const shouldCache = true;
  // This caches the lib files in the site's localStorage
  const fsMap = await createDefaultMapFromCDN(
    compilerOpts,
    ts.version,
    shouldCache,
    ts
  );

  fsMap.set("index.ts", "const hello = 'hi'");
  return fsMap;
};

const compilerOpts = {
  target: 3,
};

export const virtualTS = start().then((fsMap) => {
  if (!fsMap) return null;
  const system = createSystem(fsMap);

  // const host = createVirtualCompilerHost(system, compilerOpts, ts);

  // const program = ts.createProgram({
  //   rootNames: [...fsMap.keys()],
  //   options: compilerOpts,
  //   host: host.compilerHost,
  // });

  // This will update the fsMap with new files
  // for the .d.ts and .js files
  // program.emit();

  const env = createVirtualTypeScriptEnvironment(
    system,
    ["index.ts"],
    ts,
    compilerOpts
  );
  return env;
});

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
