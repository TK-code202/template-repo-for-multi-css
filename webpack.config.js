const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: {
    index: "./src/main.js",
    page: "./src/script.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      context: "compiler.context",
      eslintPath: "eslint",
      extensions: "js",
      exclude: "node_modules",
      fix: false,
      formatter: "stylish",
      lintDirtyModulesOnly: false,
      threads: false,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: false,
      quiet: false,
      outputReport: false,
    }),

    
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new HtmlWebpackPlugin({
      title: 'Project Name',
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"], // ← Only include index bundle + CSS
    }),

    new HtmlWebpackPlugin({
      template: "./src/page.html",
      filename: "page.html",
      chunks: ["page"], // ← Only include page bundle + CSS
    }),


  ],
  module: {
    rules: [
       {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
