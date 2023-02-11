const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const {container} = require("webpack");
const { dependencies } = require("../package.json");

const extensions = [".js", ".jsx", ".json", ".ts", ".tsx"];

module.exports = {
  entry: path.join(process.cwd(), "src", "index.tsx"),
  output: {
    publicPath: "/",
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
    new container.ModuleFederationPlugin({
      name: "Devil",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
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
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
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
