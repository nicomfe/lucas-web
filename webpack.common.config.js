var ProvidePlugin = require('webpack').ProvidePlugin;
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './js/app.js'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, {
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.(jpe?g|png|gif)$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        },
        { test: /\.json$/, loader: 'json-loader' }]
    },
    node: {
      console: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    postcss: function() {
        return [autoprefixer];
    },
    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        })
    ],
    resolve: {
        extensions: ['', '.js', '.css'],
        alias: {
            "scrollTo": path.resolve(
                __dirname,
                "node_modules/jquery.scrollto/jquery.scrollTo.min"
            ),
            "waypoints": path.resolve(
                __dirname,
                "node_modules/waypoints/lib/jquery.waypoints.min"
            ),
        }
    }
};
