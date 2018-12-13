const path = require('path')
const PATH = require('./config/path')
const VConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'SRC': PATH.SOURCE_PATH,
        'PAGES': path.resolve(PATH.SOURCE_PATH, './pages'),
        'COMPONENTS': path.resolve(PATH.SOURCE_PATH, './components'),
        'UTILS': path.resolve(PATH.SOURCE_PATH, './utils'),
        'API': path.resolve(PATH.SOURCE_PATH, './api'),
        'OAUTH': path.resolve(PATH.SOURCE_PATH, '../config/OAuth')
      }
    },

    plugins: [
      new VConsolePlugin({
        filter: [],
        enable: process.env.NODE_ENV === 'development'
      })
    ],

    externals: {
      wx: 'wx'
    },
    // ! 当执行内网穿透将内网的 IP 映射到外网时，需配置此项来避免返回 Invalid host header
    devServer: {
      disableHostCheck: true
    }
  }
}
