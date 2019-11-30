/**
 * webpack基础配置。
 * 在 webpack.config.dev.js 和 webpack.config.prod.js 文件中被引入。
 */
var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
//引入样式抽离插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  //基础目录，入口起点会相对于此目录查找
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    app: './html/app.js',
    vendors: ['react']  //指定第三方插件打包到 vendors.js 中
  },

  output: {
    //打包文件输出目录
    path: path.resolve('./dist/bundles/'),
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
    //访问静态资源的基础路径
    publicPath: '/bundles/'
  },

  externals: [
  ], // add all vendor libs

  optimization: {
    splitChunks: {
      minChunks: 2, //Minimum number of chunks that must share a module before splitting.
      cacheGroups: {
        commons: {
          name:"commons"
        },
        styles: {
          name: 'app',
          test: /\.(c|le)ss$/,
          chunks: 'all',
          enforce: true,
        },
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ], // add all common plugins here

  module: {
    rules:[
      {
        test: /\/expression\/parser\.js$/,
        use: 'exports-loader?parser'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              hmr: devMode,
              reloadAll: true
            },
          },
          'css-loader','postcss-loader'
        ],
      },
      {
        test: /\.less$/i,
        use:  ['style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            hmr: devMode,
            reloadAll: true
          },
        },
        'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: 'url-loader?limit=8192'
      },
      // the url-loader uses DataUrls. url-loader封装了file-loader。
      //小于(limit/1024)kb的woff/wpff2文件被编码成DataURL，并内联到代码中.
      //大于这个限制的文件会使用file-loader打包。通过http请求加载。
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=81920'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ] // add all common loaders here
  },

  resolve: {
    modules:['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx', '.css']
  }
};
