# ISSUE

## HTML

- [页面被顶上去后不会自动下来](#html1)

```js
const scrollTop =
  document.documentElement.scrollTop || document.body.scrollTop || 0
window.scrollTo(0, Math.max(scrollTop - 1, 0))
```

- [script type="text/template" 的使用](#html2)

  - `type="text/template"` 的 script 标签里的内容不会被执行，也不会显示在页面上
  - 可用于将 js 中的 html 代码抽离

  ```html
  <script type="text/template" id="demo">
    <p>我是script的type为template的用法</p>
  </script>
  <script>
    const appendHtml = document.getElementById('demo').innerHtml
    document.getElementByTagName('body')[0].appendChild(appendHtml)
  </script>
  ```

## JS

- [提取远程 JSON 文件的数据](#js1)

```js
function getTaobaoStoreToken(cb) {
  const url = 'https://config.json'
  const request = new XMLHttpRequest()
  request.open('get', url)
  request.send(null)
  request.onload = () => {
    if (request.status === 200) {
      const json = JSON.parse(request.responseText)
      console.log(json)
      cb(json.taobaoStoreToken)
    }
  }
}
```

- [map 与 parseInt 的陷阱](../doc/issues/map与parseInt的陷阱.md)

## CSS
