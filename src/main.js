import '../style.css'
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tween } from 'tween';

const COUNT = 5;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0);

const el = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var axesHelper = new THREE.AxesHelper(5);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 6
camera.lookAt(new THREE.Vector3(0, 0, 0));

const light = new THREE.DirectionalLight(0xffffff, 2.0)
light.position.set(0, 10, 10)
light.castShadow = true
light.shadow.mapSize.width = 100
light.shadow.mapSize.height = 100
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})


// Materials
const materials = [];
const card_color_list = [0xcbbce5, 0x5f5d5b, 0xe2d4a7, 0x554762, 0xf29591];
for (let i = 0; i < COUNT; i++) {
	let mat = new THREE.MeshPhongMaterial({
		color: card_color_list[i % card_color_list.length],
		side: THREE.DoubleSide,roughness: 0.5,
		metalness: 0.5,
		reflectivity: 0.5,
		clearCoat: 0.5,
		clearCoatRoughness: 0.5,
		lights: true,
		lightMapIntensity: 1,
		aoMapIntensity: 2,
	 });
	materials.push(mat);
}

// init angle
const radius = 0.1;
const card_angle_list = [];
const start_angle = -72;

for (let i = 0; i < COUNT; i++) {
	card_angle_list[i] = start_angle + i * 180 / COUNT;
}

// Cards
const cards = [];
let pattern_credit
let x = 0;
let y = 0;
let z = 0;

let delta = 3;

new GLTFLoader().load('cards.glb', res => {

	pattern_credit = res.scene;
	scene.add(pattern_credit);
});


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    pattern_credit.rotation.x += 0.01
    pattern_credit.rotation.y += 0.01

    controls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
