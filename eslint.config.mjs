import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import alexBaseConfig from "@alextheman/eslint-config-typescript-react-base"

export default [
  ...alexBaseConfig,
  {
    files: ["**/*.{ts,tsx}"]
  },
];
