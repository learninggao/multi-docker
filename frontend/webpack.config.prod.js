/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.config.common')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: ['./src/index.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
})
