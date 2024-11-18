import * as THREE from 'three'; // This imports all the exported members from the three module and assigns them to the THREE namespace.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importing the OrbitControls for enabling camera controls

// Creating a new scene
const scene = new THREE.Scene();

// Creating the geometry and material for a cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Defines the dimensions of the cube (width, height, depth)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' }); // Defines the basic material with a red color

// Creating a mesh by combining the geometry and material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial); // Combines geometry and material to create a 3D object (the cube)
scene.add(cubeMesh); // Adding the cube mesh directly to the scene

// Initializing the camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
// Parameters: (field of view, aspect ratio, near clipping plane, far clipping plane)

// Positioning the camera to view the scene from a distance
camera.position.z = 5; // The camera is positioned 5 units away on the z-axis

// Selecting the canvas element (ensure your HTML has a <canvas class="threejs"></canvas>)
const canvas = document.querySelector('canvas.threejs');

// Initializing the renderer with the selected canvas
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight); // Setting the renderer size to match the window size

// Instantiating the OrbitControls to enable user interaction with the scene (e.g., rotating and zooming)
const controls = new OrbitControls(camera, canvas); // Passes the camera and canvas to the controls
controls.enableDamping = true; // Enables smooth damping (inertia), which gives a smoother feel
controls.dampingFactor = 0.05; // Controls the amount of damping

// The render loop function for continuously rendering the scene
const renderloop = () => {
  controls.update(); // Updates the controls to apply damping and other properties
  renderer.render(scene, camera); // Renders the scene from the perspective of the camera
  window.requestAnimationFrame(renderloop); // Recursively calls the render loop for animation
};

// Calling the render loop function to start the animation loop
renderloop();
