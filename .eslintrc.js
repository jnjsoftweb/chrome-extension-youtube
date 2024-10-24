module.exports = {
  env: {
    browser: true, // Add this line
    es2021: true,
  },
  extends: ["react-app", "eslint:recommended"],
  globals: {
    chrome: "readonly", // Add this line
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // You can customize your rules here
  },
};
