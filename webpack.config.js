const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './v/src/main.js',
  output: {
    path: path.resolve(__dirname, './v/dist'),
    filename: 'main.dist.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "电影大全",
      template: path.resolve(__dirname, './v/src/index.html')
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.less$/,
        use:['style-loader','css-loader','less-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}