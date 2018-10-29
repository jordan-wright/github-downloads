const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'index.js'),
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.js'],
    }
};