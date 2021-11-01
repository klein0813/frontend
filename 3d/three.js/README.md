# THREE.JS

Three.js 是基于原生 WebGL 封装运行的三维引擎

## WebGLRenderer

```js
new THREE.WebGLRenderer({
  alpha: true, // 背景透明
  antialias: true, // 抗锯齿
})
```

## [Texture](../../doc/three.js/纹理.md)

- 硬件限制

  - 纹理存在最大尺寸
    - 移动端一般是：4096 \* 4096
    - PC 端一般是：16384 \* 16384
  - IOS 系统安全的纹理个数： 8 个 - 超出则浏览器会崩溃

- [CanvasTexture](../../doc/three.js/纹理.md#CanvasTexture)

## 音频

```js
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener()
camera.add(listener)
// create a global audio source
const sound = new THREE.Audio(listener)
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader()
audioLoader.load(BGM, (buffer) => {
  sound.setBuffer(buffer)
  sound.setLoop(false)
})
```

## OrbitControls

```js
controls = new OrbitControls(camera, renderer.domElement)
//设置控制器的中心点
controls.target.set(0, 5, 0)
// 如果使用animate方法时，将此函数删除
controls.addEventListener('change', render)
// 使动画循环使用时阻尼或自转 意思是否有惯性
controls.enableDamping = true
//动态阻尼系数 就是鼠标拖拽旋转灵敏度
controls.dampingFactor = 0.25
//是否可以缩放
controls.enableZoom = true
//是否自动旋转
controls.autoRotate = false
controls.autoRotateSpeed = 0.5
//设置相机距离原点的最远距离
controls.minDistance = 1
//设置相机距离原点的最远距离
controls.maxDistance = 1000
//是否开启右键拖拽
controls.enablePan = true
```
