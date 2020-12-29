import {
  PerspectiveCamera,
  DirectionalLight,
  WebGLRenderer,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
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

  const material = new MeshBasicMaterial({ color: 0x44aa88 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  const color = 0xffffff;
  const intensity = 0.5;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  function render(time) {
    time *= 0.001; // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
