const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './lib'
  ],
  output: {
    path:          path.join(__dirname, 'dist'),
    filename:      'stuffy.js',
    publicPath:    '',
    library:       'Stuffy',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'lib')],
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
