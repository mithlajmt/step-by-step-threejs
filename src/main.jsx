import * as THREE from 'three'; // Importing the core THREE.js library for creating 3D scenes
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importing OrbitControls to enable camera interaction
import {Pane} from "tweakpane"

// Creating a new scene
const pane = new Pane (); 
const scene = new THREE.Scene(); // Scene is the space where all objects, cameras, and lights are placed
// scene.background = new THREE.Color("hsl(70, 80%, 90%)")

const geometry = new THREE.BoxGeometry(1,1,1);
const planeGeometry = new THREE.PlaneGeometry(1,1)
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide,

})

const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)
const plainMesh = new THREE.Mesh(planeGeometry, material)
mesh.position.x = 1.5
plainMesh.position.x = -2



// Creating the geometry and material for a cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1,2,2,2); // A simple 1x1x1 cube geometry
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true }); // Red material with a wireframe to see through the shape

// Creating cube meshes with positions
const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial); // Mesh for the left cube
cubeMesh1.position.set(-1.5, 1, 0); // Setting position to the left

// Defining vertices for a 5-sided polygon (pentagon)
const pentagonVertices = new Float32Array([
  0, 1, 0,  // Vertex 1 (top)
  -0.95, 0.31, 0,  // Vertex 2 (top left)
  -0.59, -0.81, 0, // Vertex 3 (bottom left)
  0.59, -0.81, 0,  // Vertex 4 (bottom right)
  0.95, 0.31, 0,   // Vertex 5 (top right)
  0, 1, 0   // Closing the loop back to Vertex 1 to form the shape
]);
const bufferAttribute = new THREE.BufferAttribute(pentagonVertices, 3); // Creating a buffer attribute with 3 components per vertex

// Creating a BufferGeometry for the pentagon shape
const pentagonGeometry = new THREE.BufferGeometry();
pentagonGeometry.setAttribute('position', bufferAttribute); // Setting the position attribute with vertex data

// Creating the mesh for the pentagon
const pentagonMesh = new THREE.Mesh(pentagonGeometry, cubeMaterial); // Using the same material for consistency
pentagonMesh.position.set(0, 0, 0); // Centering the custom shape in the scene

const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial); // Mesh for the right cube
cubeMesh3.position.set(1.5, 1, 0); // Setting position to the right

// Creating a group to hold the meshes
const group = new THREE.Group();
group.add(cubeMesh1); // Adding the left cube to the group
// group.add(pentagonMesh); // Adding the pentagon shape to the group
// group.add(cubeMesh3); // Adding the right cube to the group

// Scaling and positioning the group
group.scale.set(1.5, 1.5, 1.5); // Enlarging the group slightly for better visualization
group.position.z = 0; // Positioning the group on the z-axis

// Adding the group to the scene
// scene.add(group);
scene.add(mesh);
scene.add(mesh2);
scene.add(plainMesh);
scene.fog = new THREE.Fog(0xffffff,1,10)
scene.background = new THREE.Color(0xffffff)
// Adding an axis helper for reference (shows x, y, z axes)
const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper); // Helps visualize the coordinate axes

// Initializing the camera with a perspective view
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10); // Positioning the camera to have a top-down perspective

// Selecting the canvas element (ensure an HTML element <canvas class="threejs"></canvas> exists)
const canvas = document.querySelector('canvas.threejs');

// Initializing the renderer
const renderer = new THREE.WebGLRenderer({ 
  canvas,
  antialias: true // Enabling antialiasing for smoother edges
});
renderer.setSize(window.innerWidth, window.innerHeight); // Setting renderer size to window size
renderer.setPixelRatio(window.devicePixelRatio); // Adjusting pixel ratio for sharper images

// Initializing OrbitControls for interactive camera control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Enabling smooth movement for the controls
controls.dampingFactor = 0.05; // Setting the damping factor

// Resize event listener to adjust the camera and renderer on window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Updating camera aspect ratio
  camera.updateProjectionMatrix(); // Recalculating projection matrix
  renderer.setSize(window.innerWidth, window.innerHeight); // Adjusting renderer size
});

// Render loop function to animate the scene
const renderLoop = () => {  
  mesh2.rotation.y += THREE.MathUtils.degToRad(2); // Rotating the group around the y-axis
  plainMesh.rotation.y += THREE.MathUtils.degToRad(3); // Rotating the group around the y-axis
  mesh.rotation.y += THREE.MathUtils.degToRad(3); // Rotating the group around the y-axis
  controls.update(); // Updating controls for damping
  renderer.render(scene, camera); // Rendering the scene from the perspective of the camera
  window.requestAnimationFrame(renderLoop); // Recursively calling the render loop
};

// Start the render loop
renderLoop();
