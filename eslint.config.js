import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.nodeBuiltin,
    },
  },
  {
    rules: {
      curly: ["error", "all"],
      eqeqeq: "error",
    },
  },
];
