"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, CameraShake, CameraControls, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import Particles from "../Particles/Particles";
import { useEffect, useLayoutEffect, useRef, useMemo, useCallback, useState, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WebGLSphere() {
  return (
    <Canvas
      //  fallback={}
      linear={true}
      camera={{ position: [0, 0, 6], fov: 26 }}>
      <SphereMain />
    </Canvas>
  );
}

function WebGLSphereMain() {
  const [propsProd, setPropsProd] = useState({
    focus: 5.7,
    speed: 35,
    aperture: 9.3,
    fov: 190,
    curl: 0.19,
    size: 512,
  });

  // const controlsHook = useThree((state) => state.camera);
  const controls = useRef();
  // const [zRef, setZRef] = useState({
  //   z: 6.1,
  //   y: 0,
  //   zEnd: 7.1,
  // });
  const particleSize = useCallback((e) => {
    // if (e.target.innerWidth < 600) {
    //   setZRef((prev) => ({ ...prev, z: 9, zEnd: 10 }));
    //   propsProd.size = 300;
    // }

    setPropsProd((prev) => ({ ...prev, x: 100 }));
  }, []);

  useEffect(() => {
    particleSize();

    window.addEventListener("resize", particleSize);
    return () => window.removeEventListener("resize", particleSize);
  }, []);

  // useFrame(() => {
  //   controlsHook.position.set(0, zRef.y, zRef.z);
  // });

  // useGSAP(
  //   () => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     gsap.to(zRef, {
  //       z: zRef.zEnd,
  //       ease: "power4.inOut",
  //       scrollTrigger: {
  //         trigger: ".topsection",
  //         start: "5% top",
  //         end: "30% top",
  //         scrub: true,
  //       },
  //     });
  //   },
  //   { dependencies: [zRef] }
  // );

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

const SphereMain = memo(WebGLSphereMain);
