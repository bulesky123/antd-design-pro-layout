const path = require('path')
const Happypack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

module.exports = {
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      utils: path.resolve(__dirname, '../src/utils'),
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      'common-components': path.resolve(__dirname, '../src/pages/common-components'),
      'language': path.resolve(__dirname, '../src/Framework/Language'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, '../src/assets/svg'),
        options: {
          name: '[name]',
          prefixize: true,
        },
      },
      {
        test: /\.(gif|svg)$/,
        loader: 'file-loader',
        exclude: path.resolve(__dirname, '../src/assets/svg'),
        options: {
          name: 'static/[name].[ext]?[hash:8]',
        },
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images/',
          },
        }],
      },
    ],
  },
  plugins: [
    new Happypack({
      id: 'js',
      threads: 4,
      loaders: ['babel-loader'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static'),
      },
    ]),
    // new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      language: 'language',
    }),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,/zh-cn|id/)
  ],
}
