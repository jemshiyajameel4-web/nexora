import { gsap } from 'gsap';

/**
 * NEXORA CREATIVE STUDIO — 7-SECOND ARCHITECTURAL TIMELAPSE ENGINE
 * Photorealistic cinematic assembly of the luxury interior from a raw white architectural shell.
 * Locked 100% camera perspective, focal length, and architectural geometry.
 *
 * Sequence Breakdown (7.0 Seconds Total):
 * 0.0s - 1.2s : Empty white shell -> Architectural finishes (marble floor + timber fluted walls)
 * 1.2s - 2.8s : Millwork installation (stone reception desk & fixed cabinetry slide into place)
 * 2.8s - 4.6s : Illumination activation (chandelier, vertical LED cove strips ignite sequentially)
 * 4.6s - 6.0s : Luxury furniture & branding signage (sofas, armchairs, gold 3D letters materialize)
 * 6.0s - 7.0s : Final atmospheric polish & ambient evening glow reflections
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

  // Keyframe image sources
  const stageSources = [
    'assets/images/arch-timelapse-0-shell.jpg',      // Stage 0: White shell (0.0s)
    'assets/images/arch-timelapse-1-finishes.jpg',   // Stage 1: Wall finishes & marble floor (1.5s)
    'assets/images/arch-timelapse-2-millwork.jpg',   // Stage 2: Millwork & desk installed (3.0s)
    'assets/images/arch-timelapse-3-complete.jpg'    // Stage 3: Complete luxury interior (5.0s - 7.0s)
  ];

  const images = [];
  let loadedCount = 0;
  let isReady = false;

  // Timelapse State
  const TOTAL_DURATION = 7.0; // 7 seconds
  let currentTime = 0;
  let isPlaying = true;
  let isUserScrubbing = false;
  let lastTimestamp = null;
  let animFrameId = null;

  // Stage description markers
  const STAGES = [
    { start: 0.0, end: 1.2, name: '01 · Raw White Shell', desc: 'Empty architectural envelope with natural perimeter glazing' },
    { start: 1.2, end: 2.8, name: '02 · Finishes & Slats', desc: 'Dark polished marble floor & timber slat wall paneling' },
    { start: 2.8, end: 4.6, name: '03 · Millwork & Illumination', desc: 'Custom stone reception desk & warm vertical LED cove lighting' },
    { start: 4.6, end: 7.0, name: '04 · Complete Luxury Space', desc: 'Lounge seating, mirror gold 3D signage & atmospheric evening glow' }
  ];

  // Preload all 4 keyframe images
  stageSources.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === stageSources.length) {
        isReady = true;
        resizeCanvas();
        renderFrame(currentTime);
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

  // Core Render Function: Photorealistic Blend between keyframes with architectural reveal effects
  function renderFrame(timeSec) {
    if (!isReady || !ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Source image dimensions (all are 16:9 widescreen)
    const imgW = images[0].naturalWidth || 1920;
    const imgH = images[0].naturalHeight || 1080;

    // Cover scale calculation
    const scale = Math.max(w / imgW, h / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (w - renderW) / 2;
    const offsetY = (h - renderH) / 2;

    // Normalized progress [0..1]
    const p = Math.max(0, Math.min(timeSec / TOTAL_DURATION, 1));

    // Determine current keyframe indices and transition factor
    // Timeline intervals:
    // 0.0s -> 1.5s: Stage 0 -> Stage 1 (Architectural finishes appear)
    // 1.5s -> 3.5s: Stage 1 -> Stage 2 (Millwork & lighting appear)
    // 3.5s -> 5.5s: Stage 2 -> Stage 3 (Loose furniture & 3D signage appear)
    // 5.5s -> 7.0s: Stage 3 holds with subtle lighting pulse & evening ambience
    let fromImg, toImg, blendFactor;
    let wipeProgress = 0;

    if (timeSec < 1.5) {
      fromImg = images[0];
      toImg = images[1];
      blendFactor = timeSec / 1.5;
      wipeProgress = easeInOutCubic(blendFactor);
    } else if (timeSec < 3.5) {
      fromImg = images[1];
      toImg = images[2];
      blendFactor = (timeSec - 1.5) / 2.0;
      wipeProgress = easeInOutCubic(blendFactor);
    } else if (timeSec < 5.5) {
      fromImg = images[2];
      toImg = images[3];
      blendFactor = (timeSec - 3.5) / 2.0;
      wipeProgress = easeInOutCubic(blendFactor);
    } else {
      fromImg = images[3];
      toImg = images[3];
      blendFactor = 1.0;
      wipeProgress = 1.0;
    }

    // 1. Draw base image
    ctx.globalAlpha = 1.0;
    ctx.drawImage(fromImg, offsetX, offsetY, renderW, renderH);

    // 2. Draw target image with progressive architectural reveal
    if (fromImg !== toImg && wipeProgress > 0) {
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
      ctx.drawImage(toImg, offsetX, offsetY, renderW, renderH);

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

    // 3. Subtle ambient glow pulse during completion stage (5.5s - 7.0s)
    if (timeSec >= 5.5) {
      const pulse = Math.sin((timeSec - 5.5) * Math.PI / 1.5) * 0.08;
      const glowGrad = ctx.createRadialGradient(w * 0.7, h * 0.4, 50, w * 0.7, h * 0.4, w * 0.6);
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
