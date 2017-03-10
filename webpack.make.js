const 
  autoprefixer = require('autoprefixer'),
  path = require('path'),
  webpack = require('webpack'),

  // Webpack plugins
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin')
;
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
    config.entry = {};
  } else {
    config.entry = {
      app: './src/lib/app.ts'
    };
  }

  /**
   *  Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {};
  } else {
    config.output = {
      // Absolute output directory
      path: __dirname + '/dist',

      // Filename for entry points
      // Only adds hash in build mode
      filename: BUILD ? 'js/[name].[hash].js' : '[name].js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: BUILD ? 'js/[name].[hash].js' : '[name].js'
    };
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (TEST) {
    config.devtool = 'inline-source-map';
  } else if (BUILD) {
    config.devtool = 'cheap-module-source-map';
  } else {
    config.devtool = 'eval';
  }

  /**
   * Resolve
   * Reference: https://webpack.js.org/configuration/resolve/
   * Tells webpack where to find what
   */
  config.resolve = {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      app: path.join(__dirname, 'app')
    }
  };

  /**
   * Resolve Loaders
   * Reference: https://webpack.js.org/concepts/loaders/#resolving-loaders
   * Tells webpack where to load modules from
   */
  config.resolveLoader = {
    modules: ['node_modules']
  };

  /**
   * Loaders
   * Reference: https://webpack.js.org/concepts/loaders/
   * Rules for converting TS to JS, LESS to CSS
   * moved to separate rules.js file
   */
  config.module = {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: './tslint.json',
          failOnHint: true
        },
        exclude: 'node_modules'
      },
      {
        test: /\.ts$/,
        // loader: 'ng-annotate-loader!ts-loader',
        loader: 'ts-loader',
        exclude: 'node_modules'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(scss$|css$)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('cssnano')
              ]
            }
          },
          'sass-loader?sourceMap'
        ]})
      },
      { // handle fonts for FontAwesome 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&publicPath=../../&name=./assets/fonts/[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?publicPath=../../&name=./assets/fonts/[name].[ext]'
      },
      { // convert images to data-uris
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  };

  /**
   * Plugins
   * Reference: https://webpack.js.org/configuration/plugins
   */
  config.plugins = [
    new ExtractTextPlugin('assets/css/[name].[hash].css')
  ];

  if (!TEST) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        hash: true
      }),
      new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // 'window.jQuery': 'jquery'
      }),
      // new CopyWebpackPlugin([
      //   // image assets
      //   { from: 'src/assets/img', to: 'assets/img' },
      //   // favicon
      //   { from: 'src/favicon.png', to: 'favicon.png' },
      //   // robots.txt
      //   { from: 'src/robots.txt', to: 'robots.txt'}
      // ]),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      })
    )
  }

  if (BUILD) {
    config.plugins.push(
      new UglifyJSPlugin()
    )
  }

  /**
   * Dev server configuration
   * Reference: https://webpack.js.org/configuration/dev-server
   */
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 9000,
    proxy: {
      '/api/v1': 'http://localhost:8080'
    }
    // uncomment for external access
    // ,host: '0.0.0.0'
  }

  return config;
};
