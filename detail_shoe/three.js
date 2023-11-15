import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// Create a GLTFLoader
const loader = new GLTFLoader();

// Define a variable to track if the 3D model has been loaded
let isModelLoaded = false;

// Define a function to create a Three.js scene
function createScene(containerId, modelPath, cameraPosition, scaleFactor) {
  // Check if the model has already been loaded
  if (isModelLoaded) {
    return;
  }

  // Set the flag to indicate that the model is being loaded
  isModelLoaded = true;

  // Get the container element
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera with adjusted position
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight || 1, 0.01, 1000);
  camera.position.set(0.4, 0.4, cameraPosition);

  // Create a renderer and set its size to match the container
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Create OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Load the GLB model
  loader.load(modelPath, (gltf) => {
    const shoe = gltf.scene;

    shoe.rotation.set(0, Math.PI, 0);
    shoe.scale.set(scaleFactor, scaleFactor, scaleFactor);
    scene.add(shoe);

    // Add ambient light to the scene for general illumination
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1.15;
    scene.add(ambientLight);

    // Define the rotation speed (in radians per frame)
    const rotationSpeed = 0.0035;

    // Render the scene
    let rotationAngle = 0;

    function animate() {
      rotationAngle += rotationSpeed;
      shoe.rotation.y = rotationAngle;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    // Adjust the camera aspect ratio when the container is resized
    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight || 1;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // Start the animation
    animate();

    // Hide the "Click to get the 3D object" text and show the 3D container
    const clickText = document.getElementById('click-text');
    clickText.style.display = 'none';
    container.classList.remove('hide-text');
    container.classList.add('show-3d');
  });
}

const shoesData = [
  { id: 'scene-schoen1', model: '../../glb_bestanden/model2.glb', cameraPosition: 0.1, scaleFactor: 0.1 },
  { id: 'scene-schoen2', model: '../../glb_bestanden/model2_1.glb', cameraPosition: 0.1, scaleFactor: 0.1 },
  { id: 'scene-schoen3', model: '../../glb_bestanden/model2_2.glb', cameraPosition: 0.1, scaleFactor: 0.1 },
  { id: 'scene-schoen4', model: '../../glb_bestanden/basketShoe.glb', cameraPosition: 0.1, scaleFactor: 0.1 },
  { id: 'scene-schoen5', model: '../../glb_bestanden/basketShoe1.glb', cameraPosition: 0.1, scaleFactor: 0.09 },
  { id: 'scene-schoen6', model: '../../glb_bestanden/basketShoe2.glb', cameraPosition: 0.1, scaleFactor: 0.1 },
  { id: 'scene-schoen7', model: '../../glb_bestanden/Nike.glb', cameraPosition: 1, scaleFactor: 2.5},
  { id: 'scene-schoen8', model: '../../glb_bestanden/Nike1.glb', cameraPosition: 1, scaleFactor: 2.5 },
  { id: 'scene-schoen9', model: '../../glb_bestanden/Nike2.glb', cameraPosition: 1, scaleFactor: 2.5 },
  { id: 'scene-schoen10', model: '../../glb_bestanden/Schoen2.glb', cameraPosition: 0.1, scaleFactor: 0.15 },
  { id: 'scene-schoen11', model: '../../glb_bestanden/Schoen2_1.glb', cameraPosition: 0.1, scaleFactor: 0.15 },
  { id: 'scene-schoen12', model: '../../glb_bestanden/Schoen2_2.glb', cameraPosition: 0.1, scaleFactor: 0.15 }
];

// Function to handle click events
function handleShoeClick(shoe) {
  if (!isModelLoaded) {
    createScene(shoe.id, shoe.model, shoe.cameraPosition, shoe.scaleFactor);
  }
  const shoeElement = document.getElementById(shoe.id);
  shoeElement.classList.remove('hide-text');
  shoeElement.classList.add('show-3d');
}

// Add click event listeners for each shoe
shoesData.forEach(shoe => {
  const shoeElement = document.getElementById(shoe.id);
  if (shoeElement) { // Check if the element exists
    shoeElement.addEventListener('click', () => handleShoeClick(shoe));
  }
});
