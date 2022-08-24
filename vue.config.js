const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // transpileDependencies: true,
  // devServer: {
  //   https: true
  // }
  devServer: {
    // host: 'localhost',
    // port: 8080,
    proxy: {
      '/api': {
        // target: 'http://175.178.195.183:8080', //要跨域的域名
        target: 'http://localhost:3000', //要跨域的域名
        // secure: false, //如果是https接口，如要配置此参数
        changeOrigin: true //允许跨域
        // pathRewrite: {
        //   // 路径重写
        //   '^/api': ''
        // }
      }
    }
  },
  lintOnSave: false
})
