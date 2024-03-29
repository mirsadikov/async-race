const Path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
    path: path.join(__dirname, '/static/js-build'),
    devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
  },
  devServer: {
    client: {
      logging: 'error',
    },
    hot: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ESLintPlugin({
      extensions: 'js',
      emitWarning: true,
      files: Path.resolve(__dirname, '../src'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
