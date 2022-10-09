// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  reactStrictMode: true,
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@helper$": "<rootDir>/helper",
    "^@services/(.*)$": "<rootDir>/services/$1",
  },
});
