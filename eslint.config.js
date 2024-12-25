import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react,
      reactHooks,
      typescriptEslint,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
      },
    },
    rules: {
      "unicode-bom": "off",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "error",
      "react/no-children-prop": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message: "Импортируйте конкретные объекты, а не весь React.",
            },
          ],
        },
      ],
    },
    ignores: [
      "src/services/*",
      "dist/**",
      "node_modules/**",
      "**/*.md",
      "build/**",
      "vite.config.ts",
    ],
  },
  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
      },
    },
  },
];
