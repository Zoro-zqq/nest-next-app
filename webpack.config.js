/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
// fork-ts-checker-webpack-plugin需要单独安装
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const tsConfigFile = 'tsconfig.server.json'
const lazyImports = [
  '@nestjs/microservices',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
  'cache-manager',
  'class-validator',
  'class-transformer',
  'react-server-dom-webpack/client.edge',
  'next/dist/build/webpack/plugins/terser-webpack-plugin',
  'react-server-dom-webpack/server.node',
  'react-server-dom-webpack/client.edge',
  '@opentelemetry/api',
  'critters',
  'uglify-js',
  '@swc/core',
  'esbuild',
  'react-redux',
  'react-transition-group',
  'redux-logger',
  'socket.io-client',
  'three',
  'stacktrace-js',
  'next-redux-cookie-wrapper',
  'lucide-react',
  'js-cookie',
  'is-mobile',
  'handsontable',
  'framer-motion',
  'axios-auth-refresh',
  'axios',
  'antd',
  'ahooks',
  '@reduxjs/toolkit',
  '@react-three/fiber',
  '@react-three/drei',
  '@onlyoffice/document-editor-react',
  '@ant-design/icons',
  '@neodrag/react',
  '@rooks/use-raf'
]

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, './src/server/main.ts'), // 入口文件
  // 打包后的文件名称以及位置
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 忽略依赖
  externals: [nodeExternals()],
  // ts文件的处理
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    plugins: [
      // 别名路径处理
      new TsconfigPathsPlugin({
        configFile: tsConfigFile
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 需要进行忽略的插件
    new webpack.IgnorePlugin({
      checkResource(resource) {
        if (!lazyImports.includes(resource)) {
          return false
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()]
          })
        } catch (err) {
          return true
        }
        return false
      }
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}
