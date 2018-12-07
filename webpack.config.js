var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') require('dotenv').load();
let ExposedSettings = {
  process: {
    env: {
      NODE_ENV: `"${process.env.NODE_ENV || 'prod'}"`,
      DATASKEPTIC_API_URI: `"${process.env.DATASKEPTIC_API_URI || `https://4sevcujref.execute-api.us-east-1.amazonaws.com/${process.env.NODE_ENV || 'prod'}`}"`,
      BOT_SERVICE_API_URI: `"${process.env.BOT_SERVICE_API_URI || 'https://data-skeptic-bot-service-dev.herokuapp.com'}"`
    }
  }
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js',
  },
  mode: 'development',
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ],
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
  ]
};
