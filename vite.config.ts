import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// eslint-disable-next-line no-restricted-imports
import { peerDependencies } from "./package.json";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const muiPackages = [
  "@mui/material",
  "@mui/system",
  "@mui/utils",
  "@mui/icons-material",
];

export default defineConfig({
  optimizeDeps: {
    include: muiPackages,
  },
  ssr: {
    noExternal: muiPackages,
  },
  build: {
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: "vite-react-ts-button", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
    },
    sourcemap: false, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
    minify: "esbuild",
  },
  plugins: [dts(), react()], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
});
