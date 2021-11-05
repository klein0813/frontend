import { initHelper, onWindowResize, initScene } from './utils.js'

const { renderer, camera, scene } = initScene()
const { stats, controls } = initHelper(dat, camera, renderer, Stats);
window.onresize = onWindowResize(camera, renderer);

function initModel() {
  const geometry = new THREE.CylinderBufferGeometry(6, 6, Math.PI * 3, 16, 4, true, -Math.PI / 2, Math.PI);
  const loader = new THREE.BasisTextureLoader();
  loader.setTranscoderPath('/frontend/threejs/libs/basis/');
  loader.detectSupport(renderer);
  loader.load('/frontend/threejs/textures/uastc.basis', (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    scene.add(new THREE.Mesh(flipY(geometry), material));
  })
}

function animate() {
  stats.update();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function flipY (geometry) {
  const uv = geometry.attributes.uv
  for (let i = 0; i < uv.count; i++) {
    uv.setY(i, 1 - uv.getY(i))
  }
  return geometry
}

function draw() {
  initModel();
  animate();
}

draw()
