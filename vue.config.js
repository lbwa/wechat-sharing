const path = require('path')
const PATH = require('./config/path')

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
    }
  }
}
