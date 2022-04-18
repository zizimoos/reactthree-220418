import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { Physics, useBox } from "@react-three/cannon";

function Spin({ children }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return <group ref={ref}>{children}</group>;
}

function Cube(props) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scale, color } = useSpring({
    scale: hovered ? [1, 1, 1] : [0.5, 0.5, 0.5],
    color: active ? "hotpink" : "dodgerblue",
  });
  return (
    <a.mesh
      {...props}
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <a.meshStandardMaterial color={color} />
    </a.mesh>
  );
}

function PCube(props) {
  const [ref] = useBox(() => ({ mass: 1, ...props }));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="teal" />
    </mesh>
  );
}

function Plane(props) {
  const [ref] = useBox(() => ({ mass: 0, ...props }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="tomato" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas style={{ width: "600px", height: "600px" }}>
      <ambientLight />
      <pointLight position={[10, 10, 15]} />
      <Spin>
        <Cube position={[1.5, 1, 1]} />
      </Spin>
      <Cube position={[-1.5, 1, 1]} />
      <Cube position={[-1.5, -1, -1]} />
      <Physics>
        <PCube rotation={[-0.4, -10, -5]} />
        <PCube position={[1.5, 1, 1]} />
        <PCube position={[-1.9, 1.1, 1.6]} />
        <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
