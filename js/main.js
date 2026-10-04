/**
 * SMART INVESTMENTS — VARIANT 02 INTERACTION SCRIPTS
 * Visual Style matching smartinvestmentsholding.com
 * Content strictly adhering to Smart Investment Home.pdf and Design Brief
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContourTimeline();
  initVideoPlayer();
  initExpandingStepCards();
  initStatementHighlight();
  initScrollAnimations();
  initPortfolioFilter();
  initPropertyModal();
  initBrandFilter();
  initBrandModal();
});

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* --- "Our Journey" Contour Timeline Interactive Component --- */
function initContourTimeline() {
  const stage = document.getElementById('contourTimelineStage') || document.querySelector('.contour-timeline-stage');
  const card = document.getElementById('contourActiveCard');
  const path = document.getElementById('contourLinePath');
  const activeDot = document.getElementById('contourActiveDot');
  const nodesGroup = document.getElementById('contourNodesGroup');
  const yearItems = document.querySelectorAll('.contour-year-item');
  const scrollWrapper = document.getElementById('contourScrollWrapper');
  const trackInner = document.getElementById('contourTrackInner');
  const svgElement = document.getElementById('contourSvgElement');
  const prevBtn = document.getElementById('contourPrevBtn');
  const nextBtn = document.getElementById('contourNextBtn');
  const currentStepNum = document.getElementById('contourCurrentStepNum');

  if (!card || !path || !activeDot || !yearItems.length) {
    console.warn('Contour timeline elements not found');
    return;
  }

  // 14 Milestones mapped directly to the uploaded timeline assets in "images timeline"
  const milestones = [
    {
      year: '1999',
      kicker: 'FOUNDATION',
      title: 'Founded in Toronto, Canada',
      desc: 'Smart Investments begins in Ontario with an entrepreneurial owner-investor mindset, deploying proprietary capital across Canadian opportunities.',
      image: 'assets/images timeline/1_step.png'
    },
    {
      year: '1999',
      kicker: 'MANUFACTURING',
      title: 'E.Star International Inc.',
      desc: 'Established North American apparel manufacturing operations providing end-to-end design, production and supply chain capabilities.',
      image: 'assets/images timeline/2_step.png'
    },
    {
      year: '2003',
      kicker: 'BRANDED APPAREL',
      title: 'Midland Clothing Inc.',
      desc: 'Expanded into proprietary branded apparel design, sourcing and multi-channel wholesale distribution across Canada.',
      image: 'assets/images timeline/3_step.png'
    },
    {
      year: '2003',
      kicker: 'COMMERCIAL REAL ESTATE',
      title: 'Smart Investment Inc.',
      desc: 'Launched dedicated commercial real estate division, investing in essential retail and income-generating properties.',
      image: 'assets/images timeline/4_step.png'
    },
    {
      year: '2007',
      kicker: 'OPERATIONS SCALE',
      title: 'Sparkling Design Inc.',
      desc: 'Expanded domestic production footprint with agile manufacturing facilities to accelerate quick-turn fulfillment.',
      image: 'assets/images timeline/5_step.png'
    },
    {
      year: '2016',
      kicker: 'DEVELOPMENT',
      title: 'E.Star Developments Inc.',
      desc: 'Formed development arm to lead commercial property modernizations, master planning and value-add enhancements.',
      image: 'assets/images timeline/6_step.png'
    },
    {
      year: '2016',
      kicker: 'COMMUNITY & EDUCATION',
      title: 'WillowWood School',
      desc: 'Long-term stewardship of leading independent co-educational school founded in 1980 in Toronto.',
      image: 'assets/images timeline/7_step.png'
    },
    {
      year: '2018',
      kicker: 'RETAIL PLATFORM',
      title: 'Lattelove Retail Brand',
      desc: 'Designed and launched direct-to-consumer contemporary apparel and lifestyle retail platform.',
      image: 'assets/images timeline/8_step.png'
    },
    {
      year: '2020',
      kicker: 'ICONIC INVESTMENT',
      title: 'Roots Canada (TSX: ROOT.TO)',
      desc: 'Strategic equity investment and board partnership in Canada’s world-renowned heritage outdoor lifestyle brand.',
      image: 'assets/images timeline/9_step.png'
    },
    {
      year: '2021',
      kicker: 'UNIFORMS & WORKWEAR',
      title: 'Unisync Group (TSX: UNI.TO)',
      desc: 'Significant ownership in North American leader in enterprise managed apparel and corporate uniforms.',
      image: 'assets/images timeline/10_step.png'
    },
    {
      year: '2021',
      kicker: 'HERITAGE APPAREL',
      title: 'Tilley Endurables Inc.',
      desc: 'Co-ownership and global stewardship of Canada’s iconic handcrafted outdoor hat and adventure apparel brand.',
      image: 'assets/images timeline/11_step.png'
    },
    {
      year: '2023',
      kicker: 'RETAIL ACQUISITION',
      title: 'Garden City Shopping Centre',
      desc: 'Acquired major enclosed retail mall in Winnipeg, MB comprising 280,000+ sq. ft. of prime commercial retail space.',
      image: 'assets/images timeline/12_step.png'
    },
    {
      year: '2024',
      kicker: 'OFFICE CAMPUS',
      title: 'Woodbine Corporate Centre',
      desc: 'Acquisition of 359,563 sq. ft. multi-building office campus in Markham, Ontario.',
      image: 'assets/images timeline/13_step.png'
    },
    {
      year: '2026',
      kicker: 'OUTDOOR FLAGSHIP',
      title: 'Mountain Equipment Company (MEC)',
      desc: 'Majority ownership and operational stewardship in Mountain Equipment Company (MEC), Canada’s iconic outdoor retailer.',
      image: 'assets/images timeline/14_step.png'
    }
  ];

  let activeIndex = 0;

  function renderTimelineTrack() {
    if (!svgElement || !yearItems.length) return;

    // Active milestone DOM element
    const activeItem = yearItems[activeIndex];
    if (!activeItem) return;

    // Measure active milestone center directly from DOM offset
    const activeCenterX = activeItem.offsetLeft + (activeItem.offsetWidth / 2);

    // Total content width for SVG coordinate space
    const totalWidth = trackInner ? (trackInner.clientWidth || 2100) : 2100;
    svgElement.setAttribute('viewBox', `0 0 ${totalWidth} 65`);

    const yBase = 52;
    const yPeak = 14;
    const crestRadius = 55;

    const leftX = activeCenterX - crestRadius;
    const rightX = activeCenterX + crestRadius;
    const cpX1 = leftX + 24;
    const cpX2 = activeCenterX - 24;
    const cpX3 = activeCenterX + 24;
    const cpX4 = rightX - 24;

    // Symmetrical smooth Bezier curve perfectly centered at activeCenterX
    const pathD = `M 0 ${yBase} L ${leftX} ${yBase} C ${cpX1} ${yBase}, ${cpX2} ${yPeak}, ${activeCenterX} ${yPeak} C ${cpX3} ${yPeak}, ${cpX4} ${yBase}, ${rightX} ${yBase} L ${totalWidth} ${yBase}`;
    path.setAttribute('d', pathD);

    // Update active dot at crest peak
    activeDot.setAttribute('cx', activeCenterX);
    activeDot.setAttribute('cy', yPeak);

    // Render baseline inactive dots (omitting active milestone so zero duplicate dots)
    if (nodesGroup) {
      nodesGroup.innerHTML = '';
      yearItems.forEach((item, idx) => {
        if (idx !== activeIndex) {
          const cx = item.offsetLeft + (item.offsetWidth / 2);
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('class', 'contour-node-dot');
          circle.setAttribute('cx', cx);
          circle.setAttribute('cy', yBase);
          circle.setAttribute('r', '3.5');
          nodesGroup.appendChild(circle);
        }
      });
    }

    // Position floating card directly above the active item in the unified track
    const cardWidth = card.offsetWidth || 320;
    const targetLeft = activeCenterX - (cardWidth / 2);
    card.style.transform = `translateX(${targetLeft}px)`;
  }

  function updateTimeline(index, autoScroll = true) {
    if (index < 0) index = 0;
    if (index >= milestones.length) index = milestones.length - 1;
    activeIndex = index;

    const data = milestones[index];
    if (!data) return;

    // Update counter
    if (currentStepNum) {
      currentStepNum.textContent = (index + 1).toString().padStart(2, '0');
    }

    // Update active class on years
    yearItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    renderTimelineTrack();

    // Auto scroll the item into center of view
    const activeItem = yearItems[index];
    if (activeItem && autoScroll && scrollWrapper) {
      const activeCenterX = activeItem.offsetLeft + (activeItem.offsetWidth / 2);
      const scrollTarget = activeCenterX - (scrollWrapper.clientWidth / 2);
      scrollWrapper.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
    }

    // Update Card content with smooth fade
    const cardContent = card.querySelector('.contour-card-content');
    const cardImg = document.getElementById('contourCardImg');
    const cardYearBadge = document.getElementById('contourCardYearBadge');
    const cardKicker = document.getElementById('contourCardKicker');
    const cardTitle = document.getElementById('contourCardTitle');
    const cardDesc = document.getElementById('contourCardDesc');

    if (cardContent) cardContent.style.opacity = '0';
    if (cardImg) cardImg.style.opacity = '0';

    setTimeout(() => {
      if (cardYearBadge) cardYearBadge.textContent = data.year;
      if (cardKicker) cardKicker.textContent = data.kicker;
      if (cardTitle) cardTitle.textContent = data.title;
      if (cardDesc) cardDesc.textContent = data.desc;
      if (cardImg) {
        cardImg.src = data.image;
        cardImg.alt = data.title;
        cardImg.style.opacity = '1';
      }
      if (cardContent) cardContent.style.opacity = '1';
    }, 180);
  }

  // Event listeners on year items
  yearItems.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 900) updateTimeline(idx, false);
    });
    item.addEventListener('click', (e) => {
      e.preventDefault();
      updateTimeline(idx, true);
    });
  });

  // Navigation button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = (activeIndex - 1 + milestones.length) % milestones.length;
      updateTimeline(targetIdx, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = (activeIndex + 1) % milestones.length;
      updateTimeline(targetIdx, true);
    });
  }

  // Drag to scroll functionality on scroll wrapper
  if (scrollWrapper) {
    let isDown = false;
    let startX, scrollLeftVal;

    scrollWrapper.addEventListener('mousedown', (e) => {
      // Don't drag if clicking buttons or year items directly
      if (e.target.closest('.contour-card') || e.target.closest('.contour-year-item')) return;
      isDown = true;
      scrollWrapper.style.cursor = 'grabbing';
      scrollWrapper.style.scrollBehavior = 'auto';
      startX = e.pageX - scrollWrapper.offsetLeft;
      scrollLeftVal = scrollWrapper.scrollLeft;
    });

    scrollWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      scrollWrapper.style.cursor = '';
      scrollWrapper.style.scrollBehavior = 'smooth';
    });

    scrollWrapper.addEventListener('mouseup', () => {
      isDown = false;
      scrollWrapper.style.cursor = '';
      scrollWrapper.style.scrollBehavior = 'smooth';
    });

    scrollWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollWrapper.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollWrapper.scrollLeft = scrollLeftVal - walk;
    });
  }

  // Window resize handler
  window.addEventListener('resize', () => {
    renderTimelineTrack();
  });

  // Initial layout render immediately and on timeout
  updateTimeline(0, false);
  setTimeout(() => {
    updateTimeline(0, false);
  }, 100);
}

/* --- Video Scroll Expanding Player & Controls --- */
function initVideoPlayer() {
  const mediaSection = document.querySelector('.media-section') || document.getElementById('video');
  const videoBox = document.getElementById('videoBoxWrap') || document.querySelector('.video-box-wrap');
  const video = document.getElementById('corporateVideo') || document.querySelector('.video-box-wrap video');
  const playBtn = document.getElementById('videoPlayPauseBtn');
  const soundBtn = document.getElementById('videoSoundToggle');

  if (!video || !videoBox || !mediaSection) return;

  // UI State Helpers
  function updatePlayPauseUI(isPlaying) {
    if (!playBtn) return;
    const iconPause = playBtn.querySelector('.icon-pause');
    const iconPlay = playBtn.querySelector('.icon-play');
    const text = document.getElementById('videoPlayText');
    if (isPlaying) {
      if (iconPause) iconPause.style.display = 'block';
      if (iconPlay) iconPlay.style.display = 'none';
      if (text) text.textContent = 'Pause';
    } else {
      if (iconPause) iconPause.style.display = 'none';
      if (iconPlay) iconPlay.style.display = 'block';
      if (text) text.textContent = 'Play';
    }
  }

  function updateSoundUI(isMuted) {
    if (!soundBtn) return;
    const iconMuted = soundBtn.querySelector('.icon-muted');
    const iconSound = soundBtn.querySelector('.icon-sound');
    const text = document.getElementById('videoSoundText');
    if (isMuted) {
      if (iconMuted) iconMuted.style.display = 'block';
      if (iconSound) iconSound.style.display = 'none';
      if (text) text.textContent = 'Unmute';
    } else {
      if (iconMuted) iconMuted.style.display = 'none';
      if (iconSound) iconSound.style.display = 'block';
      if (text) text.textContent = 'Mute';
    }
  }

  // Play / Pause Button Listener
  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) {
        video.play().then(() => updatePlayPauseUI(true)).catch(() => updatePlayPauseUI(false));
      } else {
        video.pause();
        updatePlayPauseUI(false);
      }
    });
  }

  // Sound Mute / Unmute Button Listener
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      updateSoundUI(video.muted);
    });
  }

  // Direct video click toggles play/pause
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play().then(() => updatePlayPauseUI(true)).catch(() => updatePlayPauseUI(false));
    } else {
      video.pause();
      updatePlayPauseUI(false);
    }
  });

  video.addEventListener('play', () => updatePlayPauseUI(true));
  video.addEventListener('pause', () => updatePlayPauseUI(false));

  // IntersectionObserver for SEO-safe muted autoplay/pause when in/out of view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => updatePlayPauseUI(true)).catch(() => updatePlayPauseUI(false));
          }
        } else {
          video.pause();
          updatePlayPauseUI(false);
        }
      });
    }, { threshold: 0.12 });
    observer.observe(mediaSection);
  }

  // Scroll-driven video size expansion calculation
  let ticking = false;
  function handleVideoScroll() {
    const rect = mediaSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Start expanding as soon as section approaches the viewport
    const start = windowHeight * 0.85;
    const end = windowHeight * 0.12;

    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    const isMobile = window.innerWidth <= 768;
    const minWidthVw = isMobile ? 92 : 62;
    const currentWidthVw = minWidthVw + (100 - minWidthVw) * progress;
    const maxRadius = isMobile ? 18 : 28;
    const currentRadius = Math.round(maxRadius * (1 - progress));

    videoBox.style.width = `${currentWidthVw}vw`;
    videoBox.style.borderRadius = `${currentRadius}px`;

    if (progress >= 0.96) {
      videoBox.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.9)';
      videoBox.style.borderColor = 'transparent';
    } else {
      videoBox.style.boxShadow = `0 25px 60px rgba(0, 0, 0, 0.8), 0 0 ${35 * (1 - progress)}px rgba(255, 190, 45, ${0.15 * (1 - progress)})`;
      videoBox.style.borderColor = `rgba(255, 255, 255, ${0.12 * (1 - progress)})`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(handleVideoScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);

  // Initial calculation
  handleVideoScroll();
}

/* --- Expanding Step Cards Component Interactivity --- */
function initExpandingStepCards() {
  const cards = document.querySelectorAll('.step-card');
  if (!cards.length) return;

  cards.forEach(card => {
    // Hover activation on desktop/laptop
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 860) {
        cards.forEach(c => c.classList.remove('is-expanded'));
        card.classList.add('is-expanded');
      }
    });

    // Click activation
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // Allow normal link clicks
      cards.forEach(c => c.classList.remove('is-expanded'));
      card.classList.add('is-expanded');
    });
  });
}

/* --- AutoCover Highlight Interactive Canvas Particle Engine (Hero & Statement) --- */
function setupAutoCoverPill(wrap) {
  if (!wrap) return;
  const box = wrap.querySelector('.statement-highlight-box');
  const canvas = wrap.querySelector('.statement-particles-canvas');

  if (!box || !canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isHovered = false;
  let particles = [];
  const PARTICLE_COUNT = 32;

  function resizeCanvas() {
    const rect = box.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }

  function createParticles() {
    const rect = box.getBoundingClientRect();
    const w = rect.width || 200;
    const h = rect.height || 40;
    particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.1 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.45 + 0.25,
        color: Math.random() > 0.5 ? '#FFFFFF' : '#FFBE2D',
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  let step = 0;
  function renderParticles() {
    if (!isHovered) return;
    const rect = box.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);
    step += 0.03;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      const dynamicOpacity = Math.max(0.1, p.opacity + Math.sin(step * 2 + p.pulseOffset) * 0.25);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = dynamicOpacity;
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(renderParticles);
  }

  wrap.addEventListener('mouseenter', () => {
    isHovered = true;
    resizeCanvas();
    createParticles();
    cancelAnimationFrame(animationFrameId);
    renderParticles();
  });

  wrap.addEventListener('mouseleave', () => {
    isHovered = false;
    cancelAnimationFrame(animationFrameId);
    const rect = box.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
  });

  window.addEventListener('resize', () => {
    if (isHovered) {
      resizeCanvas();
      createParticles();
    }
  });
}

function initStatementHighlight() {
  const highlightWraps = document.querySelectorAll('.statement-highlight-wrap');
  highlightWraps.forEach(wrap => setupAutoCoverPill(wrap));
}

/* --- Scroll-Driven Entrance / Fade-In Animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -6% 0px',
    threshold: 0.08
  });

  elements.forEach(el => observer.observe(el));

  // Trigger above-the-fold hero elements gracefully on load
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-section .reveal-on-scroll');
    heroElements.forEach(el => el.classList.add('is-revealed'));
  }, 100);
}

/* --- Commercial Real Estate Portfolio Filter --- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('is-hidden');
          card.classList.add('is-revealed');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* --- Commercial Real Estate Property Modal --- */
function initPropertyModal() {
  const modal = document.getElementById('propertyModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('[data-open-modal]');

  if (!modal || !closeBtn || !openBtns.length) return;

  const propertyData = {
    'mcallister': {
      title: 'McAllister Place',
      meta: 'Retail · Saint John, New Brunswick',
      image: 'assets/images timeline/4_step.png',
      size: 'Approximately 400,000 sq. ft.',
      desc: 'A leading regional shopping destination serving Saint John and surrounding communities. The property represents the dominant commercial retail and entertainment hub in southern New Brunswick.',
      highlights: [
        'Dominant regional shopping destination serving southern New Brunswick.',
        'Strong national covenants and consistent everyday consumer traffic.',
        'Active value-creation initiatives through tenant remixing and modernizations.'
      ]
    },
    'garden-city': {
      title: 'Garden City Shopping Centre',
      meta: 'Retail · Winnipeg, Manitoba',
      image: 'assets/Garden City Photos/_E8A7011low.jpg',
      size: '371,425 sq. ft.',
      desc: 'A community-focused enclosed shopping centre with a strong everyday-needs tenant mix. Under active stewardship, undergoing value-creation initiatives including tenant remixing and common area upgrades.',
      highlights: [
        'High-performing everyday-needs tenant mix serving north Winnipeg.',
        'Active property stewardship and capital improvement programs.',
        'Long-term covenant stability and durable regional foot traffic.'
      ]
    },
    'woodbine': {
      title: 'Woodbine Corporate Centre',
      meta: 'Office · Markham, Ontario (GTA)',
      image: 'assets/images timeline/13_step.png',
      size: '359,563 sq. ft.',
      desc: 'A multi-building commercial office campus positioned within one of the Greater Toronto Area\'s key employment nodes, offering unmatched transit access, highway exposure, and institutional infrastructure.',
      highlights: [
        'Institutional commercial office campus in Markham\'s employment corridor.',
        'Direct access to Highway 404, Highway 407, and public transit nodes.',
        'High-covenant corporate tenant base and scalable floorplate infrastructure.'
      ]
    },
    'willmott': {
      title: '130 Willmott Street',
      meta: 'Industrial · Cobourg, Ontario',
      image: 'assets/images timeline/6_step.png',
      size: 'Core Industrial Asset',
      desc: 'A strategically positioned Canadian industrial asset providing high-capacity logistics, warehousing, and manufacturing infrastructure along the vital Highway 401 transportation corridor.',
      highlights: [
        'Strategic positioning along Ontario\'s Highway 401 logistics corridor.',
        'High-capacity manufacturing, warehousing, and logistics infrastructure.',
        'Durable long-term industrial operations supported by regional economic growth.'
      ]
    }
  };

  const titleEl = document.getElementById('modalTitle');
  const metaEl = document.getElementById('modalPropMeta');
  const sizeEl = document.getElementById('modalPropSize');
  const descEl = document.getElementById('modalPropDesc');
  const highlightsEl = document.getElementById('modalPropHighlights');
  const imgEl = document.getElementById('modalPropImg');
  const imgWrapEl = document.getElementById('modalHeroImgWrap');

  function openModal(key) {
    const data = propertyData[key];
    if (!data) return;

    if (titleEl) titleEl.textContent = data.title;
    if (metaEl) metaEl.textContent = data.meta;
    if (sizeEl) sizeEl.textContent = data.size;
    if (descEl) descEl.textContent = data.desc;
    if (highlightsEl) {
      highlightsEl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    }

    if (imgEl) {
      if (data.image) {
        imgEl.src = data.image;
        imgEl.alt = `${data.title} Photography`;
        if (imgWrapEl) imgWrapEl.style.display = 'block';
      } else {
        if (imgWrapEl) imgWrapEl.style.display = 'none';
      }
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const propKey = btn.getAttribute('data-open-modal');
      openModal(propKey);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* --- Consumer Brands Filter --- */
function initBrandFilter() {
  const filterBtns = document.querySelectorAll('.brand-filter-btn');
  const cards = document.querySelectorAll('.brand-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const status = btn.getAttribute('data-status');

      cards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        if (status === 'all' || cardStatus === status) {
          card.classList.remove('is-hidden');
          card.classList.add('is-revealed');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* --- Consumer Brands Modal --- */
function initBrandModal() {
  const modal = document.getElementById('brandModal');
  const closeBtn = document.getElementById('brandModalCloseBtn');
  const openBtns = document.querySelectorAll('[data-open-brand-modal]');

  if (!modal || !closeBtn || !openBtns.length) return;

  const brandData = {
    'mec': {
      title: 'Mountain Equipment Company (MEC)',
      meta: 'Outdoor Apparel & Equipment',
      image: 'assets/images timeline/14_step.png',
      logo: 'assets/brand-logos/mec-logo.svg',
      status: 'Majority Control · Flagship Holding',
      desc: 'Majority ownership in one of Canada\'s most beloved and recognized outdoor brands. Since 1971, MEC has equipped millions of Canadians for wilderness adventure, defined by durable technical gear and community stewardship.',
      highlights: [
        'National retail store network and premier Canadian outdoor community.',
        'High brand equity, member loyalty, and proprietary technical product design.',
        'Long-term operational scaling across omnichannel and supply chain networks.'
      ]
    },
    'tilley': {
      title: 'Tilley Endurables',
      meta: 'Headwear & Lifestyle',
      image: 'assets/images timeline/11_step.png',
      logo: 'assets/brand-logos/tilley-logo.png',
      status: 'Strategic Co-Owner · Heritage Brand',
      desc: 'Co-ownership in an iconic Canadian heritage brand recognized globally for lifetime durability, classic design, and superior sun protection. Backing modernization in manufacturing and international retail expansion.',
      highlights: [
        'Globally iconic Canadian heritage brand with worldwide export presence.',
        'Uncompromising commitment to lifetime craftsmanship and durable materials.',
        'Modernized product innovation and international direct-to-consumer expansion.'
      ]
    },
    'estar': {
      title: 'E.Star International',
      meta: 'Apparel Manufacturing & Supply Chain',
      image: 'assets/images timeline/2_step.png',
      logo: 'assets/brand-logos/estar-logo.png',
      status: '100% Owned · Toronto Facility',
      desc: 'More than 25 years of specialized Canadian apparel manufacturing, technical garment design, and end-to-end supply chain execution operating out of Toronto, Ontario.',
      highlights: [
        'Over two decades of domestic Canadian manufacturing excellence since 1999.',
        'End-to-end design, rapid sampling, and agile high-precision production.',
        'Direct global textile relationships providing resilient supply chain execution.'
      ]
    },
    'unisync': {
      title: 'Unisync Group',
      meta: 'Uniforms & Workwear',
      image: 'assets/images timeline/10_step.png',
      logo: 'assets/brand-logos/unisync-logo.png',
      status: 'Public Enterprise (TSX: UNI) · Executive Chairmanship',
      desc: 'Leadership and major investment in a publicly listed Canadian enterprise, serving as one of North America\'s premier providers of corporate workwear, protective apparel, and tactical uniforms.',
      highlights: [
        'Major supplier of managed corporate workwear across North America.',
        'High-covenant institutional and enterprise customer relationships.',
        'Advanced distribution infrastructure and proprietary ERP fulfillment logistics.'
      ]
    },
    'lattelove': {
      title: 'Lattelove · HUE',
      meta: 'Consumer Lifestyle',
      image: 'assets/images timeline/8_step.png',
      logo: 'assets/brand-logos/lattelove-logo.png',
      logo2: 'assets/brand-logos/hue-logo.png',
      status: 'Operating Platform · Omnichannel',
      desc: 'Dynamic consumer retail platforms focused on product design excellence, everyday comfort wear, direct customer relationships, and scalable multi-channel growth.',
      highlights: [
        'Contemporary consumer lifestyle apparel and everyday comfort products.',
        'Multi-channel distribution spanning direct e-commerce and wholesale partners.',
        'Disciplined brand building and responsive demand fulfillment.'
      ]
    },
    'roots': {
      title: 'Roots Canada',
      meta: 'Lifestyle Apparel · Realized Investment',
      image: 'assets/images timeline/9_step.png',
      logo: 'assets/brand-logos/roots-logo.png',
      status: 'Divested 2026 · Realized Investment',
      desc: 'A significant equity investment and strategic stewardship in an enduring Canadian consumer brand (TSX: ROOT). Successfully divested in 2026, realizing substantial long-term value following disciplined governance.',
      highlights: [
        'Stewardship and board governance from 2020 through 2026.',
        'Strengthened operational discipline and sustained brand resilience.',
        'Successful planned exit and full capital realization in 2026.'
      ]
    }
  };

  const titleEl = document.getElementById('brandModalTitle');
  const metaEl = document.getElementById('brandModalMeta');
  const statusEl = document.getElementById('brandModalStatus');
  const descEl = document.getElementById('brandModalDesc');
  const highlightsEl = document.getElementById('brandModalHighlights');
  const logoEl = document.getElementById('brandModalLogo');
  const logo2El = document.getElementById('brandModalLogo2');
  const heroImgEl = document.getElementById('brandModalHeroImg');
  const heroImgWrapEl = document.getElementById('brandModalImgWrap');

  function openModal(key) {
    const data = brandData[key];
    if (!data) return;

    if (titleEl) titleEl.textContent = data.title;
    if (metaEl) metaEl.textContent = data.meta;
    if (statusEl) statusEl.textContent = data.status;
    if (descEl) descEl.textContent = data.desc;
    if (highlightsEl) {
      highlightsEl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    }

    if (heroImgEl) {
      if (data.image) {
        heroImgEl.src = data.image;
        heroImgEl.alt = `${data.title} Photography`;
        if (heroImgWrapEl) heroImgWrapEl.style.display = 'block';
      } else {
        if (heroImgWrapEl) heroImgWrapEl.style.display = 'none';
      }
    }

    if (logoEl) {
      if (data.logo) {
        logoEl.src = data.logo;
        logoEl.alt = `${data.title} Logo`;
        logoEl.style.display = 'block';
      } else {
        logoEl.style.display = 'none';
      }
    }

    if (logo2El) {
      if (data.logo2) {
        logo2El.src = data.logo2;
        logo2El.alt = 'HUE Logo';
        logo2El.style.display = 'block';
      } else {
        logo2El.style.display = 'none';
      }
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const brandKey = btn.getAttribute('data-open-brand-modal');
      openModal(brandKey);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}


