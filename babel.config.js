module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        loose: true,
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
