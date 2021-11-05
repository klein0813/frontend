import { initHelper, onWindowResize, initScene } from './utils.js'

window.onload = () => {
  gifler('/frontend/threejs/textures/happy-girl.gif').animate('canvas#canvas')
  draw()
}

let texture;
const { renderer, camera, scene } = initScene()
const { stats, controls } = initHelper(dat, camera, renderer, Stats);
window.onresize = onWindowResize(camera, renderer);

function initModel() {
  const geometry = new THREE.CylinderBufferGeometry(4, 4, Math.PI * 4, 16, 4, true, -Math.PI / 2, Math.PI);
  const canvas = document.getElementById('canvas');
  texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({ map: texture });

  scene.add(new THREE.Mesh(geometry, material));
}

function animate() {
  stats.update();
  controls.update();
  texture.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function draw() {
  initModel();
  animate();
}
