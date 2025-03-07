"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, CameraShake, CameraControls, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import Particles from "../Particles/Particles";
import { useEffect, useLayoutEffect, useRef, useMemo, useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WebGLSphere() {
  return (
    <Canvas linear={true} camera={{ position: [0, 0, 6], fov: 26 }}>
      <WebGLSphereMain />
    </Canvas>
  );
}

function WebGLSphereMain() {
  const propsProd = useMemo(
    () => ({
      focus: 5.7,
      speed: 35,
      aperture: 9.3,
      fov: 190,
      curl: 0.19,
      size: 512,
    }),
    []
  );

  const controlsHook = useThree((state) => state.camera);
  const controls = useRef();
  const [zRef, setZRef] = useState({
    z: 6.3,
    y: 0,
    zEnd: 7.3,
  });
  const particleSize = useCallback((e) => {
    if (e.target.innerWidth < 600) {
      setZRef((prev) => ({ ...prev, z: 10, zEnd: 11 }));
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setZRef((prev) => ({ ...prev, z: 10, zEnd: 11 }));
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", particleSize);
    return () => window.removeEventListener("resize", particleSize);
  }, [particleSize]);

  useFrame(() => {
    controlsHook.position.set(0, zRef.y, zRef.z);
  });

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(zRef, {
        z: zRef.zEnd,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".topsection",
          start: "5% top",
          end: "30% top",
          scrub: true,
        },
      });
    },
    { dependencies: [zRef] }
  );

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
