/**
 * webpack基础配置。
 * 在 webpack.config.dev.js 和 webpack.config.prod.js 文件中被引入。
 */
var path = require("path");
// var webpack = require('webpack');
//引入样式抽离插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
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
          name:"commons",
        },
        // Extracting all CSS/less in a single file
        // styles: {
        //   name: 'styles',
        //   test: /\.(c|le)ss$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
      }
    }
  },
  plugins: [
  ], // add all common plugins here

  module: {
    rules:[
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

module.exports = (env, argv) => {

  var devMode = argv.mode === 'development'   // whether is development mode

  config.plugins.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[name].css' : '[name].[hash].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  )

  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        // 'style-loader', //creates style nodes from JS strings
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // only enable hot in development
            hmr: devMode,
            // if hmr does not work, this is a forceful method.
            reloadAll: true,
          },
        },
        { loader: 'css-loader', options: { sourceMap: devMode} }, // translates CSS into CommonJS
        { loader: 'postcss-loader', options: { sourceMap: devMode?'inline':false}}, // autoprefix and minify css
      ],
    },
    {
      test: /\.less$/i,
      use:  [
        // 'style-loader',  //creates style nodes from JS strings
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // only enable hot in development
            hmr: devMode,
            // if hmr does not work, this is a forceful method.
            reloadAll: true,
          },
        },
        { loader: 'css-loader', options: { sourceMap: devMode}}, // translates CSS into CommonJS
        { loader: 'postcss-loader', options: { sourceMap: devMode?'inline':false}},   // autoprefix and minify css
        { loader: 'less-loader', options: { sourceMap: devMode }}  // compiles Less to CSS
      ]
    }
  )

  return config;
};