import { gsap } from 'gsap';

/**
 * NEXORA CREATIVE STUDIO — 5-SECOND ARCHITECTURAL TIMELAPSE ENGINE
 * Photorealistic cinematic assembly of the luxury interior across 6 stages from a raw white architectural shell.
 * Locked 100% camera perspective, focal length, and architectural geometry.
 *
 * Sequence Breakdown (5.0 Seconds Total):
 * 0.0s - 0.85s : Stage 01 · Raw white shell -> Architectural finishes (herringbone floor + timber slat walls)
 * 0.85s - 1.70s: Stage 02 · Millwork installation (curved fluted marble reception desk)
 * 1.70s - 2.55s: Stage 03 · 3D Signage & chandelier (mirror gold NEXORA letters + brass pendant lighting)
 * 2.55s - 3.40s: Stage 04 · Complete luxury interior (bouclé lounge sofa, stone table, olive planter)
 * 3.40s - 4.25s: Stage 05 · Twilight evening transition (warm halo letter glow & night skyline)
 * 4.25s - 5.00s: Stage 06 · Final atmospheric polish & ambient evening glow pulse before seamless loop
 */

export function initHeroTimelapse() {
  const container = document.querySelector('.hero-timelapse-container');
  if (!container) return;

  const canvas = container.querySelector('#timelapse-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });

  // DOM Elements for Interactive HUD
  const playPauseBtn = container.querySelector('.tl-btn-play');
  const playIcon = container.querySelector('.tl-icon-play');
  const pauseIcon = container.querySelector('.tl-icon-pause');
  const replayBtn = container.querySelector('.tl-btn-replay');
  const timecodeEl = container.querySelector('.tl-timecode');
  const progressBar = container.querySelector('.tl-progress-fill');
  const scrubber = container.querySelector('.tl-scrubber-track');
  const stageBadges = container.querySelectorAll('.tl-stage-badge');
  const stageStatusEl = container.querySelector('.tl-status-text');

  // Keyframe image sources (6-Stage Architectural Transformation)
  const stageSources = [
    '/assets/images/arch-timelapse-0-shell.jpg',      // Stage 0: White shell (0.0s - 0.85s)
    '/assets/images/arch-timelapse-1-finishes.jpg',   // Stage 1: Wall finishes & herringbone floor (0.85s - 1.70s)
    '/assets/images/arch-timelapse-2-millwork.jpg',   // Stage 2: Fluted reception desk (1.70s - 2.55s)
    '/assets/images/arch-timelapse-3-signage.jpg',    // Stage 3: 3D Gold signage & chandelier (2.55s - 3.40s)
    '/assets/images/arch-timelapse-4-complete.jpg',   // Stage 4: Furnished luxury interior (3.40s - 4.25s)
    '/assets/images/arch-timelapse-5-evening.jpg'     // Stage 5: Twilight / Evening illumination (4.25s - 5.00s)
  ];

  const images = [];
  let loadedCount = 0;
  let isReady = false;

  // Timelapse State
  const TOTAL_DURATION = 5.0; // 5.0 seconds total animation loop across all 6 stages
  let currentTime = 0;
  let isPlaying = true;
  let isUserScrubbing = false;
  let lastTimestamp = null;
  let animFrameId = null;

  // Stage description markers (Calibrated for 5.0s sequence)
  const STAGES = [
    { start: 0.0, end: 0.85, name: '01 · Raw White Shell', desc: 'Empty architectural envelope with natural perimeter glazing' },
    { start: 0.85, end: 1.70, name: '02 · Finishes & Slats', desc: 'Light oak herringbone floor & vertical acoustic timber slat wall panels' },
    { start: 1.70, end: 2.55, name: '03 · Architectural Millwork', desc: 'Custom fluted reception desk & Calacatta marble counter installation' },
    { start: 2.55, end: 3.40, name: '04 · 3D Signage & Lighting', desc: 'Illuminated mirror-gold NEXORA letters & minimalist geometric brass chandelier' },
    { start: 3.40, end: 4.25, name: '05 · Luxury Furnished Interior', desc: 'Bespoke bouclé curved sofa, travertine stone table & natural olive planter' },
    { start: 4.25, end: 5.00, name: '06 · Twilight & Night Ambience', desc: 'Warm halo letter glow, amber chandelier illumination & evening city skyline' }
  ];

  // Preload all 6 keyframe images
  stageSources.forEach((src, idx) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (!isReady && loadedCount >= 1) {
        isReady = true;
        resizeCanvas();
        renderFrame(currentTime);
      }
      if (loadedCount === stageSources.length) {
        startAnimationLoop();
      }
    };
    img.onerror = () => {
      console.warn(`Fallback for keyframe: ${src}`);
      loadedCount++;
      if (!isReady) {
        isReady = true;
        resizeCanvas();
        renderFrame(currentTime);
      }
      if (loadedCount === stageSources.length) {
        startAnimationLoop();
      }
    };
    images[idx] = img;
  });

  // Resize canvas to cover hero with 16:9 aspect ratio preservation
  function resizeCanvas() {
    if (!canvas) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    
    if (isReady) renderFrame(currentTime);
  }

  window.addEventListener('resize', resizeCanvas);

  // Core Render Function: Photorealistic Blend between 6 keyframes with architectural reveal effects
  function renderFrame(timeSec) {
    if (!isReady || !ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Source image dimensions (all are 16:9 widescreen)
    const imgW = images[0].naturalWidth || 1376;
    const imgH = images[0].naturalHeight || 768;

    // Full fit (cover) scale calculation to fill the entire screen seamlessly
    const scale = Math.max(w / imgW, h / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (w - renderW) / 2;
    const offsetY = (h - renderH) / 2;

    // Determine current keyframe indices and transition factor across 6 stages (5.0s Total)
    let fromImg, toImg, blendFactor;
    let wipeProgress = 0;

    if (timeSec < 0.85) {
      // Stage 0 -> Stage 1: Raw Shell to Finishes (0.0s - 0.85s)
      fromImg = images[0];
      toImg = images[1];
      blendFactor = timeSec / 0.85;
      wipeProgress = easeInOutCubic(blendFactor);
    } else if (timeSec < 1.70) {
      // Stage 1 -> Stage 2: Finishes to Millwork Desk (0.85s - 1.70s)
      fromImg = images[1];
      toImg = images[2];
      blendFactor = (timeSec - 0.85) / 0.85;
      wipeProgress = easeInOutCubic(blendFactor);
    } else if (timeSec < 2.55) {
      // Stage 2 -> Stage 3: Millwork to 3D Signage & Chandelier (1.70s - 2.55s)
      fromImg = images[2];
      toImg = images[3];
      blendFactor = (timeSec - 1.70) / 0.85;
      wipeProgress = easeInOutCubic(blendFactor);
    } else if (timeSec < 3.40) {
      // Stage 3 -> Stage 4: Signage to Complete Furnished Showroom (2.55s - 3.40s)
      fromImg = images[3];
      toImg = images[4];
      blendFactor = (timeSec - 2.55) / 0.85;
      wipeProgress = easeInOutCubic(blendFactor);
    } else if (timeSec < 4.25) {
      // Stage 4 -> Stage 5: Daylight Showroom to Evening Glow & Halo Illumination (3.40s - 4.25s)
      fromImg = images[4];
      toImg = images[5];
      blendFactor = (timeSec - 3.40) / 0.85;
      wipeProgress = easeInOutCubic(blendFactor);
    } else {
      // Stage 5 Hold & Ambient Pulse (4.25s - 5.00s)
      fromImg = images[5];
      toImg = images[5];
      blendFactor = 1.0;
      wipeProgress = 1.0;
    }

    // Fallback to any loaded image if fromImg or toImg is not ready
    const safeFromImg = (fromImg && fromImg.complete && fromImg.naturalWidth > 0) 
      ? fromImg 
      : images.find(img => img && img.complete && img.naturalWidth > 0);
    const safeToImg = (toImg && toImg.complete && toImg.naturalWidth > 0) 
      ? toImg 
      : safeFromImg;

    if (!safeFromImg) return;

    // 1. Draw base image (Full-fit cover)
    ctx.globalAlpha = 1.0;
    ctx.drawImage(safeFromImg, offsetX, offsetY, renderW, renderH);

    // 2. Draw target image with progressive architectural reveal
    if (safeFromImg !== safeToImg && wipeProgress > 0) {
      ctx.save();
      // Smooth diagonal material wave wipe across room (bottom-left to top-right)
      const wipeAngle = Math.PI / 6; // 30 degrees
      const totalSpan = w + h * Math.tan(wipeAngle);
      const currentSpan = wipeProgress * (totalSpan + 200) - 100;

      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.clip();

      // Crossfade + Soft directional wipe gradient
      ctx.globalAlpha = wipeProgress;
      ctx.drawImage(safeToImg, offsetX, offsetY, renderW, renderH);

      // Add a subtle golden/warm architectural laser sweep line along the reveal front
      if (wipeProgress > 0.05 && wipeProgress < 0.95) {
        const sweepX = (wipeProgress) * (w + 100) - 50;
        const grad = ctx.createLinearGradient(sweepX - 80, 0, sweepX + 80, 0);
        grad.addColorStop(0, 'rgba(245, 158, 11, 0)');
        grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.22)');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(sweepX - 80, 0, 160, h);
      }
      ctx.restore();
    }

    // 3. Subtle ambient glow pulse during completion & evening stage (4.25s - 5.00s)
    if (timeSec >= 4.25) {
      const pulse = Math.sin((timeSec - 4.25) * Math.PI / 0.75) * 0.08;
      const glowGrad = ctx.createRadialGradient(w * 0.75, h * 0.38, 40, w * 0.75, h * 0.38, w * 0.55);
      glowGrad.addColorStop(0, `rgba(245, 158, 11, ${0.12 + pulse})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);
    }

    // 4. Update HUD elements
    updateHUD(timeSec);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Update timecode, progress bar and active stage badge
  function updateHUD(timeSec) {
    if (timecodeEl) {
      const formatted = timeSec.toFixed(1) + 's / ' + TOTAL_DURATION.toFixed(1) + 's';
      timecodeEl.textContent = formatted;
    }

    if (progressBar) {
      const pct = (timeSec / TOTAL_DURATION) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update active stage badge & status description
    const currentStageIndex = STAGES.findIndex(s => timeSec >= s.start && timeSec <= s.end);
    if (currentStageIndex !== -1) {
      const st = STAGES[currentStageIndex];
      if (stageStatusEl) {
        stageStatusEl.textContent = st.desc;
      }
      stageBadges.forEach((badge, idx) => {
        if (idx === currentStageIndex) {
          badge.classList.add('active');
        } else {
          badge.classList.remove('active');
        }
      });
    }
  }

  // Animation Loop using requestAnimationFrame with delta timing
  function startAnimationLoop() {
    lastTimestamp = performance.now();
    
    function loop(now) {
      if (!lastTimestamp) lastTimestamp = now;
      const deltaSec = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying && !isUserScrubbing) {
        currentTime += deltaSec;
        if (currentTime >= TOTAL_DURATION) {
          currentTime = 0; // Seamless loop back to start
        }
        renderFrame(currentTime);
      }

      animFrameId = requestAnimationFrame(loop);
    }

    animFrameId = requestAnimationFrame(loop);
  }

  // User Play / Pause Controls
  function togglePlay() {
    isPlaying = !isPlaying;
    if (playIcon && pauseIcon) {
      if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    }
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlay);
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      currentTime = 0;
      isPlaying = true;
      if (playIcon && pauseIcon) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      }
      renderFrame(currentTime);
    });
  }

  // Interactive Timeline Scrubbing
  if (scrubber) {
    const handleScrub = (e) => {
      const rect = scrubber.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const fraction = Math.max(0, Math.min(clickX / rect.width, 1));
      currentTime = fraction * TOTAL_DURATION;
      renderFrame(currentTime);
    };

    scrubber.addEventListener('mousedown', (e) => {
      isUserScrubbing = true;
      handleScrub(e);
      const onMouseMove = (moveEvent) => handleScrub(moveEvent);
      const onMouseUp = () => {
        isUserScrubbing = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    scrubber.addEventListener('touchstart', (e) => {
      isUserScrubbing = true;
      const touch = e.touches[0];
      const rect = scrubber.getBoundingClientRect();
      const clickX = touch.clientX - rect.left;
      currentTime = Math.max(0, Math.min(clickX / rect.width, 1)) * TOTAL_DURATION;
      renderFrame(currentTime);
    }, { passive: true });

    scrubber.addEventListener('touchmove', (e) => {
      if (!isUserScrubbing) return;
      const touch = e.touches[0];
      const rect = scrubber.getBoundingClientRect();
      const clickX = touch.clientX - rect.left;
      currentTime = Math.max(0, Math.min(clickX / rect.width, 1)) * TOTAL_DURATION;
      renderFrame(currentTime);
    }, { passive: true });

    scrubber.addEventListener('touchend', () => {
      isUserScrubbing = false;
    });
  }

  // Stage Badge Direct Jump Click
  stageBadges.forEach((badge, idx) => {
    badge.addEventListener('click', () => {
      if (STAGES[idx]) {
        currentTime = STAGES[idx].start + 0.1;
        renderFrame(currentTime);
      }
    });
  });
}
