import { initHelper, onWindowResize, initScene } from './utils.js'

let mixer, clip;
const clock = new THREE.Clock()
const { renderer, camera, scene } = initScene()
const { stats, controls } = initHelper(dat, camera, renderer, Stats);
window.onresize = onWindowResize(camera, renderer);

function initModel() {
  const geometry = new THREE.CylinderBufferGeometry(4, 4, Math.PI * 4, 16, 4, true, -Math.PI / 2, Math.PI);
  const texture = new THREE.TextureLoader().load('/frontend/threejs/textures/spriteshg_3.png')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const group = new THREE.Group()
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'Cylinder'; //网格模型1命名
  group.add(mesh)

  // 编辑关键帧

  // 创建名为Box对象的关键帧数据
  const times = [0, 80]; //关键帧时间数组，离散的时间点序列
  const values = [0, 0, 0, 10, 0, 0]; //与时间点对应的值组成的数组
  // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
  const posTrack = new THREE.KeyframeTrack('Cylinder.position', times, values);
  // duration决定了默认的播放时间，一般取所有帧动画的最大时间
  // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
  const duration = 100;
  // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
  clip = new THREE.AnimationClip("default", duration, [posTrack]);
  
  // 播放关键帧
  
  /**
 * 播放编辑好的关键帧数据
 */
  // group作为混合器的参数，可以播放group中所有子对象的帧动画
  mixer = new THREE.AnimationMixer(group);
  // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
  const AnimationAction = mixer.clipAction(clip);
  //通过操作Action设置播放方式
  AnimationAction.timeScale = 20;//默认1，可以调节播放速度
  // AnimationAction.loop = THREE.LoopOnce; //不循环播放
  AnimationAction.play();//开始播放

  scene.add(group);
}

function animate() {
  stats.update();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  mixer.update(clock.getDelta());
}

function draw() {
  initModel();
  animate();
}

draw()

document.getElementById('gltf-btn').addEventListener('click', () => {
  onExportGLTF(scene, { animations: [clip] })
})

document.getElementById('glb-btn').addEventListener('click', () => {
  onExportGLTF(scene, { binary: true })
})

function save(blob, filename) {
  var link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'data.json';
  link.click();
}

function saveString(text, filename) {
  save(new Blob([text], { type: 'text/plain' }), filename);
}

function onExportGLTF(scene3D, option = {}) {
  var exporter = new THREE.GLTFExporter();
  exporter.parse(scene3D, (result)=>{
    const suffix = option.binary ? '.glb' : '.gltf'
    saveString(option.binary ? result : JSON.stringify(result), `model${suffix}`)
  }, option);
}
