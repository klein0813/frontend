# WEBPACK

## 3.6.0

### 打包时移除无用的 comments 和 console.log

```js
// webpack.prod.conf.js
new UglifyJsPlugin({
  uglifyOptions: {
    // 打包时移除 comments
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      // 打包时移除 console.log
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log'], //移除console
    },
  },
```

### 打包时不产生 .map 文件

```js
// config/index.js
// 置为 false，不生成 .map 文件
productionSourceMap: true,
```

### 打包时资源采用相对路径

```js
// config/index.js
build: {
  ...
  assetsPublicPath: './',
```

### 添加 favicon

```js
// webpack.prod.conf.js
new HtmlWebpackPlugin({
  ...
  favicon: path.resolve(__dirname, '../static/favicon.ico'),
```

### <span id="workerloader">配置 worker-loader</span>

```js
// webpack.base.conf.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: true,
            name: 'Worker.[hash].js'
          },
        },
```

### 配置图片资源不大于 10000b 时转为 base64

```js
// webpack.base.conf.js
module.exports = {
  module: {
    rules: [
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
```

### 在 js 中引入 less

```js
// webpack.base.conf.js
{
  test: /\.less$/,
  loader: "style-loader!css-loader!less-loader"
},
```

```js
// 目标 js 文件
import '!style-loader!css-loader!less-loader!./ui.less'
```
