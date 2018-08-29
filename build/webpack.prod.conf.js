/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const ExtractTextPlugin = require("extract-text-webpack-plugin");  
const CleanWebpackPlugin = require('clean-webpack-plugin');

let webpackConf = {
  mode:'none',
  // 配置入口文件
  entry:{
    app: path.join(__dirname, '../app/main.js')
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },      
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
    ]
  },
  // 插件
  plugins:[
    new ExtractTextPlugin({
     filename: 'static/css/[name].[hash:7].css'
    }),
    //设置每一次build之前先删除dist  
    new CleanWebpackPlugin(  
      ['dist/*',],　     //匹配删除的文件  
      {  
          // root: __dirname,   //根目录  
          verbose: true,    //开启在控制台输出信息  
          dry: false     //启用删除文件  
      }  
    ),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname,`../dist/index.html`),
      template: path.join(__dirname,`../app/index.html`),
      inject: true
    })
  ] 
}

module.exports = webpackConf