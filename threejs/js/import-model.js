import { initHelper, onWindowResize, initScene } from './utils.js'

const TYPE_PATH_MAP = {
  default: '/frontend/threejs/textures/model.gltf',
  gltf: '/frontend/threejs/textures/model.gltf',
  'draco-gltf': '/frontend/threejs/textures/model-separate-draco.gltf',
  glb: '/frontend/threejs/textures/model.glb',
}

const { renderer, camera, scene } = initScene()
const { stats, controls } = initHelper(dat, camera, renderer, Stats);
window.onresize = onWindowResize(camera, renderer);

const loader = new THREE.GLTFLoader();
const doms = document.getElementsByClassName('import-item');
let mixer;

for (let index = 0; index < doms.length; index++) {
  const dom = doms[index]
  const type = dom.dataset.type
  dom.addEventListener('click', () => {
    if (type.includes('draco')) {
      const dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath('/frontend/threejs/libs/draco/');
      loader.setDRACOLoader(dracoLoader);
    }
    loader.load(TYPE_PATH_MAP[type] || TYPE_PATH_MAP.default, (gltf) => {
      gltf.scene.traverse(( child ) => {
        if (child.isMesh) {
          child.material.map.encoding = THREE.LinearEncoding
      }})
      scene.add(gltf.scene);
      mixer = new THREE.AnimationMixer(gltf.scene);
      const animationAction = mixer.clipAction(gltf.animations[0]).play(10);
      animationAction.timeScale = 20
      animate();
    }, undefined, function ( e ) {
      console.error( e );
    });
    dom.parentElement.remove()
  })
}

const clock = new THREE.Clock()
function animate() {
  stats.update();
  controls.update();
  mixer.update(clock.getDelta());
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
