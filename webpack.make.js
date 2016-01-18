'use strict';

// Modules
var autoprefixer = require('autoprefixer');
var clean = require('clean-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Make webpack config
 * @param {Object} options Builder options
 * @param {boolean} options.BULID Generate a build config
 * @param {boolean} options.TEST Generate a test config
 * @returns {Object} Webpack config object
 */
module.exports = function makeWebpackConfig (options) {
  /**
   * Environment type
   * BUILD is for generating minified builds for production
   * TEST is for generating test builds
   */
  var BUILD = !!options.BUILD;
  var TEST = !!options.TEST;

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all the configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if (TEST) {
    config.entry = {}
  } else {
    config.entry = {
      app: './app/src/app.ts'
    }
  }

  /**
   *  Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {}
  } else {
    config.output = {
      // Absolute output directory
      path: __dirname + '/dist',

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: BUILD ? '/' : 'http://localhost:8080/',

      // Filename for entry points
      // Only adds hash in build mode
      filename: BUILD ? 'js/[name].[hash].js' : '[name].js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: BUILD ? 'js/[name].[hash].js' : '[name].js'
    }
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (TEST) {
    config.devtool = 'inline-source-map'
  } else if (BUILD) {
    config.devtool = 'cheap-module-source-map'
  } else {
    config.devtool = 'eval'
  }

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   * Tells webpack where to find things
   */
  config.resolve = {
    extensions: ['', '.ts', '.js'],
    alias: {
      lodash: __dirname + '/node_modules/lodash/'
    }
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialise module
  config.module = {
    preLoaders: [{
      // TSLINT LOADER
      // Reference: https://github.com/palantir/tslint
      // Lint all TS files
      test: /\.ts$/,
      loader: 'tslint',
      exclude: /node_modules/
    }],
    loaders: [{
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Load HTML through JS
      test: /\.html$/,
      loader: 'raw'
    }]
  };

  // TS LOADER
  // Reference: https://github.com/TypeStrong/ts-loader
  // Transpile .ts files into ES5 code
  var tsLoader = {
    test: /\.ts$/,
    loaders: ['ng-annotate', 'ts-loader'],
    exclude: /node_modules/
  }

  // LOCAL SASS LOADER
  // Reference: https://github.com/jtangelder/sass-loader
  // SASS pre-processor for webpack
  var sassLoader = {
    test: /\.scss$/,
    include: __dirname + '/app',
    loader: ExtractTextPlugin.extract('style','css?sourceMap!postcss!sass?sourceMap'),
    exclude: /node_modules/
  }

  // GLOBAL CSS LOADER
  // Reference: https://github.com/webpack/css-loader
  // Allow loading css through js
  var globalCssLoader = {
    test: /\.css$/,
    include: __dirname + '/node_modules',
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
  }

  // Add loaders to list
  config.module.loaders.push(tsLoader, sassLoader, globalCssLoader)

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to css
   */
  config.postcss = [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]

  /**
   * TSLint
   */
  config.tslint = {
    failOnHint: true,
    configuration: require('./tslint.json')
  }

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Move inline styles into separate CSS file
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin('css/bundle.[hash].css', {
      disable: !BUILD || TEST
    })
  ]

  // Skip index.html rendering in test mode
  if (!TEST) {
    config.plugins.push(
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      // Render index.html
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        inject: 'body'
      }),

      // Reference: https://webpack.github.io/docs/list-of-plugins.html#provideplugin
      // Load modules into global namespace
      new webpack.ProvidePlugin({
          _: 'lodash'
      })
    )
  }

  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin(),

      // Reference: https://github.com/johnagan/clean-webpack-plugin
      // Cleans dist folder on compile
      new clean(['dist'])
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: 'dist',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }

  return config
}
