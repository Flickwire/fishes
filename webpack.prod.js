const path = require("path");
const webpack = require('webpack'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
  mode: "production", // this trigger webpack out-of-box prod optimizations
  entry: "./index.ts",
  output: {
    filename: `[name].[hash].js`, // [hash] is useful for cache busting!
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  optimization: {
    minimizer: [
      `...`,
      new ClosurePlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin(
        {
            title: 'Fishes'
        }
    ),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  devtool: "source-map" // supposedly the ideal type without bloating bundle size
};
