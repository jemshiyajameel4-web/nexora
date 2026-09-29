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

  // Timelapse State (Calibrated 6.0-Second Cycle with clear stage holds so all 6 photos are distinctly visible)
  const TOTAL_DURATION = 6.0;
  let currentTime = 0;
  let isPlaying = true;
  let isUserScrubbing = false;
  let lastTimestamp = null;
  let animFrameId = null;

  // Stage description markers (6 Distinct Milestones across 6.0s)
  const STAGES = [
    { start: 0.0, end: 1.0, name: '01 · Raw White Shell', desc: 'Raw architectural envelope & high-ceiling perimeter glazing' },
    { start: 1.0, end: 2.0, name: '02 · Finishes & Slats', desc: 'Herringbone oak flooring & acoustic timber slat wall cladding' },
    { start: 2.0, end: 3.0, name: '03 · Millwork Reception Desk', desc: 'Custom curved fluted marble & Calacatta counter installation' },
    { start: 3.0, end: 4.0, name: '04 · 3D Gold NEXORA Signage', desc: 'Mirror-gold 3D dimensional lettering & brass chandelier assembly' },
    { start: 4.0, end: 5.0, name: '05 · Luxury Furnished Showroom', desc: 'Bespoke bouclé curved sofa, travertine stone table & olive planter' },
    { start: 5.0, end: 6.0, name: '06 · Evening Twilight & Halo LED', desc: 'Warm 3000K halo letter glow, amber lighting & evening city skyline' }
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

    // Determine current keyframe indices and transition factor across 6 stages (6.0s Total)
    let fromImg, toImg, blendFactor;
    let wipeProgress = 0;

    const computeStageProgress = (tOffset) => {
      // 0.0s - 0.25s: crisp hold on current image
      // 0.25s - 0.85s: smooth diagonal architectural wipe (0.6s duration)
      // 0.85s - 1.00s: hold on target image
      if (tOffset < 0.25) {
        return 0;
      } else if (tOffset < 0.85) {
        const factor = (tOffset - 0.25) / 0.60;
        return easeInOutCubic(factor);
      } else {
        return 1;
      }
    };

    if (timeSec < 1.0) {
      // Stage 0 -> Stage 1: Raw Shell -> Finishes (0.0s - 1.0s)
      fromImg = images[0];
      toImg = images[1];
      wipeProgress = computeStageProgress(timeSec);
    } else if (timeSec < 2.0) {
      // Stage 1 -> Stage 2: Finishes -> Millwork Reception Desk (1.0s - 2.0s)
      fromImg = images[1];
      toImg = images[2];
      wipeProgress = computeStageProgress(timeSec - 1.0);
    } else if (timeSec < 3.0) {
      // Stage 2 -> Stage 3: Millwork Desk -> 3D Gold NEXORA Signage & Chandelier (2.0s - 3.0s)
      fromImg = images[2];
      toImg = images[3];
      wipeProgress = computeStageProgress(timeSec - 2.0);
    } else if (timeSec < 4.0) {
      // Stage 3 -> Stage 4: Signage -> Complete Furnished Showroom (3.0s - 4.0s)
      fromImg = images[3];
      toImg = images[4];
      wipeProgress = computeStageProgress(timeSec - 3.0);
    } else if (timeSec < 5.0) {
      // Stage 4 -> Stage 5: Daylight Showroom -> Evening Twilight & Halo Illumination (4.0s - 5.0s)
      fromImg = images[4];
      toImg = images[5];
      wipeProgress = computeStageProgress(timeSec - 4.0);
    } else {
      // Stage 5 (Evening Atmosphere) Full Hold & Ambient Pulse (5.0s - 6.0s)
      fromImg = images[5];
      toImg = images[5];
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

      // Add a prominent golden architectural laser sweep line along the reveal front
      if (wipeProgress > 0.05 && wipeProgress < 0.95) {
        const sweepX = (wipeProgress) * (w + 120) - 60;
        const grad = ctx.createLinearGradient(sweepX - 90, 0, sweepX + 90, 0);
        grad.addColorStop(0, 'rgba(245, 158, 11, 0)');
        grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.35)');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(sweepX - 90, 0, 180, h);
      }
      ctx.restore();
    }

    // 3. Subtle ambient glow pulse during completion & evening stage (5.0s - 6.0s)
    if (timeSec >= 5.0) {
      const pulse = Math.sin((timeSec - 5.0) * Math.PI) * 0.08;
      const glowGrad = ctx.createRadialGradient(w * 0.75, h * 0.38, 40, w * 0.75, h * 0.38, w * 0.55);
      glowGrad.addColorStop(0, `rgba(245, 158, 11, ${0.14 + pulse})`);
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
