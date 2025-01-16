"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, CameraShake, CameraControls, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useControls, button } from "leva";
import Particles from "../Particles/Particles";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MathUtils } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WebGLSphere() {
  return (
    <Canvas linear={true} camera={{ position: [0, 0, 6], fov: 26 }}>
      <WebGLSphereMain />
    </Canvas>
  );
}
function WebGLSphereMain() {
  const propsProd = {
    focus: 5.7,
    speed: 35,
    aperture: 5.3,
    fov: 190,
    curl: 0.19,
    size: 512,
  };
  const controlsHook = useThree((state) => state.camera);

  const controls = useRef();
  const zRef = useRef({
    z: 6,
    y: 0,
  });

  useFrame(() => {
    controlsHook.position.set(0, zRef.current.y, zRef.current.z);
  });
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    gsap.to(zRef.current, {
      z: 7,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".topsection",
        start: "5% top",
        end: "30% top",
        scrub: true,
        // pin: ".topsection",
      },
    });
  }, []);

  return (
    <>
      <CameraControls
        ref={controls}
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
    </>
  );
}
