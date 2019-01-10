const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");    // 4. 引入 webpack, 利用其 API 压缩 js
const CleanCssPlugin = require("less-plugin-clean-css");    // 9. 引入插件，压缩 css
const HtmlWebpackPlugin = require('html-webpack-plugin');    // 12. 引入插件，压缩压缩 html
const common = require("./webpack.common");    // 1. 引入 webpack.common.js 公共部分
const merge = require("webpack-merge");    // 2. 使用第三方库，合并

module.exports = merge(common, {    // 3. 合并 common 公共部分
    output: {
        path: resolve(__dirname, '../dist/'),    // 输出到 webpack.build.js 上一级的 dist
        filename: "./js/[name].[hash:10].js"    // main.72856.js
    },
    
    module: {
        rules: [
            {    // less 编译成 css,
                test: /\.less$/,
                use: ExtractTextPlugin.extract({    // 将 css 抽取成一个文件，并引入 html 文件
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "postcss-loader",    // 8. 前缀兼容
                        {
                            loader:"less-loader",    // 10. 新增 less-loader 配置有压缩 css
                            options:{plugins:[new CleanCssPlugin({advanced: true})]}
                        }
                    ]
                })
            },
        ]
    },
    
    plugins: [    // 将 css 抽出成一个文件，以备 link 进 html
        new ExtractTextPlugin("./css/[name].[hash:10].css"),    // build/
        new CleanWebpackPlugin("./dist", {    // 11. 修改清除文件夹
            root: resolve(__dirname, "../")    // 修改默认 root 目录 "./" 为 "../"
        }),    // 用来清空 build 文件夹 的插件
        new webpack.optimize.UglifyJsPlugin({    // 5. 追加一个插件
            sourceMap: true    // 6. 生成映射文件，开发人员可以查找错误
        }),
        new HtmlWebpackPlugin({    //
            title: "webpack",    // 网页 <head> <title>的页签名字
            filename: "index.html",    // 生成文件的名字
            template: "./src/index.html",    // 程序员自己的 html
            minify:{removeComents:true, collapseWhitespace: true}    // 13. 压缩html
        })    // 用来清空 build 文件夹 的插件
    ],
    
    devtool: 'source-map'    // 7. 新增配置
});
