/* ============================================================
   DOUBLE PARADIGM — FLAGSHIP EDITION
   Ultra-Premium Motion & Interaction System
   ============================================================ */

'use strict';

/* ── Utility: Wait for GSAP ────────────────────────────────── */
function waitForGSAP(callback) {
  if (window.gsap && window.ScrollTrigger) {
    callback();
    return;
  }
  
  const checkInterval = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(checkInterval);
      callback();
    }
  }, 50);
}

/* ── DOM Ready Init ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  splitHeroWords();
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initStatsCounter();
  initDemoForm();
  initAuditForm();
  initDemoToggle();
  initTestimonialsCarousel();
  initPageSpeedRing();
  initCookieConsent();
  initCaseStudyToggle();
  initOfflineGame();
  initChatbot();
  waitForGSAP(initGSAP);
});

/* ════════════════════════════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ════════════════════════════════════════════════════════════
   MOBILE NAVIGATION
   ════════════════════════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  
  if (!hamburger || !mobileNav) return;
  
  const toggleMenu = () => {
    const isOpen = mobileNav.classList.contains('open');
    
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // Prevent scroll on some browsers
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    hamburger.setAttribute('aria-expanded', !isOpen);
  };
  
  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };
  
  hamburger.addEventListener('click', toggleMenu);
  
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  elements.forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════════════════════════
   STATS COUNTER
   ════════════════════════════════════════════════════════════ */
function initStatsCounter() {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
  const target = element.getAttribute('data-count');
  const prefix = element.getAttribute('data-prefix') || '';
  const suffix = element.getAttribute('data-suffix') || '';
  
  const cleanValue = target.replace(/[^0-9.]/g, '');
  const isFloat = target.includes('.');
  
  if (isNaN(parseFloat(cleanValue))) {
    element.textContent = prefix + target + suffix;
    return;
  }
  
  const targetNumber = parseFloat(cleanValue);
  const duration = 2200;
  const startTime = performance.now();
  
  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Premium easing curve
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = targetNumber * eased;
    
    element.textContent = prefix + 
      (isFloat ? current.toFixed(1) : Math.floor(current)) + 
      suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = prefix + target + suffix;
    }
  };
  
  requestAnimationFrame(updateCounter);
}

/* ════════════════════════════════════════════════════════════
   GSAP ANIMATIONS (REFINED)
   ════════════════════════════════════════════════════════════ */
function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero Timeline (Ultra-Smooth)
  const heroTimeline = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: 1.2
    }
  });
  
  // Hero Badge
  heroTimeline.from('.hero-badge', {
    opacity: 0,
    y: 20,
    duration: 0.8
  }, 0.2);
  
  // Hero Headline Words
  const words = document.querySelectorAll('.hero-headline .word');
  if (words.length) {
    heroTimeline.from(words, {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 1.0
    }, 0.4);
  }
  
  // Hero Subtext
  heroTimeline.from('.hero-sub', {
    opacity: 0,
    y: 20,
    duration: 0.9
  }, 1.0);
  
  // Hero CTAs
  heroTimeline.from('.hero-ctas', {
    opacity: 0,
    y: 20,
    duration: 0.9
  }, 1.2);
  
  // Hero Cards (Refined Entry)
  const heroCards = document.querySelectorAll('.hero-card');
  if (heroCards.length) {
    heroTimeline.from(heroCards, {
      opacity: 0,
      x: 80,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out'
    }, 0.8);
  }
  
  // Browser Mockup Scroll Animation
  const mockup = document.querySelector('.browser-mockup');
  if (mockup) {
    gsap.from(mockup, {
      scrollTrigger: {
        trigger: mockup,
        start: 'top 75%',
        once: true
      },
      opacity: 0,
      y: 50,
      duration: 1.0,
      ease: 'power3.out'
    });
  }
}

/* ════════════════════════════════════════════════════════════
   DEMO FORM
   ════════════════════════════════════════════════════════════ */
function initDemoForm() {
  const form = document.getElementById('demoForm');
  const success = document.getElementById('demoSuccess');
  
  if (!form || !success) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = form.querySelector('#demoName');
    const consentCheckbox = form.querySelector('#demoConsent');
    
    if (!consentCheckbox.checked) {
      consentCheckbox.focus();
      return;
    }
    
    const userName = nameInput.value.trim() || 'there';
    const phoneInput = form.querySelector('#demoPhone');
    const phone = phoneInput ? phoneInput.value.trim() : '';

    // Construct WhatsApp message
    const message = `*New Consultation Request!*\n\n*Name:* ${userName}\n*Phone:* ${phone}`;
    const whatsappUrl = `https://wa.me/923119660535?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Smooth transition out
    if (window.gsap) {
      gsap.to(form, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          form.classList.add('hidden');
          success.querySelector('.demo-success-name').textContent = userName;
          success.classList.add('visible');
          
          gsap.fromTo(success,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        }
      });
    } else {
      form.classList.add('hidden');
      success.classList.add('visible');
    }
  });
}

/* ════════════════════════════════════════════════════════════
   AUDIT FORM
   ════════════════════════════════════════════════════════════ */
function initAuditForm() {
  const form = document.getElementById('auditForm');
  const success = document.getElementById('auditSuccess');
  
  if (!form || !success) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const checkbox = form.querySelector('#gdprConsent');
    
    if (!checkbox || !checkbox.checked) {
      if (checkbox) {
        const wrap = checkbox.closest('.form-checkbox-wrap');
        if (window.gsap && wrap) {
          gsap.to(wrap, {
            outline: '2px solid #EF4444',
            duration: 0.15,
            repeat: 3,
            yoyo: true,
            onComplete: () => {
              gsap.set(wrap, { outline: 'none' });
            }
          });
        }
        checkbox.focus();
      }
      return;
    }
    
    // Get form values
    const clinicName = document.getElementById('clinicName') ? document.getElementById('clinicName').value.trim() : '';
    const ownerName = document.getElementById('ownerName') ? document.getElementById('ownerName').value.trim() : '';
    const phone = document.getElementById('auditPhone') ? document.getElementById('auditPhone').value.trim() : '';
    const email = document.getElementById('auditEmail') ? document.getElementById('auditEmail').value.trim() : '';

    // Construct WhatsApp message
    const message = `*New Free Audit Request!*\n\n*Clinic:* ${clinicName}\n*Owner:* ${ownerName}\n*Phone:* ${phone}\n*Email:* ${email}`;
    const whatsappUrl = `https://wa.me/923119660535?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Smooth transition
    if (window.gsap) {
      gsap.to(form, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          form.classList.add('hidden');
          success.classList.add('visible');
          
          gsap.fromTo(success,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        }
      });
    } else {
      form.classList.add('hidden');
      success.classList.add('visible');
    }
  });
}

/* ════════════════════════════════════════════════════════════
   DEMO TOGGLE
   ════════════════════════════════════════════════════════════ */
function initDemoToggle() {
  const desktopBtn = document.getElementById('toggleDesktop');
  const mobileBtn = document.getElementById('toggleMobile');
  const mockup = document.querySelector('.browser-mockup');
  
  if (!desktopBtn || !mobileBtn || !mockup) return;
  
  const setView = (view) => {
    if (view === 'desktop') {
      mockup.classList.remove('mobile-view');
      desktopBtn.classList.add('active');
      mobileBtn.classList.remove('active');
      desktopBtn.setAttribute('aria-pressed', 'true');
      mobileBtn.setAttribute('aria-pressed', 'false');
    } else {
      mockup.classList.add('mobile-view');
      mobileBtn.classList.add('active');
      desktopBtn.classList.remove('active');
      mobileBtn.setAttribute('aria-pressed', 'true');
      desktopBtn.setAttribute('aria-pressed', 'false');
    }
  };
  
  desktopBtn.addEventListener('click', () => setView('desktop'));
  mobileBtn.addEventListener('click', () => setView('mobile'));
}

/* ════════════════════════════════════════════════════════════
   TESTIMONIALS CAROUSEL
   ════════════════════════════════════════════════════════════ */
function initTestimonialsCarousel() {
  const carousel = document.getElementById('testimonialsCarousel');
  if (!carousel) return;
  
  const inner = carousel.querySelector('.carousel-inner');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const slides = carousel.querySelectorAll('.carousel-slide');
  
  if (!inner || !slides.length) return;
  
  let currentIndex = 0;
  let autoplayTimer = null;
  let touchStartX = 0;
  
  const goToSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive);
    });
  };
  
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  };
  
  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });
  
  // Touch support
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Smooth threshold for swipe
    if (Math.abs(diff) > 40) {
      goToSlide(currentIndex + (diff > 0 ? 1 : -1));
    }
    
    startAutoplay();
  }, { passive: true });
  
  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  
  // Initialize
  goToSlide(0);
  startAutoplay();
}

/* ════════════════════════════════════════════════════════════
   PAGESPEED RING ANIMATION
   ════════════════════════════════════════════════════════════ */
function initPageSpeedRing() {
  const ring = document.querySelector('.pagespeed-ring-fill');
  if (!ring) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          ring.classList.add('animated');
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(ring);
}

/* ════════════════════════════════════════════════════════════
   HERO HEADLINE WORD SPLITTER
   ════════════════════════════════════════════════════════════ */
function splitHeroWords() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;
  
  const text = headline.textContent.trim();
  const words = text.split(' ');
  
  headline.innerHTML = words
    .map(word => `<span class="word">${word}</span>`)
    .join(' ');
}

// Performance monitoring removed for production. Use Lighthouse for accurate metrics.
/* ------------------------------------------------------------
   COOKIE CONSENT
   ------------------------------------------------------------ */
function initCookieConsent() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  
  if (!banner || !acceptBtn || !declineBtn) return;
  
  const hasConsented = localStorage.getItem('cookieConsent');
  
  if (!hasConsented) {
    setTimeout(() => {
      banner.classList.add('visible');
    }, 2000);
  }
  
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.classList.remove('visible');
    console.log('Cookies accepted');
  });
  
  declineBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.classList.remove('visible');
    console.log('Cookies declined');
  });
}

/* ════════════════════════════════════════════════════════════
   CASE STUDY TOGGLE
   ════════════════════════════════════════════════════════════ */
function initCaseStudyToggle() {
  const cards = document.querySelectorAll('.case-study-card');
  
  cards.forEach(card => {
    const btnBefore = card.querySelector('.btn-before');
    const btnAfter = card.querySelector('.btn-after');
    const imgBefore = card.querySelector('.case-img-before');
    const imgAfter = card.querySelector('.case-img-after');
    
    if (!btnBefore || !btnAfter || !imgBefore || !imgAfter) return;
    
    btnBefore.addEventListener('click', () => {
      btnBefore.classList.add('active');
      btnAfter.classList.remove('active');
      imgBefore.classList.add('active');
      imgAfter.classList.remove('active');
    });
    
    btnAfter.addEventListener('click', () => {
      btnAfter.classList.add('active');
      btnBefore.classList.remove('active');
      imgAfter.classList.add('active');
      imgBefore.classList.remove('active');
    });
  });
}

/* ════════════════════════════════════════════════════════════
   OFFLINE GAME LOGIC
   ════════════════════════════════════════════════════════════ */
function initOfflineGame() {
  const gameOverlay = document.getElementById('offlineGame');
  if (!gameOverlay) return;
  
  const checkConnection = () => {
    if (!navigator.onLine) {
      gameOverlay.classList.add('visible');
      startMiniGame();
    } else {
      gameOverlay.classList.remove('visible');
    }
  };
  
  window.addEventListener('offline', checkConnection);
  window.addEventListener('online', checkConnection);
  
  // Also check on load
  checkConnection();
}

function startMiniGame() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;

  // Prevent multiple game loops
  if (canvas._gameRunning) return;
  canvas._gameRunning = true;

  const ctx = canvas.getContext('2d');
  const W = canvas.width  = Math.min(600, window.innerWidth - 32);
  const H = canvas.height = 200;
  const GROUND = H - 20;

  // Brand colours
  const C_BG      = '#f0ece6';
  const C_DARK    = '#1b3a5c';
  const C_GOLD    = '#c4a882';
  const C_WHITE   = '#ffffff';

  let score = 0, frame = 0, speed = 5, gameState = 'playing';
  let rafId = null, nextObstacle = 80;

  const player = {
    x: 60, y: GROUND - 36, w: 28, h: 36,
    dy: 0, jumpForce: -11, gravity: 0.55, grounded: true
  };
  const obstacles = [];

  // --- Draw a tooth shape ---
  function drawTooth(x, y, w, h) {
    ctx.fillStyle = C_DARK;
    // Body
    ctx.beginPath();
    ctx.roundRect(x, y + h * 0.3, w, h * 0.7, [0, 0, 6, 6]);
    ctx.fill();
    // Left bump
    ctx.beginPath();
    ctx.arc(x + w * 0.27, y + h * 0.32, w * 0.27, Math.PI, 0);
    ctx.fill();
    // Right bump
    ctx.beginPath();
    ctx.arc(x + w * 0.73, y + h * 0.32, w * 0.27, Math.PI, 0);
    ctx.fill();
    // Shine
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.beginPath();
    ctx.ellipse(x + w * 0.33, y + h * 0.56, w * 0.09, h * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Draw a lollipop / candy shape ---
  function drawCandy(x, y, w, h) {
    ctx.fillStyle = C_GOLD;
    // Stick
    ctx.fillRect(x + w * 0.4, y, w * 0.2, h * 0.6);
    // Head
    ctx.beginPath();
    ctx.arc(x + w * 0.5, y + h * 0.65, w * 0.38, 0, Math.PI * 2);
    ctx.fill();
    // Stripe
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x + w * 0.5, y + h * 0.65, w * 0.38, -0.8, 0.8);
    ctx.stroke();
  }

  // --- Draw static scene ---
  function drawScene() {
    ctx.fillStyle = C_BG;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = C_DARK;
    ctx.fillRect(0, GROUND, W, 2);
    // Scrolling dashes
    ctx.fillStyle = 'rgba(27,58,92,0.12)';
    const offset = (frame * speed * 0.5) % 40;
    for (let i = -40 + offset; i < W; i += 40) {
      ctx.fillRect(i, GROUND + 8, 20, 3);
    }
  }

  // --- Score HUD ---
  function drawScore() {
    ctx.fillStyle = C_DARK;
    ctx.font = 'bold 13px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Score: ' + score, W - 12, 20);
    ctx.textAlign = 'left';
    // Hint on first few frames
    if (frame < 120) {
      ctx.fillStyle = 'rgba(27,58,92,0.5)';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.fillText('Tap or SPACE to jump', 12, 20);
    }
  }

  // --- Game Over screen (drawn on canvas) ---
  function drawGameOver() {
    // Backdrop
    ctx.fillStyle = 'rgba(27,58,92,0.82)';
    ctx.fillRect(0, 0, W, H);

    // Card
    const pw = 260, ph = 118, px = (W - pw) / 2, py = (H - ph) / 2;
    ctx.fillStyle = C_WHITE;
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 14);
    ctx.fill();

    // Title
    ctx.fillStyle = C_DARK;
    ctx.font = 'bold 19px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', W / 2, py + 35);

    // Sub-text
    ctx.fillStyle = '#5a7a9c';
    ctx.font = '13px Inter, system-ui, sans-serif';
    ctx.fillText('You dodged ' + score + (score === 1 ? ' sweet' : ' sweets'), W / 2, py + 58);

    // Play Again button
    const bw = 136, bh = 34, bx = (W - bw) / 2, by = py + ph - bh - 12;
    ctx.fillStyle = C_GOLD;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.fillStyle = C_WHITE;
    ctx.font = 'bold 13px Inter, system-ui, sans-serif';
    ctx.fillText('Play Again', W / 2, by + 23);
    ctx.textAlign = 'left';

    canvas._btn = { x: bx, y: by, w: bw, h: bh };
  }

  // --- Jump / restart ---
  function jump() {
    if (gameState === 'playing' && player.grounded) {
      player.dy = player.jumpForce;
      player.grounded = false;
    } else if (gameState === 'over') {
      resetGame();
    }
  }

  function resetGame() {
    score = 0; frame = 0; speed = 5; nextObstacle = 80;
    gameState = 'playing';
    obstacles.length = 0;
    player.y = GROUND - player.h;
    player.dy = 0; player.grounded = true;
    canvas._btn = null;
    loop();
  }

  // --- Main loop ---
  function loop() {
    rafId = requestAnimationFrame(loop);

    if (gameState === 'playing') {
      frame++;
      speed = 5 + Math.floor(score / 5) * 0.5;

      // Physics
      player.dy += player.gravity;
      player.y  += player.dy;
      if (player.y >= GROUND - player.h) {
        player.y = GROUND - player.h;
        player.dy = 0;
        player.grounded = true;
      }

      // Spawn
      if (frame >= nextObstacle) {
        obstacles.push({ x: W, y: GROUND - 38, w: 24, h: 38 });
        nextObstacle = frame + Math.floor(Math.random() * 60) + 65;
      }

      // Move & collide
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= speed;
        const m = 5;
        const p = player, o = obstacles[i];
        if (p.x + m < o.x + o.w - m && p.x + p.w - m > o.x + m &&
            p.y + m < o.y + o.h     && p.y + p.h > o.y + m) {
          gameState = 'over';
          cancelAnimationFrame(rafId);
          drawScene();
          drawTooth(p.x, p.y, p.w, p.h);
          obstacles.forEach(ob => drawCandy(ob.x, ob.y, ob.w, ob.h));
          drawScore();
          drawGameOver();
          return;
        }
        if (obstacles[i].x + obstacles[i].w < 0) {
          obstacles.splice(i, 1);
          score++;
        }
      }
    }

    drawScene();
    drawTooth(player.x, player.y, player.w, player.h);
    obstacles.forEach(o => drawCandy(o.x, o.y, o.w, o.h));
    drawScore();
  }

  // --- Input handlers ---
  const onKey = (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
  };

  const onPointer = (e) => {
    // Check Play Again button hit
    if (gameState === 'over' && canvas._btn) {
      const rect = canvas.getBoundingClientRect();
      const sx = W / rect.width, sy = H / rect.height;
      const src = e.touches ? e.touches[0] : e;
      const cx = (src.clientX - rect.left) * sx;
      const cy = (src.clientY - rect.top) * sy;
      const b = canvas._btn;
      if (cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h) {
        resetGame(); return;
      }
    }
    jump();
  };

  document.addEventListener('keydown', onKey);
  canvas.addEventListener('click',      onPointer);
  canvas.addEventListener('touchstart', onPointer, { passive: true });

  // Cleanup on reconnect
  window.addEventListener('online', () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener('keydown', onKey);
    canvas.removeEventListener('click',      onPointer);
    canvas.removeEventListener('touchstart', onPointer);
    canvas._gameRunning = false;
  }, { once: true });

  loop();
}


/* ════════════════════════════════════════════════════════════
   AI CHATBOT LOGIC
   ════════════════════════════════════════════════════════════ */
function initChatbot() {
  const chatbot = document.getElementById('smileChatbot');
  const fab = document.getElementById('chatbotFab');
  const window_el = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const messagesContainer = document.getElementById('chatbotMessages');
  const sendBtn = document.getElementById('chatbotSend');

  if (!chatbot || !fab || !window_el || !form) return;

  // API Config
  const API_KEY = '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';
  const MODEL = 'openai/gpt-oss-120b:free';
  
  let chatHistory = [
    { 
      role: "system", 
      content: "You are the Smile AI Assistant for 'Smile Dental Care', a premium luxury dental clinic. You are professional, polite, and helpful. You provide information about cosmetic dentistry (Invisalign, implants, whitening, veneers) and general dentistry. Always encourage booking a free consultation. Keep responses concise and formatted for a small chat window. If you don't know something, offer to have a human team member call them back." 
    }
  ];

  // Toggle Chat
  const toggleChat = () => {
    const isActive = window_el.classList.contains('active');
    window_el.classList.toggle('active');
    fab.querySelector('.fab-badge').style.display = 'none';
    
    if (!isActive) {
      setTimeout(() => input.focus(), 500);
    }
  };

  fab.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (window_el.classList.contains('active') && 
        !window_el.contains(e.target) && 
        !fab.contains(e.target)) {
      toggleChat();
    }
  });

  // Handle Quick Actions
  const quickActions = document.querySelectorAll('.chat-pill');
  quickActions.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove emoji/spaces from the beginning
      const text = btn.textContent.replace(/^[^\w]+/, '').trim();
      input.value = `Tell me more about ${text}`;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
  });

  // Auto-resize input
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = (input.scrollHeight) + 'px';
  });

  // Handle Send
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    // Add User Message
    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    // Disable input while thinking
    input.disabled = true;
    sendBtn.disabled = true;

    // Add Thinking Indicator
    const typingIndicator = addTypingIndicator();
    
    try {
      chatHistory.push({ role: "user", content: message });

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "Smile Dental Care Assistant",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: MODEL,
          messages: chatHistory
        })
      });

      const data = await response.json();
      const aiMessage = data.choices[0].message.content;

      // Remove typing indicator and add AI message
      typingIndicator.remove();
      addMessage(aiMessage, 'assistant');
      chatHistory.push({ role: "assistant", content: aiMessage });

    } catch (error) {
      console.error("AI Chat Error:", error);
      typingIndicator.remove();
      addMessage("I'm sorry, I'm having trouble connecting right now. Please try again or call us directly.", 'assistant');
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });

  function addMessage(text, role) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let wrapper = document.createElement('div');
    
    if (role === 'assistant') {
      wrapper.className = 'message-row';
      wrapper.innerHTML = `
        <div class="message-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
            <path d="M7 10s1 1 5 1 5-1 5-1"/>
          </svg>
        </div>
        <div class="message assistant">
          <div class="message-content">${text}</div>
          <div class="message-time">${time}</div>
        </div>
      `;
    } else {
      wrapper.className = `message ${role}`;
      wrapper.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${time}</div>
      `;
    }
    
    messagesContainer.appendChild(wrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Animation
    if (window.gsap) {
      gsap.from(wrapper, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }

  function addTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-row';
    wrapper.innerHTML = `
      <div class="message-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
          <path d="M7 10s1 1 5 1 5-1 5-1"/>
        </svg>
      </div>
      <div class="message assistant">
        <div class="typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(wrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return wrapper;
  }
}
