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
      entry: "./src/index.ts",
      name: "@alextheman/components",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: "esbuild",
  },
  plugins: [dts(), react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
});
