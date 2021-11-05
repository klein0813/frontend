const path = require('path');
const glob = require('glob');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './js/index.js',
  // entry: {
  //   'move-texture-animation': './threejs/js/move-texture-animation.js',
  //   'gif-texture': './threejs/js/gif-texture.js',
  // },
  entry: glob.sync("./threejs/js/*.js").reduce((entries, filepath) => {
    const name = path.basename(filepath, '.js')
    return { ...entries, [name]: filepath }
  }, {}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'threejs/js/[name].js',
    clean: true, // 每次构建前清理 /dist 文件夹
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      // 是否将注释剥离到单独的文件中（请参阅详细信息）。 默认情况下，仅剥离 /^\**!|@preserve|@license|@cc_on/i 正则表达式匹配的注释，其余注释会删除。 
      extractComments: false,
    })],
  },
  plugins: [
    // 自动生成html模板
    // new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'threejs/textures'),
          to() { return Promise.resolve("threejs/textures/[name][ext]"); },
        },
        {
          from: "threejs/*.html", // 使用单引号报错，* 会被转义为 ‘*’ 字符
          to() { return Promise.resolve("threejs/[name][ext]"); },
        },
        {
          from: path.resolve(__dirname, 'threejs/libs'),
          to() { return Promise.resolve("threejs/libs"); },
        },
      ],
    }),
  ],
};