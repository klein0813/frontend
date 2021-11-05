import { initHelper, onWindowResize, initScene } from './utils.js'

const clock = new THREE.Clock()
const { renderer, camera, scene } = initScene()
camera.position.z = 10;
const { stats, controls } = initHelper(dat, camera, renderer, Stats);
window.onresize = onWindowResize(camera, renderer);

const materials = [];
let xFC; // 行方向移动距离
let yFC; // 列方向移动距离
let materialIndex = 0; // 将展示的材料索引
const spriteInfos = [ // 纹理图信息
  // 第一张纹理图，图片路径，帧列数，帧总数
  { img: '/frontend/threejs/textures/spriteshg_1.png', col: 3, total: 15 },
  { img: '/frontend/threejs/textures/spriteshg_2.png', col: 3, total: 15 },
  { img: '/frontend/threejs/textures/spriteshg_3.png', col: 1, total: 1 },
];
let currentDisplayTime = 0; // 已展示时间
let lastCount = 0; // 上一帧已展示时间
const fps = 0.025; // 1 秒 12 帧

draw();

function initModel () {
  const geometry = new THREE.CylinderBufferGeometry(1, 1, Math.PI * 1, 16, 4, true, -Math.PI / 2, Math.PI);
  geometry.name = 'hg';
  const originMaterial = new THREE.MeshBasicMaterial();
  originMaterial.transparent = true;
  originMaterial.opacity = 0;
  const group = new THREE.Group();

  for (let i = 0, { length } = spriteInfos; i < length; i++) {
    const material = originMaterial.clone();
    const { img, col, total } = spriteInfos[i];
    const texture = new THREE.TextureLoader().load(img);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    const row = Math.ceil(total / col);
    spriteInfos[i]['row'] = row;
    // 设置纹理中帧的大小，1 / 帧列数，1 / 帧行数
    texture.repeat.set(1 / col, i < length ? 1 / row : 1);
    // 设置纹理的第一帧位置
    texture.offset.set(0, i < length ? (row - 1) / row : 1);
    material.map = texture;
    if (i === 0) {
      material.opacity = 1;
      xFC = 0;
      yFC = row - 1;
    }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `ms_${i}`;
    mesh.renderOrder = i;
    materials.push(material);
    group.add(mesh);
  }

  scene.add(group);
}

function render () {
  currentDisplayTime += clock.getDelta() * 1000;
  const curCount = Math.floor(currentDisplayTime * fps);
  if (curCount <= lastCount) {
    return;
  }
  lastCount = curCount;
  
  const { col, row, total } = spriteInfos[materialIndex];

  materials[materialIndex].map.offset.x = xFC++ / col;
  materials[materialIndex].map.offset.y = yFC / row;

  if ((row - yFC - 1) * col + xFC === total) {
    // 已移动到最后一帧
    materials[materialIndex].opacity = 0;
    materialIndex = materialIndex === materials.length - 1 ? 0 : materialIndex + 1;
    xFC = 0;
    yFC = spriteInfos[materialIndex].row - 1;
    materials[materialIndex].opacity = 1;
  } else if (xFC === col) {
    // 移动一行
    xFC = 0;
    yFC--;
  }
}

function animate() {
  stats.update();
  controls.update();
  requestAnimationFrame(animate);

  render();
  renderer.render(scene, camera);
}

function draw() {
  initModel();
  animate();
}
