import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';

const extensions = ['.js', '.jsx', '.json', '.ts', '.tsx'];

const config: Configuration = {
  entry: path.join(process.cwd(), 'src', 'index.tsx'),
  output: {
    publicPath: '/',
    path: path.join(process.cwd(), 'build'),
    filename: 'index.bundle.js',
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: path.join(process.cwd(), 'src'),
        extensions,
      }),
    ],
    extensions,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'public', 'index.html'),
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
            loader: 'babel-loader',
            options: {
              presets:[
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ttf|woff)$/,
        use: ['file-loader'],
      },
    ],
  },
};

export default config;