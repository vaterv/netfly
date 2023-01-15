const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // // 前端跨域代理
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://150.158.191.133:8080',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         },
    //         '/': {
    //             target: 'http://150.158.191.133:8080',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/': ''
    //             }
    //         },
    //     }
    // }

    // //部署应用时的基本 URL
    // publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    // 输出文件目录：在npm run build时，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    // outputDir: 'dist',
    devServer: {
        // port: 8080,
        // open: true, // 自动打开浏览器
        proxy: {
            "/api": {
                // target: 'http://150.158.191.133:8080/fruittimeerp',
                target: 'http://49.234.21.177/fruittimeerp',
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            }
        },
    },
})