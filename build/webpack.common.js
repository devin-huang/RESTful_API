const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

// 环境合并配置
const developmentConfig = require('./webpack.dev')
const productionConfig = require('./webpack.prod')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const generateConfig = env => {
  return {
    entry: './index.js',
    output: {
      path: resolve('dist'),
      publicPath: '/',
      filename: env === 'production' ? '[name].js' : '[name].js',
    },
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  }
}


module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env), config)
}