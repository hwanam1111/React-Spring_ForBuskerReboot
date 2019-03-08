var path = require('path');
module.exports = {
    context: path.resolve(__dirname, 'src/main/webapp/WEB-INF/views/jsx'),
    entry: {
        main: './busker_main/MainPage.jsx',
        login: './busker_main/LoginPage.jsx',
        signup: './busker_main/SignupPage.jsx',
        sub: './SubPage.jsx'
    },
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/webapp/resources/js/react/[name].bundle.js'
    },
    mode: 'none',
    module: {
        rules: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env', '@babel/preset-react' ],
                    plugins: [ "@babel/plugin-proposal-class-properties" ]
                }
            }
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        } ]
    },
    resolve: {
        modules: [
            path.join(__dirname, "src/main/webapp/resources"),
            "node_modules"
        ]
    }
};