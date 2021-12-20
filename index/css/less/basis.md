# [概览](https://less.bootcss.com/#概览)

Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言，是一种预编译语言。

[在线转换工具](https://www.winless.org/)

## 变量（Variables）

```
@my-selector: banner;
@two-hundred: 200px;
@property: color;
.@{my-selector} {                          // 作为类名     v1.4.0
    width: calc(@two-hundred / 2 - 100);   // 作为属性值
    height: @two-hundred; 
  &:after {                                // .banner:after
    content: "height=@{two-hundred}";
    @{property}: red;                      // v1.6.0
    background-@{property}: #999;
  }
  &-& {}                                   // .banner-.banner
}
```

## 混合（Mixins）

混合（Mixin）是一种将一组属性从一个规则集包含（或混入）到另一个规则集的方法

```
.div-defined {                       // .div-defined(), div-defined 类不会被编译为样式类
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
  
  .radus {
    border-radus: 30px;
  }
}
.a {
    .div-defined()
}
.b {
    .div-defined > .radus()
}

=>

.div-defined {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.div-defined .radus {
  border-radus: 30px;
}
.a {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.a .radus {
  border-radus: 30px;
}
.b {
  border-radus: 30px;
}
```

> 样式类 加 !important

```
.foo (@bg, @color: #900) {  // ‘,’ 或 ‘;’，.foo (@bg: #f5f5f5;@color: #900)
  background: @bg;
  color: @color;
}
.unimportant {
  .foo(#f5f5f5);
}
.important {
  .foo(#f5f5f5) !important;
}
```
* 命名参数需要在普通参数的后面
* 一个 mixins 可以匹配多个样式函数

> @arguments

```
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}

=>>>>>>>

.big-block {
   box-shadow: 2px 5px 1px #000;
}
```

> Pattern-matching

```
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}

@switch: light;

.class {
  .mixin(@switch; #888);
}
=>>>>>>>>>>>
.class {
  color: #a2a2a2;
  display: block;
}

```


> Recursive Mixins
```
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
```

## Merge

```
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}
=>>>>>>>>>>>>>>>>>>>>
.myclass {
  transform: scale(2) rotate(15deg);
}
```

## 运算（Operations）
算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位

```
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```

## 转义（Escaping）
转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 ~"anything" 或 ~'anything' 形式的内容都将按原样输出，除非 interpolation。

## 函数（Functions）
```
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

## 命名空间和访问符


## 作用域（Scope）

* 混合（mixin）和变量的定义不必在引用之前事先定义
* 同一个域里，混合（mixin）和变量的定义若出现多次，后面的会覆盖前面的

```
{
    @color: red;
    color: @color; // red
    {
        @color: green;
        color: @color: // yellow
        @color: yellow;
    }
}
```

## point 

* unit - 重置单位
  ```
  @width: 20rpx;
  .a {
    width: unit(@width * 100 / 750, vw);
  }
  ```