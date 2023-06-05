const chalk = require('chalk')
const path = require('path')
const port = 8090

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "./",
    // 关闭线上源码
    productionSourceMap: false,
    devServer: {
        port,
        open:true,
        proxy: {
            [process.env.VUE_APP_REQUEST_BASE_API]: {
                target: process.env.VUE_APP_LOCAL_MOCK === 'true' ? `http://localhost:${port}/mock` : process.env.VUE_APP_PROXY_TARGET,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_REQUEST_BASE_API]: process.env.VUE_APP_LOCAL_MOCK === 'true' ? '' : process.env.VUE_APP_REQUEST_BASE_API
                },
                onProxyReq: function (proxyReq) {
                    console.info(chalk.bgBlue('Proxy Web Request'), chalk.green(proxyReq.path))
                }
            },
        }
    },
    chainWebpack: (config) => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icon'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

    },
    configureWebpack: {
        externals: {
          AMap: "AMap",
          AMapUI: "AMapUI"
        }
      }
}