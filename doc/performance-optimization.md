# Performance Optimization

## 基础优化

- 尽量少使用全局变量 - 减短作用域链的查找
- 遍历都中方式中，普通的 for 更好

```js
for (let i = 0, len = imageData.length; i < len; i += 4)
```

- 数据访问: 数据链短些

```js
a = data.a
a.d + b
a.d + c
// above better
a = data.a.d
a + b
a + c
```

- 小图片用 base64 替换 - 减少 http 请求
- 减少文件大小，去除注释说明和注释代码
