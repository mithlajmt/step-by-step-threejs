import * as THREE from 'three'; // This part imports all the exported members from the three module and assigns them to the THREE namespace.
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene(); // Creating a new scene

// Creating the geometry and material for a cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });

// A mesh takes two arguments: it takes geometry and a material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial); // Correctly create a mesh with geometry and material

// console.log(cube); // Logging the cube to verify the mesh is created
console.log(scene); // Logging the scene

// Add the cube to the scene
scene.add(cubeMesh); // Adding the cube mesh directly to the scene

// Initializing the camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
// Field of view of the camera, aspect ratio of the actual scene itself, camera near property which defines the closest visible distance

camera.position.z = 5; // Positioning the camera on the z-axis
scene.add(camera); // Optional: Adding the camera to the scene (not mandatory but okay)

// Selecting the canvas element (ensure your HTML has a <canvas class="threejs"></canvas>)
const canvas = document.querySelector('canvas.threejs');

// Initializing the renderer with the selected canvas
const renderer = new THREE.WebGLRenderer({ canvas });

const controls = new OrbitControls(camera,canvas)//instantiating the controls

renderer.setSize(window.innerWidth, window.innerHeight); // Setting the size of the renderer to match the window size



// Render the scene with the camera
renderer.render(scene, camera); // Render call to display the scene through the camera
