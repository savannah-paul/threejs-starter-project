import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const clock = new THREE.Clock()
// Sizes
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}
// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.z = 3
scene.add(camera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableZoom = true;
controls.enableDamping = true
// Canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
// Keyboard movement controls sphere
var xSpeed = 0.01;
var ySpeed = 0.01;
document.addEventListener("keydown", (event)=>{
    var keyCode = event.which;
    if (keyCode == 87) {
        sphereMesh.position.y += ySpeed;
    } else if (keyCode == 83) {
        sphereMesh.position.y -= ySpeed;
    } else if (keyCode == 65) {
        sphereMesh.position.x -= xSpeed;
    } else if (keyCode == 68) {
        sphereMesh.position.x += xSpeed;
    } else if (keyCode == 32) {
        sphereMesh.position.set(0, 0, 0);
    }
});
// Renderer gets updated each time window is resized
window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

});

// Set up objects
const planeGeometry = new THREE.PlaneGeometry( 4, 4 );
const purpleMaterial = new THREE.MeshBasicMaterial( {color: 0x5d328f, side: THREE.DoubleSide} );
const planeMesh = new THREE.Mesh( planeGeometry, purpleMaterial );
planeMesh.rotateX(90);
scene.add(planeMesh);
const geometry = new THREE.BoxGeometry(1,1,1)
const geometry2 = new THREE.DodecahedronGeometry(0.5,3)
const textureLoader = new THREE.TextureLoader()
const myTexture = textureLoader.load('coolTex.jpg')
const material = new THREE.MeshBasicMaterial({
    map: myTexture
})
const boxMesh = new THREE.Mesh(geometry,material)
const sphereMesh = new THREE.Mesh(geometry2,material)
scene.add(boxMesh)
scene.add(sphereMesh)
boxMesh.position.x = 0
boxMesh.position.y = 0.8
sphereMesh.position.x = -1.6
sphereMesh.position.y = 0.5
geometry.center()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    boxMesh.rotateX(30*0.0003)
    boxMesh.rotateY(30*0.0003)
    // mesh.position.y = Math.sin(elapsedTime) *0.1
    boxMesh.position.z = Math.sin(elapsedTime) * 1

    controls.update()
    controls.enableDamping = true
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
};

// Run scene
tick()
