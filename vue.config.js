const path = require('path')
//less文件
const myTheme = path.resolve(__dirname, './src/assets/less/vantChange.less')

module.exports = {
  // devServer: {
  //   // 环境配置
  //   host: '0.0.0.0',
  //   public: '172.101.72.56:8081',
  //   port: 8081,
  //   https: false,
  //   hotOnly: false,
  //   disableHostCheck: true,
  //   open: false, // 配置自动启动浏览器
  // },
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        store: '@/store'
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${myTheme}";`,
        },
      },
    },
  },
}
