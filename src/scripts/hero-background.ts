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

export function initHeroBackground(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
  camera.position.z = 1.5;

  // ShaderPlane
  const uniforms = {
    time:      { value: 0 },
    intensity: { value: 0.3 },
    color1:    { value: new THREE.Color('#ede9fe') },
    color2:    { value: new THREE.Color('#ddd6fe') },
  };
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4, 32, 32),
    new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, side: THREE.DoubleSide })
  );
  scene.add(plane);

  // EnergyRings — mêmes paramètres que le composant React d'origine
  const ringConfigs = [
    { radius: 1.2, position: [0.3, -0.2, -0.3] as [number, number, number] },
    { radius: 1.8, position: [-0.2, 0.1, -0.5] as [number, number, number] },
  ];

  const rings = ringConfigs.map(({ radius, position }) => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#c4b5fd'),
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(radius * 0.85, radius, 64),
      mat
    );
    mesh.position.set(...position);
    scene.add(mesh);
    return { mesh, mat };
  });

  const clock = new THREE.Clock();

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  renderer.setAnimationLoop(() => {
    const t = clock.getElapsedTime();
    uniforms.time.value = t * 0.4;
    uniforms.intensity.value = 0.3 + Math.sin(t * 0.8) * 0.05;
    rings.forEach(({ mesh, mat }) => {
      mesh.rotation.z = t * 0.15;
      mat.opacity = 0.04 + Math.sin(t * 1.5) * 0.02;
    });
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
