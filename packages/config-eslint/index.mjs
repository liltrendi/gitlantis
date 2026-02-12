import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import tailwindcss from "eslint-plugin-tailwindcss";
import tsParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

const ABSOLUTE_IMPORTS_RULE = [
  "error",
  {
    patterns: ["./*", "../*"],
  },
];

const createConfig = ({
  isBrowser,
  isNode,
  hasReact,
  hasTailwind,
  ignores = [],
}) => {
  const pluginSet = {
    "@typescript-eslint": tseslint.plugin,
    prettier,
  };

  if (hasReact) {
    pluginSet["react-hooks"] = reactHooks;
    pluginSet["react-refresh"] = reactRefresh;
  }

  if (hasTailwind) {
    pluginSet.tailwindcss = tailwindcss;
  }

  const ruleSet = {
    ...js.configs.recommended.rules,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-restricted-imports": ABSOLUTE_IMPORTS_RULE,
  };

  if (hasReact) {
    Object.assign(ruleSet, {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    });
  }

  return tseslint.config(
    { ignores: ["dist", "out", ".turbo", ...ignores] },
    {
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2022,
        parser: tsParser,
        sourceType: "module",
        parserOptions: {
          ecmaFeatures: { jsx: true },
        },
        globals: {
          ...(isBrowser ? globals.browser : {}),
          ...(isNode ? globals.node : {}),
        },
      },
      plugins: pluginSet,
      rules: ruleSet,
    }
  );
};

export const createWebEslintConfig = () =>
  createConfig({
    isBrowser: true,
    isNode: true,
    hasReact: true,
    hasTailwind: true,
    ignores: ["../extension/out/**"],
  });

export const createExtensionEslintConfig = () =>
  createConfig({
    isBrowser: false,
    isNode: true,
    hasReact: false,
    hasTailwind: false,
  });
