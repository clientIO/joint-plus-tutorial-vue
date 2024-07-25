module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    }
  }
}
