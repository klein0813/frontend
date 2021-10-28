# Image

## Resize

```js
function resize(
  src,
  { width = 64, height = 64 },
  { canvas, image, onlyData = true },
) {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('src can not be empty!'))
    }
    const cvs = canvas || document.createElement('canvas')
    const ctx = cvs.getContext('2d')
    const img = image || new Image()
    img.crossOrigin = 'Anonymous'
    img.src = src
    img.onload = function () {
      cvs.width = width
      cvs.height = height
      ctx.drawImage(img, 0, 0, width, height)
      const imageData = ctx.getImageData(0, 0, width, height)
      let info = { imageData }
      if (!onlyData) {
        info['dataUrl'] = cvs.toDataURL()
      }
      resolve(info)
    }
  })
}
```

## URL To Base64

```js
const url2Base64 = async (url) => {
  const suffix = url.split('.').slice(-1)[0]
  const res = await axios.get(url, { responseType: 'arraybuffer' })
  const data = `data:image/${suffix};base64,${btoa(
    new Uint8Array(res).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  )}`
  return data
}
```

## Download By URL

```js
const downloadByUrl = async (url) => {
  let dase64Data
  try {
    dase64Data = await url2Base64(url)
  } catch (err) {
    console.error(err)
    return
  }
  const aElem = document.createElement('a')
  aElem.href = dase64Data
  const imageName = url.split('/').slice(-1)[0]
  aElem.download = imageName
  aElem.click()
}
```
