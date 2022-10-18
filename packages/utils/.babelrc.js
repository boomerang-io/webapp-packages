const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: BABEL_ENV === "esm" ? false : "commonjs",
      },
    ],
  ],
};
