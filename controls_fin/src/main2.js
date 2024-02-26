// import * as THREE from './three.module.js';
// import { OrbitControls } from './OrbitControls.js';
// import { GLTFLoader } from './GLTFLoader.js';

// ----- 주제: OrbitControls

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// renderer tone setting
renderer.outputEncoding = THREE.sRGBEncoding;
// tone UP
renderer.toneMapping = THREE.ACESFilmicToneMapping; 

// tone Down
// renderer.toneMapping = THREE.ReinhardToneMapping

// tone setting
renderer.toneMappingExposure = 0.8; 



// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 5); // 카메라 위치 설정
// camera.lookAt(0, 0, 0); // 카메라가 원점을 바라보도록 설정
scene.add(camera);
// camera.fov = 75; // 시야 각도를 더 넓게 조정
// camera.updateProjectionMatrix(); // 변경사항을 적용하기 위해 업데이트


// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
const directionalLight1 = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2); // intensity 값을 높여 더 밝은 빛 설정
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.1); // intensity 값을 높여 더 밝은 빛 설정
// const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.1); // intensity 값을 높여 더 밝은 빛 설정
directionalLight1.castShadow = true; 
directionalLight1.position.set(20, 30, 5); // 방향 설정
directionalLight2.castShadow = true; 
directionalLight2.position.set(1, 5, 1); // 방향 설정
// directionalLight3.castShadow = true; 
// directionalLight3.position.set(0, 5, 0); // 방향 설정
scene.add(ambientLight);
// const ambientLighthelper = new THREE.AmbientLightHelper( ambientLight, 5 );
// const directionalLighthelper1 = new THREE.DirectionalLightHelper( directionalLight1, 5 );
// const directionalLighthelper2 = new THREE.DirectionalLightHelper( directionalLight2, 5 );
// scene.add(directionalLighthelper1, directionalLighthelper2);


scene.background = new THREE.Color(0xffffff); // 하얀색 배경


// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
controls.zoomSpeed = 1.2; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
controls.panSpeed = 0.8; // 패닝 속도 입니다. 기본값(Float)은 1입니다.
controls.minDistance = 4; // 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
controls.maxDistance = 15; // 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
controls.maxPolarAngle = Math.PI / 2

// cubeTextureLoader
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envTex = cubeTextureLoader
  .setPath('./Standard-Cube-Map/')
  .load([
    // +-순서
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png',
  ]);
scene.background = envTex;

const bgloader = new THREE.TextureLoader();
const bgTexture = bgloader.load('ny.png');
scene.background = bgTexture;


// gltf loader
const gltfLoader = new THREE.GLTFLoader();
const gltfLoader2 = new THREE.GLTFLoader();
const gltfLoader3 = new THREE.GLTFLoader();

gltfLoader.load("./circle-test3.glb", (gltf) => {
  const testMesh = gltf.scene.children[0];
  testMesh.scale.set(1, 1, 1);
  const material1 = new THREE.MeshStandardMaterial({ 
    envMap: envTex 
  });

  // Assign the new material to the testMesh
  testMesh.material1 = material1;
  scene.add(testMesh);

  console.log(testMesh)

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: '#000000', // 빨간색
    metalness: 0.5,
    roughness: 0.2,
    // envMap: envTex
    // 다른 속성들...
  });

  // testMesh.children[2].material = tireMaterial;
  // updateAllMaterials();
});

gltfLoader2.load("./HL940A.glb", (gltf) => {
  const testMesh2 = gltf.scene.children[0];
  testMesh2.scale.set(1, 1, 1);
  testMesh2.position.x = -2;
  const material1 = new THREE.MeshStandardMaterial({ 
    envMap: envTex 
  });

  // Assign the new material to the testMesh2
  testMesh2.material1 = material1;
  scene.add(testMesh2);

  console.log(testMesh2)

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: '#000000', // 빨간색
    metalness: 0.5,
    roughness: 0.2,
    // envMap: envTex
    // 다른 속성들...
  });

  // testMesh.children[2].material = tireMaterial;
  // updateAllMaterials();
});

gltfLoader3.load("./1561.glb", (gltf) => {
  const testMesh3 = gltf.scene.children[0];
  testMesh3.scale.set(0.001, 0.001, 0.001);
  testMesh3.position.x = 2;
  const material1 = new THREE.MeshStandardMaterial({ 
    envMap: envTex 
  });

  // Assign the new material to the testMesh3
  testMesh3.material1 = material1;
  scene.add(testMesh3);

  console.log(testMesh3)

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: '#000000', // 빨간색
    metalness: 0.5,
    roughness: 0.2,
    // envMap: envTex
    // 다른 속성들...
  });

  // testMesh.children[2].material = tireMaterial;
  // updateAllMaterials();
});

const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMap = envTex;
      child.material.envMapIntensity = 5;
    }
  });
};

scene.environment = envTex;


// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  //controls.update();

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// 이벤트
window.addEventListener('resize', setSize);

draw();
