import * as THREE from 'three';

/**
 * NEXORA CREATIVE STUDIO — CREATIVE LUXURY ARCHITECTURAL 3D ANIMATION
 * Dynamic Holographic Wave Mesh, Floating 3D Signage Geometry, 
 * Interactive Cursor Spotlight & Glowing Dust Constellation
 */

export function initInterior3DAnimation() {
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  // Clear any existing canvas children if re-initialized
  container.innerHTML = '';

  // 1. Scene, Camera, Renderer Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x131c31, 0.012);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.2, 8);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.85;
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

  // Mouse Interaction Physics State
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
     LIGHTING RIG (BRIGHT & VIBRANT LUXURY GOLD & CYAN ILLUMINATION)
     =================================================================== */
  const ambientLight = new THREE.AmbientLight(0x2d436b, 3.8);
  scene.add(ambientLight);

  // Top Sun/Key Light for high clarity
  const topKeyLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
  topKeyLight.position.set(0, 8, 4);
  scene.add(topKeyLight);

  // Interactive Cursor Spotlight (Warm Amber/Gold)
  const cursorSpot = new THREE.SpotLight(0xF59E0B, 24);
  cursorSpot.position.set(0, 4, 6);
  cursorSpot.angle = Math.PI / 2.8;
  cursorSpot.penumbra = 0.8;
  cursorSpot.decay = 1.6;
  cursorSpot.distance = 28;
  scene.add(cursorSpot);

  // Secondary Sapphire/Cyan Architectural Backlight
  const cyanBackLight = new THREE.PointLight(0x38BDF8, 16, 24);
  cyanBackLight.position.set(-4, 3, -2);
  scene.add(cyanBackLight);

  // Warm Gold Feature Light
  const goldFeatureLight = new THREE.PointLight(0xFBBF24, 15, 22);
  goldFeatureLight.position.set(4, -1, 2);
  scene.add(goldFeatureLight);

  /* ===================================================================
     MATERIALS & TEXTURES
     =================================================================== */
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xFBBF24,
    roughness: 0.12,
    metalness: 0.88,
    emissive: 0x8a5b0f,
    emissiveIntensity: 0.6
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.08,
    metalness: 0.9,
    emissive: 0x0c4a6e,
    emissiveIntensity: 0.4
  });

  const glowingGoldMat = new THREE.MeshBasicMaterial({ color: 0xFDE047 });
  const glowingCyanMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
  const glowingBlueMat = new THREE.MeshBasicMaterial({ color: 0x3B82F6 });

  /* ===================================================================
     1. ARCHITECTURAL UNDULATING WAVE MESH (HOLOGRAPHIC GRID)
     =================================================================== */
  const waveWidth = 24;
  const waveHeight = 16;
  const waveSegmentsW = 48;
  const waveSegmentsH = 32;

  const waveGeo = new THREE.PlaneGeometry(waveWidth, waveHeight, waveSegmentsW, waveSegmentsH);
  const waveMat = new THREE.MeshStandardMaterial({
    color: 0x253b68,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
    roughness: 0.3,
    metalness: 0.85
  });

  const waveMesh = new THREE.Mesh(waveGeo, waveMat);
  waveMesh.rotation.x = -Math.PI / 2.5;
  waveMesh.position.set(0, -2.2, -1);
  scene.add(waveMesh);

  // Store initial vertex positions for smooth wave displacement
  const posAttr = waveGeo.attributes.position;
  const initialPositions = posAttr.array.slice();

  /* ===================================================================
     2. FLOATING 3D SIGNAGE GEOMETRY (LUXURY POLYHEDRA & RINGS)
     =================================================================== */
  const floatingGroup = new THREE.Group();
  scene.add(floatingGroup);

  const floatingElements = [];

  // Floating Gold Icosahedron (Main brand emblem placeholder)
  const icoGeo = new THREE.IcosahedronGeometry(0.85, 0);
  const icoMesh = new THREE.Mesh(icoGeo, goldMaterial);
  icoMesh.position.set(-2.8, 1.4, 0.5);
  floatingGroup.add(icoMesh);
  floatingElements.push({ mesh: icoMesh, rotX: 0.008, rotY: 0.012, baseY: 1.4, phase: 0 });

  // Outer Glowing Ring around Icosahedron
  const ring1Geo = new THREE.TorusGeometry(1.2, 0.025, 16, 64);
  const ring1Mesh = new THREE.Mesh(ring1Geo, glowingGoldMat);
  ring1Mesh.position.set(-2.8, 1.4, 0.5);
  floatingGroup.add(ring1Mesh);
  floatingElements.push({ mesh: ring1Mesh, rotX: -0.015, rotY: 0.006, baseY: 1.4, phase: 0.5 });

  // Floating Cyan Octahedron
  const octGeo = new THREE.OctahedronGeometry(0.65, 0);
  const octMesh = new THREE.Mesh(octGeo, chromeMaterial);
  octMesh.position.set(3.2, 1.8, -0.5);
  floatingGroup.add(octMesh);
  floatingElements.push({ mesh: octMesh, rotX: 0.01, rotY: -0.014, baseY: 1.8, phase: 1.2 });

  // Floating Glowing Torus (Signage Arc)
  const arcGeo = new THREE.TorusGeometry(0.9, 0.035, 16, 48, Math.PI * 1.4);
  const arcMesh = new THREE.Mesh(arcGeo, glowingCyanMat);
  arcMesh.position.set(3.2, 1.8, -0.5);
  floatingGroup.add(arcMesh);
  floatingElements.push({ mesh: arcMesh, rotX: -0.008, rotY: 0.02, baseY: 1.8, phase: 1.8 });

  // Architectural Floating Glass/Gold Blocks (3D Lettering Accents)
  const blockGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const blockPositions = [
    { x: -4.5, y: -0.5, z: 1.2 },
    { x: 4.2, y: -0.8, z: 1.0 },
    { x: -1.2, y: 2.5, z: -1.8 },
    { x: 1.8, y: 2.2, z: -1.5 }
  ];

  blockPositions.forEach((pos, i) => {
    const bMesh = new THREE.Mesh(blockGeo, i % 2 === 0 ? goldMaterial : chromeMaterial);
    bMesh.position.set(pos.x, pos.y, pos.z);
    floatingGroup.add(bMesh);
    floatingElements.push({
      mesh: bMesh,
      rotX: (Math.random() - 0.5) * 0.02,
      rotY: (Math.random() - 0.5) * 0.02,
      baseY: pos.y,
      phase: i * 0.8
    });
  });

  /* ===================================================================
     3. AMBIENT GLOWING DUST PARTICLES & CONSTELLATION
     =================================================================== */
  const particleCount = 130;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleScales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePos[i * 3] = (Math.random() - 0.5) * 20;
    particlePos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particlePos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    particleScales[i] = Math.random() * 0.08 + 0.02;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

  // Custom particle texture canvas for soft circular glow
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 64;
  pCanvas.height = 64;
  const pCtx = pCanvas.getContext('2d');
  const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  pGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.8)');
  pGrad.addColorStop(0.7, 'rgba(30, 80, 216, 0.3)');
  pGrad.addColorStop(1, 'rgba(7, 9, 14, 0)');
  pCtx.fillStyle = pGrad;
  pCtx.fillRect(0, 0, 64, 64);

  const pTexture = new THREE.CanvasTexture(pCanvas);

  const particleMat = new THREE.PointsMaterial({
    size: 0.14,
    map: pTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  /* ===================================================================
     ANIMATION & RENDER LOOP WITH VIEWPORT PAUSING FOR 60FPS SCROLLING
     =================================================================== */
  const clock = new THREE.Clock();
  let isHeroVisible = true;
  let animFrameId = null;

  if ('IntersectionObserver' in window && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible && !animFrameId) {
          clock.start();
          animate();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  function animate() {
    if (!isHeroVisible) {
      animFrameId = null;
      return;
    }
    animFrameId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Smooth mouse lerping physics
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Camera smooth orbit & subtle inertia glide
    const camX = Math.sin(time * 0.18) * 0.8 + mouseX * 0.9;
    const camY = Math.cos(time * 0.15) * 0.3 + 1.2 - mouseY * 0.5;
    const camZ = 8 + Math.sin(time * 0.12) * 0.4;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(mouseX * 0.4, 0.6 - mouseY * 0.3, 0);

    // Update Interactive Cursor Spotlight
    cursorSpot.position.x = mouseX * 5;
    cursorSpot.position.y = 3 - mouseY * 3;

    // Dynamic wave mesh vertex displacement
    const pos = waveGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = initialPositions[i * 3];
      const v = initialPositions[i * 3 + 1];
      const distToMouse = Math.sqrt(Math.pow(u - mouseX * 6, 2) + Math.pow(v - mouseY * 4, 2));
      const mouseImpact = Math.max(0, 1 - distToMouse / 5) * 0.45;

      const zWave = Math.sin(u * 0.4 + time * 1.4) * 0.35 +
                    Math.cos(v * 0.5 + time * 1.2) * 0.35 +
                    mouseImpact;

      pos.setZ(i, zWave);
    }
    pos.needsUpdate = true;

    // Rotate & bob floating 3D geometry
    floatingElements.forEach(elem => {
      elem.mesh.rotation.x += elem.rotX;
      elem.mesh.rotation.y += elem.rotY;
      elem.mesh.position.y = elem.baseY + Math.sin(time * 1.2 + elem.phase) * 0.15;
    });

    // Floating Group Parallax
    floatingGroup.rotation.y = mouseX * 0.12;
    floatingGroup.rotation.x = -mouseY * 0.08;

    // Drift particles & pulse lighting
    const pArray = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pArray[i * 3 + 1] += Math.sin(time + i) * 0.003 + 0.002;
      if (pArray[i * 3 + 1] > 6) pArray[i * 3 + 1] = -5;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    cyanBackLight.intensity = 8 + Math.sin(time * 2.0) * 2.5;
    goldFeatureLight.intensity = 7 + Math.cos(time * 1.8) * 2.0;

    renderer.render(scene, camera);
  }

  animate();
}
