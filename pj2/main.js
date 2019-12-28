const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff)

const geometry = new THREE.SphereGeometry(1, 20, 20)

const texture = new THREE.TextureLoader().load('./texture/football.png')
texture.matrixAutoUpdate = false

const material = new THREE.MeshBasicMaterial( {map: texture} )
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

const orbitControls = new THREE.OrbitControls(camera, renderer.domElement)
orbitControls.autoRotate = true

camera.position.z = 5

document.body.appendChild(renderer.domElement)


const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}


animate()
