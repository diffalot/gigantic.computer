import React from "../web_modules/react.js";
import {Canvas, useFrame} from "../web_modules/react-three-fiber.js";
import Box2 from "./Box.js";
function navigateTo(destination) {
  return () => {
    setTimeout(() => {
      window.location = destination;
    }, 300);
  };
}
export default function App() {
  return /* @__PURE__ */ React.createElement(Canvas, null, /* @__PURE__ */ React.createElement("ambientLight", null), /* @__PURE__ */ React.createElement("pointLight", {
    position: [10, 10, 10]
  }), /* @__PURE__ */ React.createElement(Box2, {
    position: [-1.2, 0, 0],
    onClick: navigateTo("http://diff.mx")
  }), /* @__PURE__ */ React.createElement(Box2, {
    position: [1.2, 0, 0],
    onClick: navigateTo("http://protest.technology")
  }));
}
