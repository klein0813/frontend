# BASIS

## 响应式布局和自适应式布局

> 响应式布局

同一页面在不同屏幕尺寸下有不同的布局，实现不同屏幕分辨率的终端上浏览网页的不同展示方式，缺点是 css 比较重

- 媒体查询
- 百分比布局
- rem 布局
- 视口单位(vw/vh)
- 图片响应式

> 自适应式布局

使网页自适应的显示在不同大小终端设备上，需要开发多套界面来适应不同的终端

> 两者区别

1. 自适应布局通过检测视口分辨率，请求服务层，返回不同的页面；响应式布局通过检测视口分辨率，针对 bu
2. 响应式布局只需要一套界面，自适应式布局需要多套界面

## 浏览器性能优化

1. 从用户角度而言，优化能够让页面加载得更快、对用户的操作响应得更及时，能够给用户提供更为友好的体验。
2. 从服务商角度而言，优化能够减少页面请求数、或者减小请求所占带宽，能够节省可观的资源

- 页面内容优化

  - 减少 http 请求次数
  - 减少 DNS 查询次数 //TODO: 什么是 DNS 查询
  - 避免页面跳转
  - 缓存 ajax
  - 延迟加载（一般用在图片多的页面中，滚动时才加载）
  - 预加载

    - 使用 HTML 标签

      ```html
      <img
        src="http://pic26.nipic.com/20121213/6168183 0044449030002.jpg"
        style="display:none"
      />
      ```

    - 使用 Image 对象

      ```js
      var image = new Image()
      image.src = 'http://pic26.nipic.com/20121213/6168183 004444903000 2.jpg'
      ```

  - 减少 DOM 元素数量
  - 减少 iframe 数量
  - 避免 404

- css 优化

  - 将样式表置顶 （将 CSS 放在 HEAD 中，防止浏览器有可能还未下载和解析到 CSS 就已经开始渲染页面）
  - 避免 css 表达式 // TODO: css 表达式 是什么？
  - 用 link 代替@import
  - 避免使用 filters
  - css 文件合并与压缩

- js 代码优化

  - 将脚本置底（将脚本内容在页面信息内容加载后再加载）
  - 使用外部 javascript 和 css 文件
  - 去除重复脚本，避免重复的资源请求
  - 减少 DOM 访问（修改和访问 DOM 元素会造成页面的重绘和重排，循环对 DOM 操作更是减慢页面加载速度）
  - js 文件合并与压缩

- 图片优化

  - 优化图片大小
  - 尽量使用 css sprite（精灵图也叫雪碧图）
  - 不要在 html 中缩放图片

    ```html
    <img width="100" height="100" src="mycat.jpg" alt="My Cat" />
    <!-- 如果要压缩，可以选择在服务器端压缩，如 aliyun oss 提供了压缩方法 -->
    ```

  - 使用小且可缓存的 favicon.ico

- 减少 Cookie 传输

  Cookie 包含在每次请求和响应中，太大的 Cookie 会严重影响数据传输，因此哪些数据需要写入 Cookie 需要慎重考虑，尽量减少 Cookie 中传输的数据量。

- 浏览器端使用缓存

  CSS、JavaScript、Logo、图标这些静态资源文件更新的频率都比较低，而这些文件又几乎是每次 HTTP 请求都需要的，如果将这些文件缓存在浏览器中，可以极好地改善性能。

  用法：通过设置 HTTP 头中的 Cache-Control 和 Expires 属性，可设定浏览器缓存，缓存时间可以是数天，甚至是数月。

- 服务器端使用压缩

  在服务器端对文件进行压缩，在浏览器对文件解压缩，可有效减少通信传输的数据量。文本文件的压缩率可达 80%以上，因此 HTML、CSS、JavaScript 文件启用 GZip 压缩可达到较好的效果。但是压缩对服务器和浏览器产生一定的压力，在通信带宽良好，而服务器资源不足的情况下要权衡考虑。
