import * as THREE from 'three';

/**
 * NEXORA CREATIVE STUDIO — 3D LUXURY INTERIOR DESIGN ANIMATION
 * Real-time Architectural 3D Scene with Slatted Walls, Reception Counter,
 * Glowing 3D Signage, Pendant Lights & Cinematic Flythrough Camera
 */

export function initInterior3DAnimation() {
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0e1422, 0.022);

  const camera = new THREE.PerspectiveCamera(
    48,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.2, 7.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Mouse Interaction
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  const heroSection = document.getElementById('home');

  if (window.matchMedia('(pointer: fine)').matches && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    heroSection.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
    });
  }

  /* ===================================================================
     LIGHTING RIG
     =================================================================== */
  const ambientLight = new THREE.AmbientLight(0x1e2c4c, 2.8);
  scene.add(ambientLight);

  // Warm amber spotlight on main brand feature wall
  const mainSpot = new THREE.SpotLight(0xF59E0B, 10);
  mainSpot.position.set(0, 4.5, 3.5);
  mainSpot.angle = Math.PI / 3.5;
  mainSpot.penumbra = 0.8;
  mainSpot.decay = 2;
  mainSpot.distance = 16;
  scene.add(mainSpot);

  // Cool architectural blue backlight accent
  const blueBackLight = new THREE.PointLight(0x2563EB, 8, 14);
  blueBackLight.position.set(-3.5, 2.5, -1.8);
  scene.add(blueBackLight);

  // Warm counter downlight
  const warmCounterLight = new THREE.PointLight(0xFBBF24, 6, 9);
  warmCounterLight.position.set(0, 1.8, 1.2);
  scene.add(warmCounterLight);

  /* ===================================================================
     ARCHITECTURAL MATERIALS
     =================================================================== */
  const woodSlatMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a5830,
    roughness: 0.5,
    metalness: 0.15
  });

  const wallBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x141b2c,
    roughness: 0.8,
    metalness: 0.12
  });

  const goldMetallicMaterial = new THREE.MeshStandardMaterial({
    color: 0xE8B042,
    roughness: 0.22,
    metalness: 0.95,
    emissive: 0x6a460d,
    emissiveIntensity: 0.35
  });

  const darkMarbleMaterial = new THREE.MeshStandardMaterial({
    color: 0x101624,
    roughness: 0.15,
    metalness: 0.65
  });

  const glowingLedMaterial = new THREE.MeshBasicMaterial({
    color: 0xFBBF24
  });

  const blueGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x3D73FF
  });

  /* ===================================================================
     ARCHITECTURAL GEOMETRY (LUXURY INTERIOR SPACE)
     =================================================================== */
  const interiorGroup = new THREE.Group();
  scene.add(interiorGroup);

  // 1. Polished Marble Floor
  const floorGeo = new THREE.PlaneGeometry(30, 20);
  const floor = new THREE.Mesh(floorGeo, darkMarbleMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.6;
  interiorGroup.add(floor);

  // Floor grid accent lines (Reflective luxury tiles)
  const gridHelper = new THREE.GridHelper(30, 30, 0x1E50D8, 0x182234);
  gridHelper.position.y = -1.59;
  interiorGroup.add(gridHelper);

  // 2. Ceiling with Recessed Light Channels
  const ceilingGeo = new THREE.PlaneGeometry(30, 20);
  const ceiling = new THREE.Mesh(ceilingGeo, wallBaseMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 4.2;
  interiorGroup.add(ceiling);

  // Recessed ceiling LED strip
  const ceilingLedGeo = new THREE.BoxGeometry(16, 0.05, 0.15);
  const ceilingLed = new THREE.Mesh(ceilingLedGeo, glowingLedMaterial);
  ceilingLed.position.set(0, 4.18, 0);
  interiorGroup.add(ceilingLed);

  // 3. Back Feature Wall
  const backWallGeo = new THREE.BoxGeometry(22, 6, 0.2);
  const backWall = new THREE.Mesh(backWallGeo, wallBaseMaterial);
  backWall.position.set(0, 1.3, -2.5);
  interiorGroup.add(backWall);

  // 4. Vertical Fluted Timber Slats on Accent Wall
  const slatCount = 48;
  const slatWidth = 0.08;
  const slatHeight = 4.8;
  const slatDepth = 0.09;
  const slatSpacing = 0.18;
  const startX = -((slatCount * slatSpacing) / 2);

  const slatGeo = new THREE.BoxGeometry(slatWidth, slatHeight, slatDepth);
  for (let i = 0; i < slatCount; i++) {
    const slat = new THREE.Mesh(slatGeo, woodSlatMaterial);
    slat.position.set(startX + i * slatSpacing, 1.4, -2.38);
    interiorGroup.add(slat);
  }

  // Fluted panel bottom warm cove glow strip
  const coveGlowGeo = new THREE.BoxGeometry(slatCount * slatSpacing, 0.04, 0.06);
  const coveGlow = new THREE.Mesh(coveGlowGeo, glowingLedMaterial);
  coveGlow.position.set(0, -0.98, -2.32);
  interiorGroup.add(coveGlow);

  // 5. 3D Architectural Reception Counter Island
  const counterGroup = new THREE.Group();
  counterGroup.position.set(0, -0.7, 0.8);

  // Main counter body with curved profile
  const counterBodyGeo = new THREE.CylinderGeometry(2.4, 2.2, 1.6, 32, 1, false, 0, Math.PI);
  const counterBody = new THREE.Mesh(counterBodyGeo, wallBaseMaterial);
  counterBody.rotation.y = -Math.PI / 2;
  counterGroup.add(counterBody);

  // Fluted panels on the front curved counter
  const counterSlats = 26;
  const cSlatGeo = new THREE.BoxGeometry(0.06, 1.55, 0.05);
  for (let i = 0; i < counterSlats; i++) {
    const angle = (i / (counterSlats - 1)) * Math.PI - Math.PI / 2;
    const radius = 2.42;
    const cSlat = new THREE.Mesh(cSlatGeo, woodSlatMaterial);
    cSlat.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
    cSlat.rotation.y = angle;
    counterGroup.add(cSlat);
  }

  // Countertop Surface (Gold / Titanium trim)
  const topGeo = new THREE.CylinderGeometry(2.52, 2.52, 0.1, 32, 1, false, 0, Math.PI);
  const countertop = new THREE.Mesh(topGeo, goldMetallicMaterial);
  countertop.rotation.y = -Math.PI / 2;
  countertop.position.y = 0.85;
  counterGroup.add(countertop);

  // Under-counter ambient LED illumination strip
  const counterGlowGeo = new THREE.CylinderGeometry(2.44, 2.44, 0.04, 32, 1, false, 0, Math.PI);
  const counterGlow = new THREE.Mesh(counterGlowGeo, glowingLedMaterial);
  counterGlow.rotation.y = -Math.PI / 2;
  counterGlow.position.y = -0.75;
  counterGroup.add(counterGlow);

  interiorGroup.add(counterGroup);

  // 6. 3D Architectural Insignia / Brand Nameplate on Feature Wall
  const signageGroup = new THREE.Group();
  signageGroup.position.set(0, 2.1, -2.25);

  // Brand emblem backdrop plaque
  const plaqueGeo = new THREE.BoxGeometry(4.8, 1.3, 0.08);
  const plaque = new THREE.Mesh(plaqueGeo, new THREE.MeshStandardMaterial({
    color: 0x07090e,
    roughness: 0.4,
    metalness: 0.8
  }));
  signageGroup.add(plaque);

  // Plaque perimeter gold frame
  const frameGeo = new THREE.BoxGeometry(4.9, 1.4, 0.04);
  const frame = new THREE.Mesh(frameGeo, goldMetallicMaterial);
  frame.position.z = -0.02;
  signageGroup.add(frame);

  // 3D Geometric Brand Icon (Stylized N with arrow dynamic geometry)
  const iconBoxGeo = new THREE.BoxGeometry(0.6, 0.6, 0.12);
  const iconMesh = new THREE.Mesh(iconBoxGeo, goldMetallicMaterial);
  iconMesh.position.set(-1.6, 0, 0.08);
  signageGroup.add(iconMesh);

  // Glowing blue accent inside icon
  const innerIconGeo = new THREE.BoxGeometry(0.4, 0.4, 0.14);
  const innerIcon = new THREE.Mesh(innerIconGeo, blueGlowMaterial);
  innerIcon.position.set(-1.6, 0, 0.08);
  signageGroup.add(innerIcon);

  // Dimensional Lettering Blocks simulating "NEXORA CREATIVE STUDIO"
  const letterBlocks = [
    { x: -0.9, w: 0.22, h: 0.45 },
    { x: -0.55, w: 0.22, h: 0.45 },
    { x: -0.2, w: 0.24, h: 0.45 },
    { x: 0.18, w: 0.22, h: 0.45 },
    { x: 0.55, w: 0.22, h: 0.45 },
    { x: 0.92, w: 0.24, h: 0.45 }
  ];

  letterBlocks.forEach(b => {
    const lGeo = new THREE.BoxGeometry(b.w, b.h, 0.1);
    const lMesh = new THREE.Mesh(lGeo, goldMetallicMaterial);
    lMesh.position.set(b.x + 0.3, 0.06, 0.08);
    signageGroup.add(lMesh);
  });

  // Subtitle bar
  const subBarGeo = new THREE.BoxGeometry(2.1, 0.07, 0.06);
  const subBar = new THREE.Mesh(subBarGeo, glowingLedMaterial);
  subBar.position.set(0.45, -0.28, 0.08);
  signageGroup.add(subBar);

  interiorGroup.add(signageGroup);

  // 7. Modern Hanging Pendant Lights
  const pendantPoles = [-2.2, -0.75, 0.75, 2.2];
  const pendants = [];

  pendantPoles.forEach((px, idx) => {
    const pGroup = new THREE.Group();
    pGroup.position.set(px, 3.8, 1.2);

    // Cable cord
    const cordGeo = new THREE.CylinderGeometry(0.008, 0.008, 1.6, 8);
    const cord = new THREE.Mesh(cordGeo, new THREE.MeshBasicMaterial({ color: 0x333333 }));
    cord.position.y = -0.8;
    pGroup.add(cord);

    // Amber glass shade
    const shadeGeo = new THREE.ConeGeometry(0.18, 0.35, 16);
    const shade = new THREE.Mesh(shadeGeo, goldMetallicMaterial);
    shade.position.y = -1.6;
    pGroup.add(shade);

    // Glowing filament bulb
    const bulbGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const bulb = new THREE.Mesh(bulbGeo, glowingLedMaterial);
    bulb.position.y = -1.72;
    pGroup.add(bulb);

    interiorGroup.add(pGroup);
    pendants.push({ group: pGroup, phase: idx * 0.9 });
  });

  // 8. Architectural Floating Dust / Sparkles
  const particleCount = 75;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePos[i] = (Math.random() - 0.5) * 16;
    particlePos[i + 1] = Math.random() * 5 - 1.2;
    particlePos[i + 2] = (Math.random() - 0.5) * 10;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xFBBF24,
    size: 0.055,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  /* ===================================================================
     ANIMATION LOOP (CINEMATIC CAMERA GLIDE & LIGHT PULSE)
     =================================================================== */
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Subtle interactive mouse lerping
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    // Cinematic continuous camera glide through the interior
    const cameraOrbitX = Math.sin(time * 0.22) * 1.35 + mouseX * 0.8;
    const cameraOrbitY = Math.cos(time * 0.18) * 0.35 + 1.2 - mouseY * 0.45;
    const cameraOrbitZ = 7.2 + Math.sin(time * 0.15) * 0.6;

    camera.position.set(cameraOrbitX, cameraOrbitY, cameraOrbitZ);
    camera.lookAt(mouseX * 0.3, 0.8 - mouseY * 0.2, 0);

    // Subtle gentle sway on pendant lights
    pendants.forEach(p => {
      p.group.rotation.z = Math.sin(time * 1.2 + p.phase) * 0.04;
    });

    // Dynamic light pulsing
    warmCounterLight.intensity = 4.2 + Math.sin(time * 1.8) * 0.6;
    blueBackLight.intensity = 5.5 + Math.cos(time * 1.4) * 0.8;

    // Slowly drift particles
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 1; i < particleCount * 3; i += 3) {
      positions[i] += 0.0035;
      if (positions[i] > 4.5) positions[i] = -1.2;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
}
