const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin')  //复制文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //删除文件
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成新的html并把bundle文件注入其中

var config = require('./webpack.config.base');  //引入基础配置

config.mode = "production";

// config.output.path = require('path').resolve('./html/static/bundles/'); //输出打包文件的目录

//添加插件
config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(), // 删除 output.path 里的文件
  //webpack2的UglifyJsPlugin不再压缩loaders，通过以下设置来压缩loaders
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  // minifies your code
  // new webpack.optimize.UglifyJsPlugin({
  //   compressor: {
  //     warnings: false,  //在UglifyJS删除没有用到的代码时不输出警告
  //     drop_console:true,  //删除所有的console语句
  //   },
  //   output: {
  //     comments: false, //关闭注释
  //   },
  // })
  //拷贝文件到文件系统
  // new CopyWebpackPlugin([
  //   //from相对于context, context相对于此文件所在目录，
  //   //to生产模式时是相对于output.path;开发模式时相对于 output.publicPath
  //   {from: '../favicon.ico', to:'../',context: 'html/'},
  //   {from: './img/img_app_icon_114@1x.png', to:'../',context: 'html/'},
  //   {from: './img/img_app_icon@1x.png', to:'../',context: 'html/'},
  //   {from: './fonts/', to:'../fonts/',context: 'src/',toType: 'dir'},
  //   {from: './downloads/', to:'../',context: 'html/',toType: 'dir'},
  //   {from: './vendors/', to:'../vendors/',context: 'html/',toType: 'dir'},
  //   {from: './img/', to:'../img/',context: 'src/',toType: 'dir'},
  //   {from: './*', to:'../js/',context: 'src/js/vendor'},
  //   {from: './partials/', to:'../partials/',context: 'src/'},
  // ]),
  //生成新的html，到文件系统
  new HtmlWebpackPlugin({ //注意：生成的html中，css和js文件注入的路径是: output.publicPath + 文件名
    template: 'html/index.html', //源文件
    filename: '../index.html',  //生成的html文件，路径相对于 output.path
  })
]);

module.exports = config;