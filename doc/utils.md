# Common Method

## Guid

```js
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
```

## Base64 To Blob

```js
function base642Blob(base64Str) {
  const arr = base64Str.split(',')
  const mime = arr[0].match(/:(.\*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
    return new Blob([u8arr], { type: mime })
  }
}
```
