const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理图片
                test: /\.(gif|jpg|jpeg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 0.1 * 1024,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            },
            {
                //处理高版本js
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 9999
        // open: true
    }
}