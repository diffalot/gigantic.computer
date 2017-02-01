require('../style.css')

var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)

// MatCap-style image rendered on a sphere
// modify sphere UVs instead of using a ShaderMaterial

var camera, scene, renderer, controls
var image

init()
animate()

function init () {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 0, 150)
  scene.add(camera) // since light is child of camera

  controls = new OrbitControls(camera)
  controls.minDistance = 75
  controls.maxDistance = 200
  controls.noPan = true

  scene.add(new THREE.AmbientLight(0x222222))

  var light = new THREE.PointLight(0xffffff, 1)
  camera.add(light)

  image = document.createElement('img')
  // image.style.display = 'none'
  document.body.appendChild(image)

  var texture = new THREE.Texture(image)
  image.addEventListener('load', function (event) { texture.needsUpdate = true })

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    ambient: 0xffffff,
    specular: 0x050505,
    shininess: 50,
    map: texture
  })

  var geometry = new THREE.SphereGeometry(30, 32, 16)

  /*
  // modify UVs to accommodate MatCap texture
  var faceVertexUvs = geometry.faceVertexUvs[ 0 ]
  for (var i = 0; i < faceVertexUvs.length; i++) {
    var uvs = faceVertexUvs[ i ]
    var face = geometry.faces[ i ]

    for (var j = 0; j < 3; j++) {
      uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5
      uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5
    }
  }
  */

  var mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

function animate () {
  window.requestAnimationFrame(animate)

  controls.update()

  render()
}

function render () {
  renderer.render(scene, camera)
}

image.src = require('../images/world.jpg')
