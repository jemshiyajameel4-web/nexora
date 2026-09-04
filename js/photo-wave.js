/**
 * NEXORA CREATIVE STUDIO — 3D S-CURVE SINE WAVE PHOTO RIBBON
 * - Mathematical S-Curve parametric wave path with 3D perspective depth
 * - Dynamic tangent-aligned rotation and z-index depth layering
 * - Smooth auto-glide continuous ribbon flow
 * - Interactive mouse deflection & inertia-driven drag physics
 * - Full-screen photo spotlight viewer modal on click/touch
 */

const PHOTO_WAVE_ITEMS = [
  {
    id: 'wave-1',
    src: 'assets/images/nexora-service-led-signage.jpg',
    title: 'Aeterna Boutique — Halo-Lit 3D Channel Letters',
    category: 'LED Signboards',
    location: 'Panampilly Nagar, Kochi',
    desc: 'Warm golden halo-lit 3D channel letters on charcoal fluted facade with seamless floor-to-ceiling glass display.'
  },
  {
    id: 'wave-2',
    src: 'assets/images/saaveri-gold-letter-signage.jpg',
    title: 'Saaveri Boutique — Gold 3D Titanium Reception',
    category: '3D Letter Name Boards',
    location: 'Panampilly Nagar, Kochi',
    desc: 'High-gloss mirror gold titanium 3D letters on textured architectural stone wall with concealed floating studs.'
  },
  {
    id: 'wave-3',
    src: 'assets/images/nexora-service-corporate-office.jpg',
    title: 'Avant Garde Capital — Executive Lobby Wall',
    category: 'Corporate Workspaces',
    location: 'Infopark, Kakkanad',
    desc: 'Brushed titanium and navy blue layered emblem on acoustic fluted paneling with warm recessed architectural lighting.'
  },
  {
    id: 'wave-4',
    src: 'assets/images/ignite-study-abroad-3d-acrylic.jpg',
    title: 'Ignite Study Abroad — Cobalt Blue 3D Acrylic Identity',
    category: 'Corporate Signage',
    location: 'Ravipuram, Ernakulam',
    desc: 'Precision laser-cut gloss cobalt acrylic letters with matte subtitle typography on shimmering backdrop.'
  },
  {
    id: 'wave-5',
    src: 'assets/images/nexora-service-retail-branding.jpg',
    title: 'Artisan Market — Curved Slat Canopy & 3D Signage',
    category: 'Retail Interior Branding',
    location: 'Kakkanad, Kochi',
    desc: 'Bespoke undulating wood-slat ceiling canopy with illuminated 3D departmental headers and ambient showcase lighting.'
  },
  {
    id: 'wave-6',
    src: 'assets/images/aqes-corporate-signage.jpg',
    title: 'AQES ERP Solutions — Executive Feature Wall',
    category: 'Office & Corporate',
    location: 'Infopark, Kakkanad',
    desc: 'Deep navy 3D layered corporate emblem with brushed titanium finish and clean architectural mounting.'
  },
  {
    id: 'wave-7',
    src: 'assets/images/nexora-service-shopfront-facade.jpg',
    title: 'Archetype Flagship — Multi-Level Facade & Canopy',
    category: 'Architectural Facades',
    location: 'MG Road, Ernakulam',
    desc: 'Contemporary charcoal composite facade with vertical warm timber louvers and luminous cantilever entrance canopy.'
  },
  {
    id: 'wave-8',
    src: 'assets/images/cinema-multiplex-wayfinding.jpg',
    title: 'PVR Multiplex — Wayfinding & Screen Indicator',
    category: 'Wayfinding Systems',
    location: 'Lulu Mall, Edappally',
    desc: 'Anodized aluminum dual-sided directional wayfinding cube with warm LED internal illumination.'
  },
  {
    id: 'wave-9',
    src: 'assets/images/nexora-service-custom-interiors.jpg',
    title: 'Elara Boutique Hotel — Fluted Counter & Brass Trims',
    category: 'Custom Interiors',
    location: 'Fort Kochi, Kerala',
    desc: 'Curved vertical walnut fluted frontage with solid quartz countertop, concealed warm LED underglow, and brass accents.'
  },
  {
    id: 'wave-10',
    src: 'assets/images/ennidam-mind-care-facade.jpg',
    title: 'Ennidam Mind Care — Clinical Architectural Facade',
    category: 'Exterior Facades',
    location: 'Kakkanad, Kochi',
    desc: 'Weather-resistant charcoal ACP exterior cladding with concealed LED backlit 3D letters.'
  },
  {
    id: 'wave-11',
    src: 'assets/images/nexora-service-3d-letters.jpg',
    title: 'Aurora Executive Lobby — 3D Gold Titanium on Slate',
    category: '3D Letter Name Boards',
    location: 'Panampilly Nagar, Kochi',
    desc: 'Architectural textured stone backdrop with brushed gold titanium 3D typography and vertical walnut slats.'
  },
  {
    id: 'wave-12',
    src: 'assets/images/metro-gadgetz-led-signboard.jpg',
    title: 'Metro Gadgetz — The Apple Expert Retail Signage',
    category: 'LED Signage & Retail',
    location: 'Ernakulam, Kerala',
    desc: 'Luminous halo-lit 3D acrylic channel lettering, backlit apple emblem, and warm interior track lighting.'
  },
  {
    id: 'wave-13',
    src: 'assets/images/nexora-service-wayfinding.jpg',
    title: 'Cinema Gallery — Architectural Wayfinding Monolith',
    category: 'Wayfinding Systems',
    location: 'Kochi, Kerala',
    desc: 'Brushed titanium and matte black floor monolith with warm backlit laser typography and directional wayfinding.'
  },
  {
    id: 'wave-14',
    src: 'assets/images/saaveri-reception-counter.jpg',
    title: 'Saaveri Boutique — Fluted Reception Counter',
    category: 'Custom Furniture & Counters',
    location: 'Panampilly Nagar, Kochi',
    desc: 'Curved charcoal fluted paneling with warm brass edge trim and backlit countertop identity.'
  },
  {
    id: 'wave-15',
    src: 'assets/images/nexora-showcase-acrylic-cobalt.jpg',
    title: 'Aurora Design — Laser-Cut Cobalt & Gold 3D Letters',
    category: 'Precision Signage',
    location: 'Ernakulam, Kerala',
    desc: 'Dual-layer mirror gold on deep cobalt blue acrylic lettering with precision beveled edges on acoustic charcoal felt.'
  },
  {
    id: 'wave-16',
    src: 'assets/images/karthika-residence-custom-wooden-nameplate.jpg',
    title: 'Karthika Residence — Laser-Cut Wooden Acrylic Nameplate',
    category: 'Custom 3D Nameplates',
    location: 'Kochi, Kerala',
    desc: 'Custom wood-grain composite plate with architectural house motif, 3D raised white cursive acrylic, and SS standoffs.'
  },
  {
    id: 'wave-17',
    src: 'assets/images/nexora-showcase-glass-manifestation.jpg',
    title: 'The Executive Suite — Geometric Frosted Glazing',
    category: 'Glass Manifestation',
    location: 'Infopark, Kakkanad',
    desc: 'Architectural privacy frosted manifestation films with precision etched linear geometry and bronze hardware.'
  }
];

export function initPhotoWave() {
  const stage = document.getElementById('photo-wave-stage');
  const track = document.getElementById('photo-wave-track');
  if (!stage || !track) return;

  // Duplicate items to create an infinite, seamless cascading trail
  const items = [...PHOTO_WAVE_ITEMS, ...PHOTO_WAVE_ITEMS];
  const totalCards = items.length;

  // Build card DOM elements
  track.innerHTML = items.map((item, idx) => `
    <div class="photo-wave-card" data-index="${idx}" data-id="${item.id}">
      <div class="photo-wave-card-inner">
        <img src="${item.src}" alt="${item.title}" class="photo-wave-img" loading="lazy" />
        <div class="photo-wave-card-overlay">
          <span class="photo-wave-card-tag">${item.category}</span>
          <h4 class="photo-wave-card-title">${item.title}</h4>
          <span class="photo-wave-card-hint">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            Click to View Full
          </span>
        </div>
      </div>
    </div>
  `).join('');

  const cardElements = Array.from(track.querySelectorAll('.photo-wave-card'));
  if (cardElements.length === 0) return;

  // Modal setup
  setupPhotoModal(items);

  // Physics and Animation State
  let progress = 0;
  let targetProgress = 0;
  let isDragging = false;
  let startX = 0;
  let startProgress = 0;
  let velocity = 0;
  let lastX = 0;
  let isHovered = false;
  let mouseXRel = 0; // -1 to 1
  let mouseYRel = 0; // -1 to 1
  let currentMouseDeflect = 0;
  let targetMouseDeflect = 0;
  let isStageVisible = true;
  let animationFrameId = null;

  // Responsive parameters
  function getWaveParams() {
    const width = stage.offsetWidth || window.innerWidth;
    const isMobile = width <= 640;
    const isTablet = width <= 1024 && width > 640;

    return {
      width: width,
      amplitude: isMobile ? 65 : (isTablet ? 95 : 125), // Wave vertical height
      depthAmplitude: isMobile ? 80 : 160,              // 3D Z depth
      spacing: isMobile ? 55 : (isTablet ? 70 : 85),    // Density of cards along the curve
      baseCardWidth: isMobile ? 120 : (isTablet ? 150 : 175),
      baseCardHeight: isMobile ? 150 : (isTablet ? 190 : 225),
      frequency: isMobile ? 1.0 : 1.0,                  // Exactly 1 full S-Curve (crest + trough)
      driftSpeed: isMobile ? 1.35 : 1.85               // Increased speed for dynamic, smooth ribbon motion
    };
  }

  let waveParams = getWaveParams();

  window.addEventListener('resize', () => {
    waveParams = getWaveParams();
  });

  // Track mouse coordinates over the stage for interactive wave deflection
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    mouseXRel = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
    mouseYRel = ((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1;
    targetMouseDeflect = mouseYRel * 35;
  });

  stage.addEventListener('mouseleave', () => {
    targetMouseDeflect = 0;
    mouseXRel = 0;
    mouseYRel = 0;
  });

  if ('IntersectionObserver' in window && stage) {
    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isStageVisible = entry.isIntersecting;
        if (isStageVisible && !animationFrameId) {
          render();
        }
      });
    }, { threshold: 0.05 });
    stageObserver.observe(stage);
  }

  // Render Loop: Mathematical S-Curve Parametric Calculations
  function render() {
    if (!isStageVisible) {
      animationFrameId = null;
      return;
    }

    if (!isDragging && !isHovered) {
      targetProgress += waveParams.driftSpeed;
    }

    // Smooth inertia interpolation
    progress += (targetProgress - progress) * 0.08;
    currentMouseDeflect += (targetMouseDeflect - currentMouseDeflect) * 0.06;

    const totalWidth = totalCards * waveParams.spacing;
    const stageWidth = waveParams.width;
    const amplitude = waveParams.amplitude;
    const depthAmp = waveParams.depthAmplitude;

    cardElements.forEach((card, i) => {
      // Coordinate along the ribbon in px
      let rawOffset = (i * waveParams.spacing - progress) % totalWidth;
      if (rawOffset < -totalWidth / 2) rawOffset += totalWidth;
      if (rawOffset > totalWidth / 2) rawOffset -= totalWidth;

      // Normalized parameter u from -1.0 (left edge) to +1.0 (right edge) across visible stage
      const u = rawOffset / (stageWidth * 0.55);

      // S-Curve Sine Wave equations
      // Angle theta covers one full cycle (-PI to +PI) across the visible span
      const theta = u * Math.PI * waveParams.frequency;

      // Primary S-curve coordinates
      const x = rawOffset;
      // Serpent wave: rises first (left crest), drops in middle (trough), rises at right crest
      const y = -Math.sin(theta) * amplitude + Math.cos(u * Math.PI * 0.5) * currentMouseDeflect;
      const z = Math.cos(theta) * depthAmp;

      // Tangent rotation along the serpentine curve
      const dx = 1;
      const dy = -Math.cos(theta) * (amplitude * (Math.PI / (stageWidth * 0.55)));
      const rotZ = Math.atan2(dy, dx) * (180 / Math.PI) * 0.65; // Tilt following wave curve
      const rotY = -Math.sin(theta) * 20; // 3D Perspective yaw
      const rotX = Math.cos(theta) * 8;   // 3D Pitch

      // Smooth edge falloff only at extreme viewport edges (|u| > 0.85)
      const distFromCenter = Math.abs(u);
      const edgeFalloff = Math.max(0, 1.0 - Math.pow(Math.max(0, distFromCenter - 0.7) / 0.35, 2.5));
      const depthScale = 0.82 + ((z + depthAmp) / (depthAmp * 2 || 1)) * 0.32;
      const scale = Math.max(0.4, depthScale * edgeFalloff);

      // Stacking order: higher z gets higher z-index (front-most)
      const zIndex = Math.round(z + 500);

      // Apply transforms
      card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateZ(${rotZ.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.zIndex = zIndex;
      card.style.opacity = (edgeFalloff * (0.85 + (z / (depthAmp * 2 || 1)) * 0.25)).toFixed(3);
      card.style.visibility = edgeFalloff > 0.02 ? 'visible' : 'hidden';
    });

    animationFrameId = requestAnimationFrame(render);
  }

  // Mouse Dragging & Kinetic Momentum
  stage.addEventListener('mousedown', (e) => {
    // Avoid initiating drag on modal click
    if (e.target.closest('.photo-modal-container')) return;
    isDragging = true;
    startX = e.clientX;
    lastX = e.clientX;
    startProgress = targetProgress;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    targetProgress = startProgress - dx * 1.35;
    velocity = e.clientX - lastX;
    lastX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      targetProgress -= velocity * 10; // Momentum glide
    }
  });

  // Touch Dragging for Mobile / Tablet
  stage.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      isDragging = true;
      startX = e.touches[0].clientX;
      lastX = e.touches[0].clientX;
      startProgress = targetProgress;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches || !e.touches[0]) return;
    const dx = e.touches[0].clientX - startX;
    targetProgress = startProgress - dx * 1.35;
    velocity = e.touches[0].clientX - lastX;
    lastX = e.touches[0].clientX;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      targetProgress -= velocity * 8;
    }
  });

  // Hover pauses drift for inspection
  stage.addEventListener('mouseenter', () => { isHovered = true; });
  stage.addEventListener('mouseleave', () => { isHovered = false; });

  // Mouse Wheel navigation
  stage.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 2) {
      targetProgress += delta * 0.9;
    }
  }, { passive: true });

  // Card click event triggers full spotlight modal
  cardElements.forEach(card => {
    card.addEventListener('click', (e) => {
      // If user was dragging significantly, don't trigger click
      if (Math.abs(velocity) > 4) return;
      const idx = parseInt(card.getAttribute('data-index'), 10);
      const item = items[idx];
      if (item) {
        openPhotoSpotlightModal(item);
      }
    });
  });

  render();
}

/**
 * Fullscreen Photo Spotlight Modal
 */
function setupPhotoModal(items) {
  let modal = document.getElementById('photo-spotlight-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'photo-spotlight-modal';
    modal.className = 'photo-spotlight-backdrop';
    modal.innerHTML = `
      <div class="photo-spotlight-container">
        <button class="photo-spotlight-close" aria-label="Close photo view">✕</button>
        <div class="photo-spotlight-media-wrap">
          <img src="" alt="" id="spotlight-img" class="photo-spotlight-img" />
        </div>
        <div class="photo-spotlight-info">
          <div class="photo-spotlight-tags">
            <span class="photo-spotlight-chip" id="spotlight-category">Category</span>
            <span class="photo-spotlight-location" id="spotlight-location">Location</span>
          </div>
          <h3 id="spotlight-title" class="photo-spotlight-title">Project Title</h3>
          <p id="spotlight-desc" class="photo-spotlight-desc">Project description and craftsmanship details.</p>
          <div class="photo-spotlight-actions">
            <a id="spotlight-whatsapp" href="https://wa.me/919656885973" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding: 9px 20px; font-size: 0.85rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.65.81-.8 1-.15.19-.3.21-.55.08-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z"/></svg>
              Inquire About This Work
            </a>
            <a href="https://www.instagram.com/nexora_creativestudio" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 9px 18px; font-size: 0.85rem;">
              View on Instagram ↗
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.photo-spotlight-close')) {
        closePhotoSpotlightModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closePhotoSpotlightModal();
      }
    });
  }
}

export function openPhotoSpotlightModal(item) {
  const modal = document.getElementById('photo-spotlight-modal');
  if (!modal) return;

  const img = document.getElementById('spotlight-img');
  const title = document.getElementById('spotlight-title');
  const category = document.getElementById('spotlight-category');
  const location = document.getElementById('spotlight-location');
  const desc = document.getElementById('spotlight-desc');
  const waBtn = document.getElementById('spotlight-whatsapp');

  if (img) img.src = item.src;
  if (title) title.textContent = item.title;
  if (category) category.textContent = item.category;
  if (location) location.textContent = item.location;
  if (desc) desc.textContent = item.desc;
  if (waBtn) {
    waBtn.href = `https://wa.me/919656885973?text=${encodeURIComponent(`Hello Nexora Creative Studio, I am interested in your work: ${item.title}`)}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closePhotoSpotlightModal() {
  const modal = document.getElementById('photo-spotlight-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}
