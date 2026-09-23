import { gsap } from 'gsap';

/**
 * NEXORA CREATIVE STUDIO — HERO ARCHITECTURAL SHOWCASE
 * Interactive multi-layer picture animation featuring the 4 extracted architectural stages:
 * 1. Precision Blueprint Drafting (Drawing table, compass, technical pens)
 * 2. 3D Parametric CAD Wireframe (Rhino wireframe house & elevation planes)
 * 3. BIM Facade Architecture (Commercial 3D glass building with illuminated signage)
 * 4. Structural Physical Prototyping (Laser-cut timber models, geodesic dome, bridge)
 */

export function initHeroArchitecturalShowcase() {
  const showcase = document.querySelector('.hero-arch-showcase');
  const heroSection = document.getElementById('home');
  if (!showcase || !heroSection) return;

  const objects = showcase.querySelectorAll('.hero-arch-obj-wrap, .hero-arch-card');
  if (!objects.length) return;

  // 1. Idle Floating Oscillations with staggered timing
  objects.forEach((obj, index) => {
    const duration = 4.0 + index * 0.7;
    const yShift = 14 + (index % 2 === 0 ? 6 : -4);
    const rotShift = 2.0 * (index % 2 === 0 ? 1 : -1);

    gsap.to(obj, {
      y: `+=${yShift}`,
      rotation: `+=${rotShift}`,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.35
    });

    // Slow ambient rotation of technical architectural rings
    const ring = obj.querySelector('.hero-obj-ring');
    if (ring) {
      gsap.to(ring, {
        rotation: 360,
        duration: 25 + index * 5,
        repeat: -1,
        ease: 'none'
      });
    }

    // Subtle pulsing of halo glows
    const halo = obj.querySelector('.hero-obj-halo');
    if (halo) {
      gsap.to(halo, {
        scale: 1.2,
        opacity: 0.85,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  });

  // 2. Mouse Parallax & 3D Tilt Physics
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isMoving = false;

  const handleMouseMove = (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX = x * 2; // -1 to 1
    mouseY = y * 2; // -1 to 1

    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateParallax);
    }
  };

  const updateParallax = () => {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    objects.forEach((obj) => {
      const depth = parseFloat(obj.getAttribute('data-depth') || '0.05');
      const tiltFactor = depth * 220;
      const moveFactorX = currentX * depth * 85;
      const moveFactorY = currentY * depth * 75;
      const tiltX = -currentY * tiltFactor;
      const tiltY = currentX * tiltFactor;

      gsap.set(obj, {
        x: moveFactorX,
        y: moveFactorY,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
        overwrite: 'auto'
      });
    });

    // Faint Parallax on Blueprint Grid
    const grid = showcase.querySelector('.hero-blueprint-grid');
    if (grid) {
      gsap.set(grid, {
        x: currentX * 18,
        y: currentY * 18,
        overwrite: 'auto'
      });
    }

    if (Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
      requestAnimationFrame(updateParallax);
    } else {
      isMoving = false;
    }
  };

  if (window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(updateParallax);
      }
    });
  }

  // 3. Object Hover Micro-Interactions
  objects.forEach((obj) => {
    obj.addEventListener('mouseenter', () => {
      gsap.to(obj, {
        scale: 1.08,
        zIndex: 10,
        duration: 0.35,
        ease: 'power2.out'
      });
      const halo = obj.querySelector('.hero-obj-halo');
      if (halo) {
        gsap.to(halo, {
          scale: 1.4,
          opacity: 1,
          duration: 0.35
        });
      }
    });

    obj.addEventListener('mouseleave', () => {
      gsap.to(obj, {
        scale: 1,
        zIndex: 2,
        duration: 0.45,
        ease: 'power2.out'
      });
      const halo = obj.querySelector('.hero-obj-halo');
      if (halo) {
        gsap.to(halo, {
          scale: 1,
          opacity: 0.65,
          duration: 0.45
        });
      }
    });
  });
}
