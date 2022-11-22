module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: ["src/@types", "src/database", "src/**/*.spec.ts"],
  include: ["src/**/*.ts"],
};
