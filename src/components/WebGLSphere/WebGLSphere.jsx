"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, CameraShake } from "@react-three/drei";
import { useControls } from "leva";
import Particles from "../Particles/Particles";

export default function WebGLSphere() {
  //   const props = useControls({
  //     fov2: { value: 26, min: 10, max: 100, step: 1 },
  //     focus: { value: 5.7, min: 3, max: 7, step: 0.01 },
  //     speed: { value: 36, min: 0.1, max: 100, step: 0.1 },
  //     aperture: { value: 5.3, min: 1, max: 5.6, step: 0.1 },
  //     fov: { value: 190, min: 0, max: 200 },
  //     curl: { value: 0.19, min: 0.01, max: 0.5, step: 0.01 },
  //     size: 512,
  //   });
  const propsProd = {
    focus: 5.7,
    speed: 35,
    aperture: 5.3,
    fov: 190,
    curl: 0.19,
    size: 512,
  };
  return (
    <Canvas linear={true} camera={{ position: [0, 0, 6], fov: 26 }}>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.5}
        zoomSpeed={0.1}
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5} maxRoll={0.5} intensity={0.2} />
      <Particles {...propsProd} />
    </Canvas>
  );
}
