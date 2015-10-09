'use strict';

const path = require('path');
// const autoprefixer = require('autoprefixer');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: './scripts/index.js'
    },
    output: {
        path: path.resolve(__dirname + '/public'),
        filename: 'script.js'
    }/*,
    plugins: [],
    externals: {},
    resolve: {
        modulesDirectories: [
            'node_modules',
            'src/scripts',
            'src/styles'
        ],
        extensions: ['', '.js', '.soy', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: ''
            },
            {
                test: /\.soy?$/,
                loader: 'soy-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?-minimize!postcss!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css?-minimize!postcss'
            }
        ]
    },
    postcss: [autoprefixer({
        browsers: ['last 2 version', 'Opera >= 12', 'ie >= 9'],
        remove: false
    })]*/
};
