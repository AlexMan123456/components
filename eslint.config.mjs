import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";

const warnOnFixButErrorOnLint = process.env.ESLINT_MODE === "fix" ? "warn" : "error";

export default [
  js.configs.recommended,
  {
  ignores: ["dist"],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    import: importPlugin,
    react: reactPlugin,
    "@typescript-eslint": tsPlugin,
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react-hooks/exhaustive-deps": "off",
    "import/no-unresolved": warnOnFixButErrorOnLint,
    eqeqeq: warnOnFixButErrorOnLint,
    "no-console": "warn",
    "no-restricted-imports": [
      warnOnFixButErrorOnLint,
      {
        paths: [
          {
            name: "@mui/material",
            message:
              "Please use `import Component from \"@mui/material/Component\"` instead. See https://mui.com/material-ui/guides/minimizing-bundle-size/ for more information.",
          },
        ],
        patterns: [
          {
            group: ["./", "../"],
            message: "Relative imports are not allowed",
          },
        ],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      warnOnFixButErrorOnLint,
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    // This is the standard JavaScript no-unused-vars, which will throw an error if used alongside the TypeScript one
    "no-unused-vars": "off",
    "func-style": ["error", "declaration", { allowArrowFunctions: false }],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
    "no-param-reassign": "error",
    "no-useless-rename": "error",
    "sort-vars": "error",
    "no-cond-assign": "error",
  },
}];
