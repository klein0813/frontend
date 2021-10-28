# Web RTC

## 限制

- 使用需要用户授权
- IOS 14.3 以下不支持，不过可在 safari 浏览器中打开
- 地址需是 `http://localhost 或者 https`

## 使用

### Adapter

```js
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {}
}

if (!navigator.mediaDevices.getUserMedia) {
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  if (!getUserMedia) {
    new Error('getUserMedia not support')
    return
  }
  navigator.mediaDevices.getUserMedia = getUserMedia
}
```

### Video

```js
navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: { facingMode: 'environment' },
  })
  .then((stream) => {
    this.video.addEventListener('loadedmetadata', () => {
      this.video.setAttribute('width', this.video.videoWidth)
      this.video.setAttribute('height', this.video.videoHeight)
      loadedCallback()
    })
    this.video.srcObject = stream
  })
  .catch((err) => {
    console.error('getUserMedia error', err)
    new Error(err)
  })
```
