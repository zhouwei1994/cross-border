var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
	//页面入口文件配置
  entry: {
    app: './src/main.js'
  },
  //入口文件输出配置
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //其他解决方案
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': 'jquery' 
    }
  },
  resolveLoader: {
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
		    test: /\.s[a|c]ss$/,
	      loader: ["style-loader","css-loader","sass-loader"] // creates style nodes from JS strings
			},
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
      	test: /\.html$/,
    		use: [ {
      	loader: 'html-loader',
      	options: {
        	minimize: true
      	}}]
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
      }
    ]
  },
  plugins:[
  	new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ]
}
