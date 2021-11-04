window.onload = () => {
  gifler('/threejs/textures/happy-girl.gif').animate('canvas#canvas')
  draw()
}

let renderer, camera, scene, stats, controls, texture;

function initScene() {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setClearColor(0xeeeeee);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 36);

  scene = new THREE.Scene();
}

function initHelper() {
  new dat.GUI();
  const helper = new THREE.AxesHelper(50);
  scene.add(helper);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;
  controls.minDistance = 1;
  controls.maxDistance = 2000;
  controls.enablePan = true;

  stats = new Stats();
  document.body.appendChild(stats.dom);
}

function initModel() {
  const geometry = new THREE.CylinderBufferGeometry(4, 4, Math.PI * 4, 16, 4, true, -Math.PI / 2, Math.PI);
  const canvas = document.getElementById('canvas');
  texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({ map: texture });

  scene.add(new THREE.Mesh(geometry, material));
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  stats.update();
  controls.update();
  texture.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function draw() {
  initScene();
  initHelper();
  initModel();
  animate();
  window.onresize = onWindowResize;
}
