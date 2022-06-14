const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
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
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       sassOptions: {
  //         includePaths: [
  //           path.resolve(__dirname, 'src/core/')
  //         ],
  //         indentedSyntax: true
  //       },
  //       prependData: '@import "~@/assets/scss/main.scss"'
  //     }
  //   }
  // },
  // assetsDir: '@/assets/'
})
