const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: ["./src/js/index.js", "./src/index.html"],
    
    output: {
        path: resolve(__dirname, '../dev/'),    // 输出到 webpack.build.js 同级的 build/
        filename: "./js/index.js"    // js 输出文件 build/
    },
    
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
            {    // loader 让 webpack 处理图片，并有 base64 功能
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options:{
                            outputPath: './img',    // build/
                            publicPath: './img',    // build/css/styles.css
                            name:'[hash:5].[ext]',
                            limit: 8192
                        }
                    }
                ]
            },
            {    // js 检错功能
                test: /\.js$/,    // 覆盖 .js 文件
                enforce: "pre",    // 预先加载好 jshint-loader
                exclude: /node_modules/,    // 排除掉 node_modules 文件夹下的所有文件
                use: [
                    {
                        loader: "jshint-loader",
                        options: {    // camelcase 已经弃用了
                            // jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
                            // 将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
                            emitErrors: false,
                            
                            // jshint 默认情况下不会打断 webpack 编译
                            //如果你想在 jshint 出现错误时，立刻停止编译, 设置 failOnHint 参数为 true
                            failOnHint: false,
                            esversion: 6
                        }
                    }
                ]
            },
            {    //es6 转 es5
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {loader:"html-loader"}    // 仅仅让热模更新起作用
            }
        ]
    },
    plugins: [    // 将 css 抽出成一个文件，以备 link 进 html
        new ExtractTextPlugin("./css/styles.css"),    // build/
        new HtmlWebpackPlugin({    //
            title: "webpack",    // 网页 <head> <title>的页签名字
            filename: "index.html",    // 生成文件的名字
            template: "./src/index.html"    // 程序员自己的 html
        }),
        new CleanWebpackPlugin("./build", {
            root: resolve(__dirname, "../")    // 修改默认 root 目录 "./" 为 "../"
        }),    // 用来清空 build 文件夹 的插件
        new webpack.HotModuleReplacementPlugin()    // 热模更新 支持插件
    ],
    
    devServer: {    // 以后用的就这么几个配置
        hot: true,    // 模块热更新 (热模替换, 也称 HMR)
        open: true,
        port: 3001,
        compress: true
    }
};
