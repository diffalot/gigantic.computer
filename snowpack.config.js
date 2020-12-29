module.exports = {
  mount: { src: "/" },
  plugins: ["@snowpack/plugin-postcss"],
  experiments: {
    source: "skypack",
    optimize: {
      bundle: true,
      minify: true,
      target: "es2018",
    },
  },
};
