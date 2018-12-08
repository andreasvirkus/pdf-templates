process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  configureWebpack: {
    devtool: 'cheap-source-map', // 'source-map', // false,
    // Prevent webpack from injecting eval / new Function through global polyfill
    node: {
      global: false
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: false
      })
  }
}
