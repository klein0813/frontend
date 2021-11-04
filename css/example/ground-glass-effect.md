# 毛玻璃效果

> backdrop-filter, blur

- 为元素背景添加图形效果（如模糊或颜色偏移）,为了看到效果，必须使元素或其背景至少部分透明

- `backdrop-filter: <filter-function-list>blur(15px);`

  ```css
  backdrop-filter: blur(15px);
  backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);
  ```

> filter, blur

- 滤镜, 函数将高斯模糊应用于输入图像

> 区别

- `filter` 作用于元素， `backdrop-filter` 作用于背景, 当元素的背景不是图片时，`filter: blur()` 无效果(若对其子元素有效果)， 元素背景无透明度时， `backdrop-filter`看不到效果
- `filter` 兼容性较好， `backdrop-filter` 兼容性不好

> 例子

```css
backdrop-filter: blur(10px);

/* => */

filter: blur(10px);
background: url(image.png);
background-color: #fff;
```

> background-image

- 半透明背景 + 模糊图像

```css
background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
  url('');
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>毛玻璃效果</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        background: url('https://staging-statics.maiscrm.com/5ffd72152b12c8345512e7d2/modules/content/o_1ev8q1asbr5c18n19gk345mtn148n0/SP21_NSW_Air_Essence_131.png');
      }
      body {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item {
        position: relative;
        width: auto;
        height: auto;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 5px 1px #fff;
        color: #fff;
        font-size: 15px;
        font-weight: lighter;
        line-height: 35px;
        overflow: hidden;
      }
      .item::before {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: -20px;
        filter: blur(10px);
        background: url('https://staging-statics.maiscrm.com/5ffd72152b12c8345512e7d2/modules/content/o_1ev8q1asbr5c18n19gk345mtn148n0/SP21_NSW_Air_Essence_131.png');
        background-size: 100%;
        background-position-y: center;
      }
    </style>
  </head>
  <body>
    <div class="item">
      <p>
        没有什么比时间更具有说服力了，
        <br />
        因为时间无需通知我们就可以改变一切。
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ——《活着》
        <br />
      </p>
    </div>
  </body>
</html>
```
