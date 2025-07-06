import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
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
      "import/no-unresolved":
        process.env.ESLINT_MODE === "format" ? "warn" : "error",
      eqeqeq: process.env.ESLINT_MODE === "format" ? "warn" : "error",
      "no-console": "warn",
      "no-restricted-imports": [
        process.env.ESLINT_MODE === "format" ? "warn" : "error",
        {
          paths: [
            {
              name: "@mui/material",
              message:
                "Please use `import Component from \"@mui/material/Component\"` instead. See https://mui.com/material-ui/guides/minimizing-bundle-size/ for more information",
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
        process.env.ESLINT_MODE === "format" ? "warn" : "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "func-style": ["error", "declaration"]
    },
  },
);
