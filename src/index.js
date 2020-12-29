import {
  PerspectiveCamera,
  DirectionalLight,
  WebGLRenderer,
  Scene,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
} from "three";

function main() {
  const canvas = document.querySelector("#fog");
  const renderer = new WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new MeshPhongMaterial({ color: 0x44dd88 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  const color = 0xffffff;
  const intensity = 1.8;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

  function render(time) {
    time *= 0.001; // convert time to seconds

    resizeCanvasToDisplaySize();

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
