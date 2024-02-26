// ----- 주제: OrbitControls

// Renderer
var canvas = document.querySelector('#three-canvas');
var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Light
var ambientLight = new THREE.AmbientLight('white', 0);
var directionalLight = new THREE.DirectionalLight('white', 0);
directionalLight.position.set(1, 1, 2);
scene.add(ambientLight, directionalLight);

scene.background = new THREE.Color(0xffffff);

// Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.3;

// cubeTextureLoader
var cubeTextureLoader = new THREE.CubeTextureLoader();
var envTex = cubeTextureLoader
  .setPath('/src/Standard-Cube-Map/')
  .load([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png',
  ]);

// Mesh
var gltfLoader = new THREE.GLTFLoader();

gltfLoader.load("./HL940A3.glb", function(gltf) {
  var testMesh = gltf.scene.children[0];
  testMesh.scale.set(2, 2, 2);
  var material1 = new THREE.MeshStandardMaterial({});
  testMesh.material1 = material1;
  scene.add(testMesh);
  updateAllMaterials();
});

var updateAllMaterials = function() {
  scene.traverse(function(child) {
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
var clock = new THREE.Clock();

function draw() {
  var delta = clock.getDelta();
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