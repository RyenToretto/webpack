const {resolve} = require('path');
const webpack = require('webpack');

const common = require("./webpack.common");    // 1. 引入 webpack.common.js 公共部分
const merge = require("webpack-merge");    // 2. 使用第三方库，合并

module.exports = merge(common, {    // 3. 合并 common 公共部分
    entry: ["./src/js/index.js", "./src/index.html"],
    
    module: {
        rules: [
            {    // dev 环境下使用传统的 loader 处理 css
                test: /\.less$/,
                use: [
                    {loader:"style-loader"},    // 3. html 中建立 <style>，将 js 中 css 放入其中
                    {loader:"css-loader"},    // 2. 将 css 以 commonJS 打包到 js 中
                    {loader:"less-loader"},    // 1. 将 less 转为 css
                ]
            },
            {
                test: /\.(html)$/,
                use: {loader:"html-loader"}    // 仅仅让热模更新起作用
            }
        ]
    },
    plugins: [    // 将 css 抽出成一个文件，以备 link 进 html
        new webpack.HotModuleReplacementPlugin()    // 热模更新 支持插件
    ],
    
    devServer: {    // 以后用的就这么几个配置
        hot: true,    // 模块热更新 (热模替换, 也称 HMR)
        open: true,
        port: 3001,
        compress: true
    }
});
