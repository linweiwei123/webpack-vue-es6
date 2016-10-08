var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var srcPath = './src/';
var entries = ['index'];

var config = {
    entry: {
    },
    output: {
        path: './build',
        publicPath: '/webpack-vue-es6/build/',
        filename: '[name]-[chunkhash:8].js'
        //filename: '[name].js'
    },
    resolve: {
        root: __dirname,
        alias: {
            'APP': './src/app',
            'COMPONENTS': './src/app/components',
            'VIEW': './src/app/view'
        }
    },
    module: {
        // avoid webpack trying to shim process
        noParse: /es6-promise\.js$/,
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new ExtractTextPlugin('css/custom-[chunkhash:8].css')
    ]
};

entries.forEach(function (name) {
    //处理各个入口的配置
    config.entry[name] = srcPath + '/js/' + name + '.js';
    config.plugins.push(new HtmlWebpackPlugin({
        title: name,
        hash: false,
        cache: true,
        template: srcPath + '/html/' + name + '.html',//html模版配置，inject配置项需配合此项使用
        filename: '/html/' + name + '.html',//输出到指定目录的配置
        chunks: ['common', name],
        inject: 'body'
    }));
});
/*
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common-[chunkhash:8].js',
    chunks: entries
}));
*/
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
} else {
    config.devtool = '#source-map'
}

module.exports = config;