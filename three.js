import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js' ;
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';


// Create a scene
const scene = new THREE.Scene();
let shoe;
// Create a container div
const container = document.getElementById('scene-container');

// Create a camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 25;

// Create a renderer and set its size to match the container
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother rendering
renderer.setSize(container.clientWidth, container.clientHeight);

// Set the clear color to white
renderer.setClearColor(0xffffff); // White color

// Append the renderer's DOM element to the container
container.appendChild(renderer.domElement);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);


// Create a GLTFLoader
const loader = new GLTFLoader();

// Load a shoe model (replace 'path_to_your_shoe_model.gltf' with the actual file path)
loader.load('./glb_bestanden/finalModel1.glb', (gltf) => {
  shoe = gltf.scene;

  // Position the shoe as needed
  shoe.position.set(0, 0, 0);
  shoe.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed

  // Set the fixed size (e.g., 1 unit) for the shoe
  const fixedSize = 4;
  shoe.scale.set(fixedSize, fixedSize, fixedSize);

  scene.add(shoe);
});

// Add ambient light to the scene for general illumination
const ambientLight = new THREE.AmbientLight(0xffffff); // Use a bright white light
ambientLight.intensity = 1.2;
scene.add(ambientLight);

let rotationAngle = 0;

// Define the rotation speed (in radians per frame)
const rotationSpeed = 0.0035; // Adjust the speed as needed

// Render the scene
function animate() {
  // Increment the rotation angle
  rotationAngle += rotationSpeed;

  // Apply the rotation to the shoe
  if (shoe) {
    shoe.rotation.y = rotationAngle;
  }

  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

// Start the animation
animate();