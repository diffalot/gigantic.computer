import React from "react";
import { Canvas, useFrame } from "react-three-fiber";

import Box from "./Box";

function navigateTo(destination) {
  return () => {
    setTimeout(() => {
      window.location = destination;
    }, 300);
  };
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} onClick={navigateTo("http://diff.mx")} />
      <Box
        position={[1.2, 0, 0]}
        onClick={navigateTo("http://protest.technology")}
      />
    </Canvas>
  );
}
