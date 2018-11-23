const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html'//,
  // filename: 'index.html',
  // inject: 'body'
});

module.exports = {
  entry: [
    './src/js/client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  module: {
    rules: [
      { test: /\.css$/, include: [
        path.resolve(__dirname, "not_exist_path")
      ],loader: "style-loader!css-loader"},
      { test: /\.json$/, loader: "json-loader"},
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
