const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const { join } = require("path");
const { port } = require("./package.json");

const rootPath = process.cwd();

module.exports = {
  target: "web",

  cache: {
    type: "memory",
  },

  entry: {
    css: join(rootPath, "src/scss/main.scss"),
    app: join(rootPath, "src/index.js"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              sourceType: "unambiguous",
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: require.resolve("html-loader"),
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: require.resolve("style-loader"),
          },
          {
            loader: require.resolve("css-loader"),
          },
          {
            loader: require.resolve("sass-loader"),
          },
        ],
      },
      {
        test: /\.(woff|ttf|otf|eot|woff2|svg|gif|png|cur|jpg|webp|jpe?g)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
      },
    ],
  },

  mode: "production",
  devtool: false,
  watch: false,

  devServer: {
    compress: false,
    open: true,
    hot: true,
    port,
  },

  output: {
    path: join(rootPath, "dist"),
    filename: "[name].[contenthash:5].js",
    publicPath: "/",
    pathinfo: false,
    clean: true,
    assetModuleFilename: "assets/[contenthash:5][ext][query]",
  },

  optimization: {
    minimize: true,

    minimizer: [
      new TerserPlugin({
        exclude: /\/node_modules/,
        parallel: true,
      }),
    ],
  },

  performance: {
    hints: false,
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: join(rootPath, "public/tocopy/"),
          to: join(rootPath, "dist/"),
        },
      ],
    }),

    new HtmlWebpackPlugin({
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      favicon: join(rootPath, "public/favicon.ico"),
      minify: {
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeRedundantAttributes: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeComments: false,
      },
      template: join(rootPath, "public/index.html.ejs"),
    }),

    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      algorithm: "gzip",
      threshold: 1024,
      minRatio: 1,
    }),

    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      deleteOriginalAssets: false,
      threshold: 1024,
      minRatio: 1,
      compressionOptions: {
        level: 11,
      },
    }),
  ],
};
