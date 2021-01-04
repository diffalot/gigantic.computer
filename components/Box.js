import ReactDOM from "../web_modules/react-dom.js";
import React, {useRef, useState} from "../web_modules/react.js";
import {Canvas, useFrame} from "../web_modules/react-three-fiber.js";
export default function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  const onClicks = [];
  if (props.onClick)
    onClicks.push(props.onClick);
  onClicks.push(toggleActive);
  return /* @__PURE__ */ React.createElement("mesh", {
    ...props,
    ref: mesh,
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    onClick: () => {
      onClicks.forEach((fn) => {
        fn();
      });
    },
    onPointerOver: (event) => setHover(true),
    onPointerOut: (event) => setHover(false)
  }, /* @__PURE__ */ React.createElement("boxBufferGeometry", {
    args: [1, 1, 1]
  }), /* @__PURE__ */ React.createElement("meshStandardMaterial", {
    color: hovered ? "orange" : "#22bb99"
  }));
}
