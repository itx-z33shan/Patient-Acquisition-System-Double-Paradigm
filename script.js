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
    document.body.style.overflow = isOpen ? '' : 'hidden';
    
    hamburger.setAttribute('aria-expanded', !isOpen);
  };
  
  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
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
    
    if (Math.abs(diff) > 50) {
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

/* ════════════════════════════════════════════════════════════
   PERFORMANCE MONITORING (Optional Debug)
   ════════════════════════════════════════════════════════════ */
if (window.performance && window.performance.mark) {
  performance.mark('app-initialized');
  
  window.addEventListener('load', () => {
    performance.mark('app-fully-loaded');
    
    if (console.log) {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('⚡ Performance:', {
        DOMContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
        FullLoad: Math.round(perfData.loadEventEnd - perfData.fetchStart)
      });
    }
  });
}