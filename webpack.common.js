const path = require('path');
// eslint-disable-next-line import/no-unresolved
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        options: './src/options/options.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/images/',
                    to: 'images/',
                },
                {
                    from: 'src/manifest.json',
                    to: 'manifest.json',
                },
                {
                    from: 'src/options/options.html',
                    to: 'options.html',
                }
            ]
        }),
    ],
};
