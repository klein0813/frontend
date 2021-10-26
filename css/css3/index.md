# CSS3

> CSS3 模块

CSS3被拆分为"模块"。旧规范已拆分成小块，还增加了新的。

* 一些最重要CSS3模块如下：
    * 选择器
    * 盒模型
    * 背景和边框
    * 文字特效
    * 2D/3D转换
    * 动画
    * 多列布局
    * 用户界面

> 选择器

* ::selection
    * ::selection选择器匹配元素中被用户选中或处于高亮状态的部分。
    * ::selection只可以应用于少数的CSS属性：color, background, cursor,和outline
    * Firefox 通过其私有属性 ::-moz-selection 支持

> 边框

* border-radius
    * 任何元素均生效
    * 左上角，右上角，右下角，左下角
    * x / y

    ```css
      width: 200px;
      height: 200px;
      border-radius: 100% 0% 0% 0% / 100% 0% 0% 0%; // 四分之一左上圆

      width: 400px;
      height: 200px;
      border-radius: 50% 50% 0% 0% / 100% 100% 0% 0%; // 上半圆
    ```

* box-shadow
    * box-shadow: h-shadow v-shadow blur spread color inset/outset(默认值);

  ```css
    box-shadow: -20px -20px 80px 10px #000;
  ```

* border-image

* box-reflect - 倒影

    * `box-reflect：none | <direction> <offset>? <mask-box-image>?`
    * `<direction> = above | below | left | right`
    * `<offset> = <length> | <percentage>`
    * `<mask-box-image> =  none | <url> | <linear-gradient> | <radial-gradient> | <repeating-linear-gradient> | <repeating-radial-gradient>`
    * 目前，Chrome 和 Safari 支持

    ```css
      .reflect {
        width:950px;
        margin:0 auto;
        -webkit-box-reflect:below 0 -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,.3));
        font:bold 100px/1.231 georgia,sans-serif;
        text-transform:uppercase;
      }
    ```

> 背景

* background-image
    * 可设置多张图片，前面的图片再上，后面的图片在下
    * ` background-image: url(img_flwr.gif), url(paper.gif); `
* background-size
    * `background-size: length|percentage|cover|contain`
    * `cover|contain` 保持宽高比缩放图片
    * `background-size: 80px 60px;` // width, height
* background-origin
    * 背景图像的位置区域
    * 可为 `content-box`, `padding-box(默认值)`, 和 `border-box`
* background-clip
    * 背景绘制区域，超出绘制区域的部分留白，如剪掉了一样，但不会影响 border
    * 可为 `content-box(默认值)`, `padding-box`, 和 `border-box`

> 渐变(Gradients)

* 使`两个或多个`指定的颜色之间显示平稳的过渡
* 类型
    * 线性渐变(Linear Gradients)- 向下/向上/向左/向右/对角方向
    * 径向渐变(Radial Gradients)- 由它们的中心定义
* 方式
    * <a id="linear-gradient">线性渐变</a>
        * `background-image: linear-gradient(direction, color-stop1, color-stop2, ...)`

      ```css
        linear-gradient(to bottom right, rgba(0,0,0,.8), rgba(255,255,255,.1)) // 左上到右下
      ```

        * `background-image: linear-gradient(angle, color-stop1, color-stop2);`

      ```css
        linear-gradient(135deg, rgba(0,0,0,.8), rgba(255,255,255,.1)) //右下到左上
        // 顺时针为正, 逆时针为负
      ```

        * `background-image: repeating-linear-gradient(red, yellow 10%, green 20%);`
            * 重复的渐变．若如上，但不重复，则剩余的 `80%` 的部分均为 `green`

        * 不设置方向时，默认为上到下渐变；角度为0时，为下到上渐变，角度变化为`顺时针`变化

  ```css
    width: 400px;
    height: 200px;
    background-color: #ccc;
    box-shadow: 20px 20px 80px 10px #000;
    background-image: linear-gradient(-45deg, rgba(0,0,0,.8),rgba(255,255,255,.1),rgba(0,0,0,.8));// 等价于 ...0,...50%,...100%
  ```

* 径向渐变
    * `background-image: radial-gradient(shape size at position, start-color, ..., last-color);`
        * start-color, last-color 是必需的
        * shape: circle 或 ellipse(椭圆，默认值)
        * size: closest-side(最近的边), farthest-side(最远的边), closest-corner(最近的角), farthest-corner(最远的角，默认值)

  ```css
    background-image: radial-gradient(circle, red 30%, blue 60%, yellow 100%);

    background-image: radial-gradient(closest-side at 60% 55%, red, yellow, black); // 默认的 position 是 50%, 50%(即圆心)
  ```

    * `background-image: repeating-radial-gradient(red, yellow 10%, green 15%);`
        * 重复的渐变

  > 文本效果

    * text-shadow
    * box-shadow
        * 可以在 ::before 和 ::after 两个伪元素中添加阴影效果
    * text-overflow
        * 指定应向用户如何显示溢出内容
        * `clip`(修剪文本)|`ellipsis`(省略符号来代表被修剪的文本)|`string`(使用给定的字符串来代表被修剪的文本, 只在 Firefox 浏览器下有效)

    ```css
      white-space: nowrap;       // 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止
      width: 200px;
      border: 1px solid #000000;
      overflow: hidden;
      text-overflow: ellipsis;
    ```

    * word-wrap
        * `normal`(只在允许的断字点换行（浏览器保持默认处理）)|`break-word`(强制文本换行)
    * word-break
        * `normal`|`break-all`|`keep-all`(只能在半角空格或连字符处换行)
    * word-wrap 当前行放不下，转动新行，若新的一行还放不下，则强制文本换行; word-break 当前行放不下，则强制文本换行

> @font-face 规则

  ```css
    @font-face
    {
      font-family: myFirstFont;
      src: url(sansation_bold.woff);
      font-weight:bold;
    }
  ```

> 2D转换和3D转换

* translate() // 平移
* rotate()    // 旋转
* scale()     // 缩放
* skew()      // 倾斜
* matrix()

* transform-origin: x-axis y-axis z-axis;
    * left, center, right, length, %

> 过渡

* transition 简写属性，用于在一个属性中设置四个过渡属性
* transition-property 规定应用过渡的 CSS 属性的名称
* transition-duration 定义过渡效果花费的时间，默认是 0
* transition-timing-function 规定过渡效果的时间曲线，默认是 "ease"
    * transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
    * 匀速/两头慢，中间快/开始慢/结束慢/开始结束慢, ease和ease-in-out的区别是ease-in-out的幅度更大一点
* transition-delay 规定过渡效果何时开始，默认是 0

  ```css
    div
    {
      transition: width 1s linear 2s;
      /* Safari */
      -webkit-transition:width 1s linear 2s;
    }
  ```

> 动画

*

> 多列

* column-count       // 列数
* column-gap         // 列与列间的间隙
* column-rule-style  // 列与列间的边框样式
    * none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset
* column-rule-width  // 两列的边框厚度
* column-rule-color  // 两列的边框颜色
* column-rule        // column-rule-* 所有属性的简写  `column-rule: 1px solid lightblue;`
* column-span        // 跨越所有列
* column-width       // 列的宽度
* columns            // 设置 column-width 和 column-count 的简写

> 用户界面

* resize
    * 指定一个元素是否应该由用户去调整大小
    * none|both|horizontal|vertical;

  ```css
    resize: both;
    overflow: auto; // 超出时的处理
  ```

* box-sizing
    * content-box|border-box|inherit:
* outline-offset    // 对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓

  ```css
    outline:2px solid red;
    outline-offset:15px;
  ```

> CSS3 弹性盒子

*

> 多媒体查询

* CSS3 的多媒体查询继承了 CSS2 多媒体类型的所有思想： 取代了查找设备的类型，CSS3 根据设置自适应显示
