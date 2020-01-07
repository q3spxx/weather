const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyPlugin([
            { from: `${path.resolve(__dirname, 'src')}/assets/images/favicon.png`, to: 'assets/images/favicon.png' },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|jpe?g|gif)$/i,
                loader: 'file-loader',

                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets',
                },
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    },
};
