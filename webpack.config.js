const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
module.exports = {
    mode: 'production',
    target: 'node',
    entry: ['./main.js', './sass/main.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './public'
    },
    module: {
        rules: [{
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'public/main.css'
        })],
    externals: [nodeExternals()]
}