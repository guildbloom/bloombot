import { defineConfig } from "vite";

import copy from "rollup-plugin-copy";

// import { dependencies } from "./package.json";

export default defineConfig({
  plugins: [
    copy({
      targets: [{ src: "./package.json", dest: "../dist/functions" }],
      verbose: true,
      hook: "closeBundle",
    }),
  ],
  envDir: "../",
  envPrefix: "FUNC_",
  build: {
    outDir: "../dist/functions",
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["cjs"],
    },
  },
  ssr: {
    // noExternal: Object.keys(dependencies),
    // external: ["crypto", "stream", "util", "http", "url", "https"],
    target: "node",
  },
});
