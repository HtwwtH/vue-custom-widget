const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-custom-widget/' : '/',
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.customElement = true
        return options
      })
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/main.scss";'
      }
    }
  }
})
