var path = require('path')
module.exports = {
  entry: './easy-filter.b.js',
  output:{
    path: path.resolve(__dirname, 'dist/browser/'),
    filename: 'easy-filter.min.js'
  },
  module:{
    rules:[
      {test:/\.js$/, use:'babel-loader'},
    ]
  }
}