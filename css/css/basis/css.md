# CSS

## Basis

### lable

| 属性 | 值         | 描述                                |
| ---- | ---------- | ----------------------------------- |
| for  | element_id | 规定 label 与哪个表单元素绑定       |
| form | form_id    | 规定 label 字段所属的一个或多个表单 |

## margin: auto; [1]

`auto：占用可用空间或 0 px`

> 水平居中

```css
width: 600rpx;
margin: 0 auto;
```

不适用于绝对、固定定位

> 垂直水平居中

```css
width: 280px;
height: 93px;
margin: auto;
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
```

## 元素的边框和内边距会撑开元素

`尺寸向外扩展`

## box-sizing: border-box

`尺寸向内扩展 内边距和边框不再会增加它的宽度`

## float: left

`左浮动`

## clear: left

`清除元素的向左浮动`

## 响应式设计

`@media screen and (min-width:600px) {...}`

[1]: ./isset/margin：auto属性的用法详解.png

- inherit: 关键字指定一个属性应从父元素继承它的值
- initial: 关键字用于设置 CSS 属性为它的默认值
- unset: 如果该属性是默认继承属性，该值等同于 inherit，如果该属性是非继承属性，该值等同于 initial

- 可继承属性和不可继承属性

[https://www.jianshu.com/p/fbfc6c751e34](https://www.jianshu.com/p/fbfc6c751e34)
