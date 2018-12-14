var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var MinifyPlugin = require('babel-minify-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').load();
let ExposedSettings = {
  test: 123,
  process: {
    env: {
      NODE_ENV: `"${process.env.NODE_ENV || 'production'}"`,
      DATASKEPTIC_API_URI: `"${process.env.DATASKEPTIC_API_URI || `https://4sevcujref.execute-api.us-east-1.amazonaws.com/prod`}"`,
      BOT_SERVICE_API_URI: `"${process.env.BOT_SERVICE_API_URI || 'https://data-skeptic-bot-service-dev.herokuapp.com'}"`,
      GA_TRACKING_ID: `"${process.env.GA_TRACKING_ID || ''}"`
    }
  }
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: process.env.NODE_ENV === 'development' ? '[name].bundle.js' : '[name].[hash].bundle.js',
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    port: 5001,
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!sass-loader" }) },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
  optimization:{
    minimize: true,
    minimizer: [
      new MinifyPlugin({}, {
        test: '/\.js($|\?)/i'
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
  },
  resolve: {
    alias: {
      'Api': path.resolve(__dirname, 'src/api'),
      'Components': path.resolve(__dirname, 'src/components'),
      'Src': path.resolve(__dirname, 'src'),
      'Views': path.resolve(__dirname, 'src/views'),
    }
  },
  plugins: [
    new webpack.DefinePlugin(ExposedSettings),
    new ExtractTextPlugin('styles.bundle.css'),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({ template: './build/index.template.html' }),
  ]
};
