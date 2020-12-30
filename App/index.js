import ReactDOM from "../web_modules/react-dom.js";
import React, {useRef, useState} from "../web_modules/react.js";
import {Canvas, useFrame} from "../web_modules/react-three-fiber.js";
function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return /* @__PURE__ */ React.createElement("mesh", {
    ...props,
    ref: mesh,
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    onClick: (event) => setActive(!active),
    onPointerOver: (event) => setHover(true),
    onPointerOut: (event) => setHover(false)
  }, /* @__PURE__ */ React.createElement("boxBufferGeometry", {
    args: [1, 1, 1]
  }), /* @__PURE__ */ React.createElement("meshStandardMaterial", {
    color: hovered ? "orange" : "#22bb99"
  }));
}
export default function Component() {
  return /* @__PURE__ */ React.createElement(Canvas, null, /* @__PURE__ */ React.createElement("ambientLight", null), /* @__PURE__ */ React.createElement("pointLight", {
    position: [10, 10, 10]
  }), /* @__PURE__ */ React.createElement(Box, {
    position: [-1.2, 0, 0]
  }), /* @__PURE__ */ React.createElement(Box, {
    position: [1.2, 0, 0]
  }));
}
