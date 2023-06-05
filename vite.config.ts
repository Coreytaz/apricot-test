import path from "path";
import fs from "fs";

import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";

const rootPath = __dirname;

const basePath = path.resolve(rootPath, "./src");
const srcDirs = fs
  .readdirSync(basePath)
  .filter((name) => fs.lstatSync(path.join(basePath, name)).isDirectory());

const srcAliases = srcDirs.reduce(
  (acc: any, name: any) => ({
    ...acc,
    [`~${name}`]: `${path.resolve(rootPath, "src")}/${name}`,
  }),
  {}
);

export default ({ mode }: { mode: string }) => {
  const viteEnv = loadEnv(mode, "./envs");
  process.env = { ...process.env, ...viteEnv };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      eslint(),
      svgr({
        exportAsDefault: false,
      }),
    ],
    envDir: "./envs",
    resolve: {
      alias: {
        ...srcAliases,
      },
    },
  });
};
