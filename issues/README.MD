# ISSUE

- 页面被顶上去后不会自动下来

```js
const scrollTop =
  document.documentElement.scrollTop || document.body.scrollTop || 0
window.scrollTo(0, Math.max(scrollTop - 1, 0))
```

- [map 与 parseInt 的陷阱](../doc/issues/map与parseInt的陷阱.md)

- 提取远程 JSON 文件的数据

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
