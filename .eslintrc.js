module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react",
  ],
  settings: {
    "react": {
      "pragma": "React",
      "version": "detect",
    },
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-boolean-value": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-double"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "eol-last": ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "max-len": ["error", { "code": 120 }]
  },
};
