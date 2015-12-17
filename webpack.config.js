module.exports = {
  context: __dirname + '/src/app',
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'webpack.js'
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
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.template.html$/,
        loader: 'raw'
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
