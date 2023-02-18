const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { dependencies } = require("../package.json");
const { presets } = require("../babel.config");

const extensions = [".js", ".jsx", ".json", ".ts", ".tsx"];

module.exports = {
  entry: path.join(process.cwd(), "src", "index.tsx"),
  output: {
    publicPath: "http://localhost:3000/",
    path: path.join(process.cwd(), "build"),
    filename: "index.bundle.js",
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: path.join(process.cwd(), "src"),
        extensions,
      }),
    ],
    extensions,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "God",
      remotes: {
        Devil: `Devil@http://localhost:3001/remoteEntry.js`,
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ttf|woff)$/,
        use: ["file-loader"],
      },
    ],
  },
};
