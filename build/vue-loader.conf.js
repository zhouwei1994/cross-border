var utils = require('./utils')
var config = require('../config')
//运行环境判断
var isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  scss: 'style-loader!css-loader!sass-loader',
	sass: 'style-loader!css-loader!sass-loader?indentedSyntax'
}
