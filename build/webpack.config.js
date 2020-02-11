const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin') // 控制台
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const apiMocker = require('webpack-api-mocker')
const baseConfig = require('./webpack.config.base')

const jsonStringify = v => JSON.stringify(v)
const copyFile = (type) => {
  fs.writeFileSync(path.resolve(__dirname, '../src/config/index.js'), fs.readFileSync(path.resolve(__dirname, `../src/config/${type}.js`)))
}
const isDev = process.env.NODE_ENV === 'development'
const isRd = process.env.NODE_ENV === 'rd'
if (!isDev) copyFile(process.env.NODE_ENV)

const devServer = {
  host: '0.0.0.0',
  port: '3001',
  hot: true,
  historyApiFallback: true,
  overlay: {
    errors: true,
  },
  publicPath: '/',
  proxy: {
    '/api': {
      target: '',
      // target: 'http://www.channel.cc',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    },
    '/captcha': {
      target: '',
      // target: 'http://www.channel.cc',
      changeOrigin: true,
      pathRewrite: {
        '^/captcha': '/captcha',
      },
    },
  },
  before(app) {
    apiMocker(app, path.resolve('./mocker/index.js'), {
      // proxy: {
      //   '/repos/*': 'https://api.github.com/',
      // },
      changeHost: true,
    })
  },
}
const defaultPlugins = [
  // new InterpolateHtmlPlugin({
  //   wx: 'sss',
  // }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? jsonStringify('development') : jsonStringify('production'),
    },
  }),
  new HtmlWebpackPlugin({
    hash: true,
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.html'),
  }),
]
if (isRd) {
  defaultPlugins.push(new vConsolePlugin({
    enable: true, // 发布代码前记得改回 false
  }))
}
let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer,
    entry: {
      index: [
        'react-hot-loader/patch',
        path.resolve(__dirname, '../src/index.js'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              module: true,
              localIdentName: '[local]__[hash:8]',
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
          ],
        },
        {
          test: /\.less$/,
          include: /node_modules/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
            },
            { loader: 'postcss-loader' },
            {
              loader: require.resolve('less-loader'),
              options: {
                modifyVars: {
                  // 'primary-color': '#0AB76D', // 全局主色
                  // 'link-color': '#1890ff', // 链接色
                  // 'success-color': '#52c41a', // 成功色
                  // 'warning-color': '#faad14', // 警告色
                  // 'error-color': '#f5222d', // 错误色
                  // 'font-size-base': '14px', // 主字号
                  // // "table-header-color": "#999999", // 表格head文字颜色
                  // // "table-header-bg": "#F8F9FD", // 表格head背景颜色
                  // // "table-row-hover-bg": "rgba(255, 92, 91, .02)",
                  // 'text-color': '#333333', // 主文本色
                  // 'text-color-secondary ': '#999999', // 次文本色
                  // 'disabled-color ': 'rgba(0, 0, 0, .25)', // 失效色
                  // 'border-radius-base': '2px', // 组件/浮层圆角
                  // 'border-color-base': '#d9d9d9', // 边框色
                  // 'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)', // 浮层阴影
                  // 'border-color-split': '#E5E5E5',
                  // 'btn-border-radius-base': '4px',
                },
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
    ]),
  })
} else {
  config = merge(baseConfig, {
    // devtool: 'source-map',
    mode: 'production',
    // entry: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],
    entry: [path.resolve(__dirname, '../src/index.js')],
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: 'runtime',
      },
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1, minimize: true, module: true },
            },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' },
          ],
        },
        {
          test: /\.less$/,
          include: /node_modules/,
          use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              modifyVars: {
              },
              javascriptEnabled: true,
            },
          },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash:8].css',
        chunkFilename: '[name].[contenthash:8].css',
      }),
    ]),
  })
}

module.exports = config
