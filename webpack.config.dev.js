/**
 * 开发模式对应的 webpack 配置。
 * 使用 node server.js 命令启用开发模式。
 */
var webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin')  //复制文件
const HtmlWebpackPlugin = require('html-webpack-plugin')  //将打包后的bundle注入到html中，产生一个新的html

var ip = 'localhost';
var port = 3000;
//引入基础配置
var getBaseConfig = require('./webpack.config.base');

module.exports = (env, argv) => {
  var config = getBaseConfig(env, argv);

  // config.mode = "development";

  //每个module会通过eval()来执行，并且生成一个DataUrl形式的SourceMap.
  config.devtool = "#eval-source-map";

  //修改入口
  config.entry.app = [
    'webpack-dev-server/client?http://' + ip + ':' + port,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './html/app',
  ];

  config.devServer = {
    contentBase: './dist',
    hot: true,
    port: port,
    inline: true,
    headers: {"Access-Control-Allow-Origin":"*"},
    historyApiFallback: true,   //the index.html page will be served in place of any 404 responses.
  }

  config.output.publicPath = 'http://' + ip + ':' + port + '/';

  //添加插件
  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),   //当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //拷贝文件到webpack-dev-server服务器
    // new CopyWebpackPlugin([ //from相对于context, context相对于此文件所在目录，
    //   //to生产模式时是相对于output.path;开发模式时相对于 output.publicPath
    //   {from: '../favicon.ico', to:'./',context: 'html/'},
    //   {from: './img/img_app_icon_114@1x.png', to:'./',context: 'html/'},
    //   {from: './img/img_app_icon@1x.png', to:'./',context: 'html/'},
    //   {from: './vendors/', to:'./vendors/',context: 'html/',toType: 'dir'},
    //   {from: './downloads/', to:'./',context: 'html/',toType: 'dir'},
    //   {from: './fonts/', to:'./fonts/',context: 'src/',toType: 'dir'},
    //   {from: './img/', to:'./img/',context: 'src/',toType: 'dir'},
    //   {from: './*', to:'./js/',context: 'src/js/vendor'},
    // ]),
    //生成一个新的html，到webpack-dev-server服务器
    new HtmlWebpackPlugin({ //生成的html中，css和js文件注入的路径是: output.publicPath + 文件名
      hash: true,
      template: 'html/index.html',
      filename: 'index.html',  //生成的html，路径相对于 output.publicPath。默认为index.html
    })
  ]);

  return config;
}
