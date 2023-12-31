module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    // "eslint:recommended",
    "@vue/typescript/recommended",
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-constant-condition": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/camelcase": "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      rules: {
        "no-var": "off",
        "no-fallthrough": "off",
      },
      env: {
        mocha: true,
      },
    },
  ],
};
