function initScene() {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 36);

  const scene = new THREE.Scene();

  return { renderer, camera, scene };
}

function initHelper(dat, camera, renderer, Stats, scene) {
  new dat.GUI();
  // const helper = new THREE.AxesHelper(50);
  // scene.add(helper);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;
  controls.minDistance = 1;
  controls.maxDistance = 2000;
  controls.enablePan = true;

  const stats = new Stats();
  document.body.appendChild(stats.dom);
  return { stats, controls };
}

//窗口变动触发的函数
function onWindowResize(camera, renderer) {
  return () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export {
  initScene,
  initHelper,
  onWindowResize,
}
