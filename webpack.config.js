var webpack = require("webpack");
var env = process.env.NODE_ENV;

var reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react"
};

var reactDomExternal = {
  root: "ReactDOM",
  commonjs2: "react-dom",
  commonjs: "react-dom",
  amd: "react-dom"
};

var config = {
  externals: {
    "react": reactExternal,
    "react-dom": reactDomExternal
  },
  module: {
    rules: [{
      test: /\.js$/,
      enforce: "pre",
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        // more options in the optional jshint object

      }],
    }],
  },
  output: {
    library: "ReactGPT",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    })
  ]
};

module.exports = config;
