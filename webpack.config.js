const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './easy-filter.b.js',
  output: {
    path: path.resolve(__dirname, 'dist/browser/'),
    filename: 'easy-filter.min.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['babel-loader', 'ts-loader'] },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: __dirname + '/src/',
        to: __dirname + '/dist/ts/'
      }]
    })
  ]
}