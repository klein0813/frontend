import { initHelper, onWindowResize, initScene } from './utils.js'

const { renderer, camera, scene } = initScene()
const { stats, controls } = initHelper(dat, camera, renderer, Stats);
window.onresize = onWindowResize(camera, renderer);

function initModel() {
  const geometry = new THREE.CylinderBufferGeometry(4, 4, Math.PI * 4, 16, 4, true, -Math.PI / 2, Math.PI);
  const video = document.querySelector("#video");
  const texture = new THREE.VideoTexture(video);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({ map: texture });

  scene.add(new THREE.Mesh(geometry, material));
}

function animate() {
  stats.update();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function draw() {
  //兼容性判断
  if (!Detector.webgl) Detector.addGetWebGLMessage();
  initModel();
  animate();
}

draw()
