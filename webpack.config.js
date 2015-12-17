module.exports = {
  context: __dirname + '/src/app',
  entry: './index.js',
  output: {
    path: __dirname + '/dist/app',
    filename: 'angular-webpack.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel'],
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
      }
    ]
  }
}
