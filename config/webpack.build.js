const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const common = require("./webpack.common");    // 1. 引入 webpack.common.js 公共部分
const merge = require("webpack-merge");    // 2. 使用第三方库，合并

module.exports = merge(common, {    // 3. 合并 common 公共部分
    module: {
        rules: [
            {    // less 编译成 css,
                test: /\.less$/,
                use: ExtractTextPlugin.extract({    // 将 css 抽取成一个文件，并引入 html 文件
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
        ]
    },
    
    plugins: [    // 将 css 抽出成一个文件，以备 link 进 html
        new ExtractTextPlugin("./css/styles.css"),    // build/
        new CleanWebpackPlugin("./build", {
            root: resolve(__dirname, "../")    // 修改默认 root 目录 "./" 为 "../"
        })    // 用来清空 build 文件夹 的插件
    ]
});
