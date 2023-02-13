const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const Dotenv = require("dotenv-webpack");

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3001,
    compress: true,
    hot: true,
    historyApiFallback: true,
    static: path.join(process.cwd(), "public"),
    liveReload: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    }
  },
  plugins: [
    new Dotenv({
      path: path.join(process.cwd(), ".env.development"),
      safe: true,
      allowEmptyValues: true,
      expand: true,
      systemvars: true,
    }),
  ],
});
