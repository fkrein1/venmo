module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: ["src/@types", "src/database"],
  include: ["src/**/*.ts"],
};
