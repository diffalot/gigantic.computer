var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: __dirname + '/src/app',
  entry: {
    app: './index.js',
    vendor: [
      'three',
      'three-orbit-controls'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new ExtractTextPlugin('style.css')
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.md$/,
        loader: 'raw'
      },
      {
        test: /\.jpg$/,
        loader: 'url'
      }
    ]
  }
}
