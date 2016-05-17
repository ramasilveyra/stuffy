const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src'
  ],
  output: {
    path:          path.join(__dirname, 'dist', 'public'),
    filename:      'stuffy.js',
    publicPath:    '',
    library:       'Stuffy',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [path.join(__dirname, 'src'), path.join(__dirname, 'lib')],
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title:    'Stuffy',
      template: './templates/index.html',
      inject:   'head'
    })
  ]
};
