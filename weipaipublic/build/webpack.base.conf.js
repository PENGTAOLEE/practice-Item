var webpack = require('webpack')
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
require('babel-polyfill')
// var jquery = require('jquery')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // "babel-polyfill":"babel-polyfill",//用来解决的兼容性
    app: ["babel-polyfill",'./src/main.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], 
    alias: {
      '@': resolve('src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'ajax' : '@/assets/js/ajax',
      'utils' : '@/assets/js/utils',
      'websocket' : '@/assets/js/websocket',
      // 'config.json' : '@/assets/config',
      'cusplupload' : '@/assets/js/plupload',
      'pluploadVideo' : '@/assets/js/pluploadVideo',
      'pluploadMore' : '@/assets/js/pluploadMore',
      'pluploadMore1' : '@/assets/js/pluploadMore1',
      'pluploadMore2' : '@/assets/js/pluploadMore2',
      'pluploadMore3' : '@/assets/js/pluploadMore3',
      'cardtype' : '@/assets/js/cardtype',
      'vue$': 'vue/dist/vue.esm.js',
      
      'components': path.resolve(__dirname, '../src/components'),
      //'jquery': path.resolve(__dirname, '../src/assets/js/jquery.min.js'),
      'jquery': 'jquery'
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /vue-preview.src.*?js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
