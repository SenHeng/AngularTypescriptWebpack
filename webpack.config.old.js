'use strict';

// Modules
var autoprefixer = require('autoprefixer');
var clean = require('clean-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      'app/src/app.ts'
    ]
//    vendor: ['angular']
  },

  output: {
    path: __dirname + 'dist',
    filename: 'js/bundle.[hash].js'
  },
  devtool: 'source-map',
  devServer: {
    inline: false
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ng-annotate', 'ts-loader'],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style','css?sourceMap!postcss!less?sourceMap')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style','css?sourceMap!postcss!sass?sourceMap')
      }, {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },
  tslint: {
    failOnHint: true,
    configuration: require('./tslint.json')
  },
  postcss: [
      autoprefixer({ browsers: ['last 2 versions'] })
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('css/bundle.[hash].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
//    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
    new webpack.HotModuleReplacementPlugin(),
    new clean(['dist'])
  ]
};
