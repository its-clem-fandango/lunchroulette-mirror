// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@repo/eslint-config/library.js", "prettier"],
  rules: {
    "no-extra-semi": "error",
    "no-mixed-spaces-and-tabs": "error",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
