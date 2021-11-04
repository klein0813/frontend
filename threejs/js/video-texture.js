let renderer, camera, scene, stats, controls;

function initScene() {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 36);

  scene = new THREE.Scene();
}

function initModel() {
  const geometry = new THREE.CylinderBufferGeometry(4, 4, Math.PI * 4, 16, 4, true, -Math.PI / 2, Math.PI);
  const video = document.querySelector("#video");
  const texture = new THREE.VideoTexture(video);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({ map: texture });

  scene.add(new THREE.Mesh(geometry, material));
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

//窗口变动触发的函数
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
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
  initScene();
  initHelper();
  initModel();
  animate();
  window.onresize = onWindowResize;
}

draw()
