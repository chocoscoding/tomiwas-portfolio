"use client";
import { useMemo, useRef, useState } from "react";
import { FloatType, RGBAFormat, NearestFilter, ShaderMaterial, MathUtils, Scene, OrthographicCamera } from "three";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import "../../materials/dofPointsMaterial";
import "../../materials/simulationMaterial";

export default function Particles({ speed, fov, aperture, focus, curl, size = 512, ...props }) {
  const renderRef = useRef(null);
  const simRef = useRef(null);

  // Set up FBO
  const [scene] = useState(() => new Scene());
  const [camera] = useState(() => new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1));
  const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]));
  const uvs = useRef(new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]));
  const target = useFBO(size, size, { minFilter: NearestFilter, magFilter: NearestFilter, format: RGBAFormat, type: FloatType });
  // Normalize points
  const particles = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);
  // Update FBO and pointcloud every frame
  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.clear();
    state.gl.render(scene, camera);
    state.gl.setRenderTarget(null);
    if (renderRef?.current && simRef?.current) {
      renderRef.current.uniforms.positions.value = target.texture;
      renderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      renderRef.current.uniforms.uFocus.value = MathUtils.lerp(renderRef.current.uniforms.uFocus.value, focus, 0.1);
      renderRef.current.uniforms.uFov.value = MathUtils.lerp(renderRef.current.uniforms.uFov.value, fov, 0.1);
      renderRef.current.uniforms.uBlur.value = MathUtils.lerp(renderRef.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1);
      simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
      simRef.current.uniforms.uCurlFreq.value = MathUtils.lerp(simRef.current.uniforms.uCurlFreq.value, curl, 0.1);
    }
  });

  return (
    <>
      {/* Simulation goes into a FBO/Off-buffer */}
      {createPortal(
        <mesh>
          <simulationMaterial ref={simRef} />
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            <bufferAttribute attach="attributes-uv" count={uvs.current.length / 2} array={uvs.current} itemSize={2} />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      {/* The result of which is forwarded into a pointcloud via data-texture */}
      <points {...props}>
        <dofPointsMaterial ref={renderRef} />
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
      </points>
    </>
  );
}
