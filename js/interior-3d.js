import * as THREE from 'three';

/**
 * NEXORA CREATIVE STUDIO — ARCHITECTURAL THEME 3D HERO ANIMATION
 * 3D CAD Blueprint Grid, Structural Architectural Facades, Structural Trusses,
 * Elevation Laser Scanner, Blueprint Dimension Nodes & Interactive Perspective Camera
 */

export function initInterior3DAnimation() {
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  // Clear any existing canvas children if re-initialized
  container.innerHTML = '';

  // 1. Scene, Camera, Fog & Renderer Setup
  const scene = new THREE.Scene();
  // Deep warm dark obsidian fog for seamless blending with Macaroon theme background
  scene.fog = new THREE.FogExp2(0x0E0C0A, 0.018);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.8, 10.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.6;
  container.appendChild(renderer.domElement);

  // Responsive Resize Handler
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
     LIGHTING RIG (LUXURY MACAROON PALETTE)
     =================================================================== */
  const ambientLight = new THREE.AmbientLight(0x241d18, 3.2);
  scene.add(ambientLight);

  // Key Macaroon Warm Light
  const keyLight = new THREE.DirectionalLight(0xE5B88A, 2.8);
  keyLight.position.set(6, 12, 8);
  scene.add(keyLight);

  // Soft Cream Fill Light
  const fillLight = new THREE.DirectionalLight(0xF3D7BD, 2.2);
  fillLight.position.set(-8, 6, -4);
  scene.add(fillLight);

  // Interactive Cursor Spotlight (Macaroon Swatch)
  const cursorSpot = new THREE.SpotLight(0xE5B88A, 22);
  cursorSpot.position.set(0, 5, 8);
  cursorSpot.angle = Math.PI / 3;
  cursorSpot.penumbra = 0.8;
  cursorSpot.decay = 1.5;
  cursorSpot.distance = 30;
  scene.add(cursorSpot);

  // Bottom Blueprint Grid Accent Light (Warm Bronze)
  const gridGlowLight = new THREE.PointLight(0xC8905B, 14, 25);
  gridGlowLight.position.set(0, -2.5, 2);
  scene.add(gridGlowLight);

  /* ===================================================================
     ARCHITECTURAL MATERIALS & SHADERS (MACAROON PALETTE)
     =================================================================== */
  // Blueprint CAD Wireframe Lines
  const cyanLineMat = new THREE.LineBasicMaterial({
    color: 0xE5B88A,
    transparent: true,
    opacity: 0.75
  });

  const goldLineMat = new THREE.LineBasicMaterial({
    color: 0xF3D7BD,
    transparent: true,
    opacity: 0.9
  });

  const dimLineMat = new THREE.LineBasicMaterial({
    color: 0xC8905B,
    transparent: true,
    opacity: 0.4
  });

  // Structural Materials
  const glassFacadeMat = new THREE.MeshStandardMaterial({
    color: 0x1a1512,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.24,
    emissive: 0xE5B88A,
    emissiveIntensity: 0.15
  });

  const goldStructureMat = new THREE.MeshStandardMaterial({
    color: 0xE5B88A,
    roughness: 0.2,
    metalness: 0.85,
    emissive: 0xc8905b,
    emissiveIntensity: 0.4
  });

  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x241c16,
    roughness: 0.3,
    metalness: 0.8
  });

  const glowingGoldNodeMat = new THREE.MeshBasicMaterial({ color: 0xF3D7BD });
  const glowingCyanNodeMat = new THREE.MeshBasicMaterial({ color: 0xE5B88A });

  /* ===================================================================
     1. ARCHITECTURAL CAD BLUEPRINT FLOOR GRID
     =================================================================== */
  const gridGroup = new THREE.Group();
  gridGroup.position.set(0, -2.8, -1);
  gridGroup.rotation.x = -Math.PI / 2.4;
  scene.add(gridGroup);

  // Base Grid lines
  const gridHelper = new THREE.GridHelper(30, 40, 0xE5B88A, 0xC8905B);
  if (Array.isArray(gridHelper.material)) {
    gridHelper.material.forEach(m => { m.transparent = true; m.opacity = 0.35; });
  } else {
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
  }
  gridGroup.add(gridHelper);

  // Blueprint Coordinate Crosshair Ticks at key intersections
  const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const gridNodes = [];
  for (let x = -10; x <= 10; x += 2.5) {
    for (let z = -10; z <= 10; z += 2.5) {
      if (Math.abs(x) < 1.5 && Math.abs(z) < 1.5) continue; // Keep center clear
      const nMesh = new THREE.Mesh(nodeGeo, (x + z) % 5 === 0 ? glowingGoldNodeMat : glowingCyanNodeMat);
      nMesh.position.set(x, 0.02, z);
      gridGroup.add(nMesh);
      gridNodes.push({ mesh: nMesh, origY: 0.02, phase: Math.random() * Math.PI * 2 });
    }
  }

  // Scanning Blueprint Laser Line (Moves across grid)
  const scanLineGeo = new THREE.BufferGeometry();
  const scanPositions = new Float32Array([-15, 0.05, 0, 15, 0.05, 0]);
  scanLineGeo.setAttribute('position', new THREE.BufferAttribute(scanPositions, 3));
  const scanLineMat = new THREE.LineBasicMaterial({ color: 0xF3D7BD, transparent: true, opacity: 0.85 });
  const scanLine = new THREE.Line(scanLineGeo, scanLineMat);
  gridGroup.add(scanLine);

  /* ===================================================================
     2. MAIN CENTRAL ARCHITECTURAL STRUCTURE (3D TOWER / FACADE MODEL)
     =================================================================== */
  const archGroup = new THREE.Group();
  archGroup.position.set(0, -2.5, -0.5);
  scene.add(archGroup);

  // Architectural Building Blueprint Wireframe & Glass Slabs
  const towerWidth = 3.6;
  const towerDepth = 2.4;
  const floorHeights = [0.8, 1.8, 2.8, 3.8, 4.6, 5.2];
  const buildingNodes = [];

  // Floor Slabs & Perimeter Wireframe Columns
  floorHeights.forEach((h, idx) => {
    const scale = 1 - idx * 0.08; // Slight tapered architectural cantilever
    const w = towerWidth * scale;
    const d = towerDepth * scale;

    // Glass Floor Plate
    const slabGeo = new THREE.BoxGeometry(w, 0.08, d);
    const slabMesh = new THREE.Mesh(slabGeo, glassFacadeMat);
    slabMesh.position.set(0, h, 0);
    archGroup.add(slabMesh);

    // Wireframe Edges for Slab (CAD Blueprint Lines)
    const slabEdges = new THREE.EdgesGeometry(slabGeo);
    const slabLine = new THREE.LineSegments(slabEdges, idx % 2 === 0 ? cyanLineMat : goldLineMat);
    slabLine.position.set(0, h, 0);
    archGroup.add(slabLine);

    // Corner Columns linking floors
    if (idx > 0) {
      const prevH = floorHeights[idx - 1];
      const prevScale = 1 - (idx - 1) * 0.08;
      const prevW = towerWidth * prevScale;
      const prevD = towerDepth * prevScale;

      const corners = [
        [w / 2, d / 2, prevW / 2, prevD / 2],
        [-w / 2, d / 2, -prevW / 2, prevD / 2],
        [w / 2, -d / 2, prevW / 2, -prevD / 2],
        [-w / 2, -d / 2, -prevW / 2, -prevD / 2]
      ];

      corners.forEach(([cx, cz, pcx, pcz]) => {
        const colGeo = new THREE.BufferGeometry();
        colGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([cx, h, cz, pcx, prevH, pcz]), 3));
        const colLine = new THREE.Line(colGeo, cyanLineMat);
        archGroup.add(colLine);
      });

      // Architectural Diagonal Cross-Bracing Trusses
      const trussGeo = new THREE.BufferGeometry();
      trussGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        -w / 2, h, d / 2, prevW / 2, prevH, prevD / 2,
        w / 2, h, d / 2, -prevW / 2, prevH, prevD / 2
      ]), 3));
      const trussLine = new THREE.LineSegments(trussGeo, dimLineMat);
      archGroup.add(trussLine);
    }

    // Glowing Joint Nodes at Corner Vertices
    [[-w / 2, d / 2], [w / 2, d / 2], [-w / 2, -d / 2], [w / 2, -d / 2]].forEach(([x, z]) => {
      const jNode = new THREE.Mesh(nodeGeo, idx % 2 === 0 ? glowingGoldNodeMat : glowingCyanNodeMat);
      jNode.position.set(x, h, z);
      archGroup.add(jNode);
      buildingNodes.push(jNode);
    });
  });

  // Architectural Central Elevator Core / Solid Frame Pillar
  const coreGeo = new THREE.BoxGeometry(1.2, 5.4, 1.0);
  const coreMesh = new THREE.Mesh(coreGeo, darkSteelMat);
  coreMesh.position.set(0, 2.7, 0);
  archGroup.add(coreMesh);

  const coreEdges = new THREE.EdgesGeometry(coreGeo);
  const coreLines = new THREE.LineSegments(coreEdges, goldLineMat);
  coreLines.position.set(0, 2.7, 0);
  archGroup.add(coreLines);

  // Vertical Laser Scan Ring on Tower
  const scanRingGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 48);
  const scanRingMat = new THREE.MeshBasicMaterial({ color: 0xE5B88A, transparent: true, opacity: 0.9 });
  const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
  scanRing.rotation.x = Math.PI / 2;
  scanRing.position.set(0, 0.5, 0);
  archGroup.add(scanRing);

  /* ===================================================================
     3. FLANKING ARCHITECTURAL STRUCTURES (LEFT & RIGHT)
     =================================================================== */
  // Left Structure: Architectural Louvered Signage Portal Frame
  const leftGroup = new THREE.Group();
  leftGroup.position.set(-4.6, -2.5, -1.2);
  scene.add(leftGroup);

  const portalFrameGeo = new THREE.BoxGeometry(2.0, 3.8, 0.3);
  const portalEdges = new THREE.EdgesGeometry(portalFrameGeo);
  const portalLines = new THREE.LineSegments(portalEdges, goldLineMat);
  portalLines.position.set(0, 1.9, 0);
  leftGroup.add(portalLines);

  // Parametric Slats on Left Frame
  for (let s = 0.4; s < 3.6; s += 0.4) {
    const slatGeo = new THREE.BoxGeometry(1.8, 0.05, 0.2);
    const slatMesh = new THREE.Mesh(slatGeo, glassFacadeMat);
    slatMesh.position.set(0, s, 0);
    slatMesh.rotation.x = 0.3;
    leftGroup.add(slatMesh);
  }

  // Right Structure: Geometric Structural Pavilion / Spatial Truss Frame
  const rightGroup = new THREE.Group();
  rightGroup.position.set(4.8, -2.5, -1.5);
  scene.add(rightGroup);

  const octStructureGeo = new THREE.OctahedronGeometry(1.6, 1);
  const octEdges = new THREE.EdgesGeometry(octStructureGeo);
  const octLines = new THREE.LineSegments(octEdges, cyanLineMat);
  octLines.position.set(0, 2.2, 0);
  rightGroup.add(octLines);

  const innerIcoGeo = new THREE.IcosahedronGeometry(0.8, 0);
  const innerIcoMesh = new THREE.Mesh(innerIcoGeo, goldStructureMat);
  innerIcoMesh.position.set(0, 2.2, 0);
  rightGroup.add(innerIcoMesh);

  /* ===================================================================
     4. FLOATING 3D SIGNAGE EMBLEM & ARCHITECTURAL DIMENSION MARKERS
     =================================================================== */
  // Floating Architectural Diamond (Signage Emblem Motif)
  const emblemGeo = new THREE.OctahedronGeometry(0.7, 0);
  const emblemMesh = new THREE.Mesh(emblemGeo, goldStructureMat);
  emblemMesh.position.set(-2.8, 1.8, 1.0);
  scene.add(emblemMesh);

  const emblemEdges = new THREE.EdgesGeometry(emblemGeo);
  const emblemLines = new THREE.LineSegments(emblemEdges, glowingGoldNodeMat);
  emblemLines.position.set(-2.8, 1.8, 1.0);
  scene.add(emblemLines);

  // Outer Glowing Torus Arc around Emblem
  const arcGeo = new THREE.TorusGeometry(1.1, 0.025, 16, 64);
  const arcMat = new THREE.MeshBasicMaterial({ color: 0xF3D7BD });
  const arcMesh = new THREE.Mesh(arcGeo, arcMat);
  arcMesh.position.set(-2.8, 1.8, 1.0);
  arcMesh.rotation.x = 0.5;
  scene.add(arcMesh);

  /* ===================================================================
     5. AMBIENT BLUEPRINT DUST & COORDINATE PARTICLES
     =================================================================== */
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePos[i * 3] = (Math.random() - 0.5) * 22;
    particlePos[i * 3 + 1] = Math.random() * 10 - 3;
    particlePos[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

  // Custom particle texture canvas for clean circular CAD nodes
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 32;
  pCanvas.height = 32;
  const pCtx = pCanvas.getContext('2d');
  const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  pGrad.addColorStop(0.4, 'rgba(229, 184, 138, 0.85)');
  pGrad.addColorStop(0.8, 'rgba(200, 144, 91, 0.3)');
  pGrad.addColorStop(1, 'rgba(14, 12, 10, 0)');
  pCtx.fillStyle = pGrad;
  pCtx.fillRect(0, 0, 32, 32);

  const pTexture = new THREE.CanvasTexture(pCanvas);

  const particleMat = new THREE.PointsMaterial({
    size: 0.12,
    map: pTexture,
    transparent: true,
    opacity: 0.75,
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

    // Camera perspective orbit (CAD viewport inspection feeling)
    const camX = Math.sin(time * 0.12) * 0.6 + mouseX * 0.8;
    const camY = 1.8 + Math.cos(time * 0.1) * 0.2 - mouseY * 0.4;
    const camZ = 10.5 + Math.sin(time * 0.08) * 0.3;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(mouseX * 0.3, 0.8 - mouseY * 0.2, 0);

    // Update Interactive Cursor Spotlight
    cursorSpot.position.x = mouseX * 6;
    cursorSpot.position.y = 4 - mouseY * 3;

    // 1. Grid Scanning Laser Line Motion
    const scanZ = Math.sin(time * 0.8) * 9;
    scanLine.position.z = scanZ;

    // Pulse Grid Nodes
    gridNodes.forEach(node => {
      node.mesh.position.y = node.origY + Math.sin(time * 2.0 + node.phase) * 0.03;
    });

    // 2. Tower Laser Scan Ring Motion (Sweeps up and down the main architectural tower)
    const towerScanY = 0.5 + (Math.sin(time * 1.2) * 0.5 + 0.5) * 4.8;
    scanRing.position.y = towerScanY;
    scanRing.scale.setScalar(1 + Math.sin(time * 3.0) * 0.04);

    // 3. Subtle Building Micro-Sway & Rotation Parallax
    archGroup.rotation.y = Math.sin(time * 0.15) * 0.05 + mouseX * 0.1;
    leftGroup.rotation.y = time * 0.08;
    rightGroup.rotation.y = -time * 0.1;
    innerIcoMesh.rotation.x += 0.008;
    innerIcoMesh.rotation.y += 0.012;

    // 4. Rotate Floating Signage Emblem & Torus
    emblemMesh.rotation.x += 0.006;
    emblemMesh.rotation.y += 0.01;
    emblemLines.rotation.x += 0.006;
    emblemLines.rotation.y += 0.01;
    emblemMesh.position.y = 1.8 + Math.sin(time * 1.4) * 0.12;
    emblemLines.position.y = 1.8 + Math.sin(time * 1.4) * 0.12;
    arcMesh.position.y = 1.8 + Math.sin(time * 1.4) * 0.12;
    arcMesh.rotation.z = time * 0.3;

    // 5. Ambient Particles Drift
    const pArray = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pArray[i * 3 + 1] += Math.sin(time + i) * 0.002 + 0.0015;
      if (pArray[i * 3 + 1] > 7) pArray[i * 3 + 1] = -3;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    // Dynamic Light Intensity Pulse
    gridGlowLight.intensity = 12 + Math.sin(time * 2.2) * 3;

    renderer.render(scene, camera);
  }

  animate();
}
