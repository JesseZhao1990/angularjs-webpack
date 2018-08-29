/* eslint-disable */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const ExtractTextPlugin = require("extract-text-webpack-plugin");  
const CleanWebpackPlugin = require('clean-webpack-plugin');

let webpackConf = {
  mode:'none',
  // 配置入口文件
  entry:{
    app: ['webpack-dev-server/client?http://localhost:8080/','webpack/hot/dev-server',path.join(__dirname, '../app/main.js')]
  },
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  // 快捷路径的定义
  resolve: {
    extensions: ['.js','.json'],
    alias: {
      '@': path.join(__dirname, '..', 'app'),
    }
  },
  // loader的定义
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../app')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../app')]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },      
      {
        test: /\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ]
  },
  // 插件
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname,`../dist/index.html`),
      template: path.join(__dirname,`../app/index.html`),
      inject: true
    })
  ],
  // 起本地服务
  devServer: {  
    contentBase: "../dist/",  
    historyApiFallback: true,  
    inline: true,  
    hot: true,  
    host: '127.0.0.1',
    watchOptions:{
      ignored:['node_modules'],
      // 监听到文件发送变化后300毫秒之后再去执行动作，防止文件更新太快而导致重新编译的频率太快。
      aggregateTimeout: 300,
      poll:1000 // 每秒询问1000次
    }
  },
}

module.exports = webpackConf