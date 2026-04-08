import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;

    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(0.15), pow(abs(noise), 2.0) * intensity * 0.4);

    float glow = 1.0 - length(uv - 0.5) * 1.6;
    glow = clamp(pow(glow, 1.5), 0.0, 1.0);

    gl_FragColor = vec4(color, glow * 0.9 + 0.1);
  }
`;

function ShaderPlane() {
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    time:      { value: 0 },
    intensity: { value: 0.6 },
    color1:    { value: new THREE.Color('#0a0806') },
    color2:    { value: new THREE.Color('#1a1510') },
  }), []);

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime * 0.4;
      uniforms.intensity.value = 0.6 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function EnergyRing({ radius = 1, position = [0, 0, -0.5] as [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime * 0.15;
      (mesh.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.85, radius, 64]} />
      <meshBasicMaterial color="#2a2018" transparent opacity={0.05} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 1.5], fov: 75 }}
      gl={{ alpha: true, antialias: false }}
    >
      <ShaderPlane />
      <EnergyRing radius={1.2} position={[0.3, -0.2, -0.3]} />
      <EnergyRing radius={1.8} position={[-0.2, 0.1, -0.5]} />
    </Canvas>
  );
}
