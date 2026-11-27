document.addEventListener('DOMContentLoaded', function () {
  // Preloader
  var loading = document.getElementById('loading');
  window.addEventListener('load', function () {
    setTimeout(function () { loading && loading.classList.add('loaded'); }, 300);
  });

  // Seasonal items hide themselves after their expiry date (data-expires, ISO with timezone)
  document.querySelectorAll('[data-expires]').forEach(function (el) {
    var t = Date.parse(el.getAttribute('data-expires'));
    if (!isNaN(t) && Date.now() > t) el.hidden = true;
  });

  // Sticky header + back-to-top visibility
  var header = document.getElementById('header-sticky');
  var backToTop = document.getElementById('back_to_top');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('header-sticky', window.scrollY > 150);
    if (typeof updateLogos === 'function') updateLogos();
    backToTop.classList.toggle('show', window.scrollY > 400);
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // "What's Included" accordion (service pages)
  document.querySelectorAll('.service-feature-item').forEach(function (item) {
    var row = item.querySelector('.service-feature-row');
    var desc = item.querySelector('.service-feature-desc');
    if (!row || !desc) return;
    row.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      row.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      desc.style.maxHeight = isOpen ? desc.scrollHeight + 'px' : '0px';
    });
  });

  // Mobile hero carousel (Swiper coverflow) — only exists below 767px,
  // so it's created/destroyed as that breakpoint is crossed rather than
  // left running (and measuring a hidden, zero-width container) on desktop.
  var mobileCarouselEl = document.querySelector('.tp-hero-carousel-mobile');
  var mobileCarouselInstance = null;

  function initMobileCarousel() {
    if (!mobileCarouselEl || typeof Swiper === 'undefined' || mobileCarouselInstance) return;
    if (!mobileCarouselEl.offsetWidth) return; // hidden/unmeasured: wait for layout (avoids Swiper loop warning)
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mobileCarouselInstance = new Swiper(mobileCarouselEl, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 3,
      slidesPerView: 1.5,
      spaceBetween: 16,
      coverflowEffect: { rotate: 0, slideShadows: false, stretch: 0, depth: 80, modifier: 2 },
      pagination: { el: mobileCarouselEl.querySelector('.swiper-pagination'), clickable: true },
      autoplay: reduceMotion ? false : { delay: 2600, disableOnInteraction: false },
      speed: reduceMotion ? 0 : 300
    });
  }
  function destroyMobileCarousel() {
    if (mobileCarouselInstance) {
      mobileCarouselInstance.destroy(true, true);
      mobileCarouselInstance = null;
    }
  }
  var mobileCarouselMQ = window.matchMedia('(max-width: 767px)');
  function handleMobileCarouselMQ(e) {
    if (e.matches) initMobileCarousel();
    else destroyMobileCarousel();
  }
  handleMobileCarouselMQ(mobileCarouselMQ);
  mobileCarouselMQ.addEventListener('change', handleMobileCarouselMQ);
  window.addEventListener('load', function () { handleMobileCarouselMQ(mobileCarouselMQ); });
  window.addEventListener('resize', function () { if (mobileCarouselMQ.matches) initMobileCarousel(); });

  // Nav overlay menu
  var menuToggle = document.getElementById('menu-toggle');
  var navOverlay = document.getElementById('nav-overlay');
  var navClose = document.getElementById('nav-close');

  function openMenu() {
    if (!navOverlay) return;
    navOverlay.classList.add('is-open');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    if (!navOverlay) return;
    navOverlay.classList.remove('is-open');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      if (navOverlay && navOverlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  if (navClose) navClose.addEventListener('click', closeMenu);
  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Text roll (per-letter hover reveal), staggered from center outward
  function buildTextRoll(el) {
    var text = el.textContent;
    var stagger = 0.035;
    var chars = text.split('');
    var mid = (chars.length - 1) / 2;

    el.textContent = '';
    el.classList.add('tp-text-roll');

    var top = document.createElement('span');
    top.className = 'tp-text-roll-row tp-text-roll-row-top';
    var bottom = document.createElement('span');
    bottom.className = 'tp-text-roll-row tp-text-roll-row-bottom';

    chars.forEach(function (ch, i) {
      var delay = (stagger * Math.abs(i - mid)).toFixed(3) + 's';
      [top, bottom].forEach(function (row) {
        var span = document.createElement('span');
        span.className = 'tp-text-roll-char';
        span.style.transitionDelay = delay;
        span.textContent = ch === ' ' ? ' ' : ch;
        row.appendChild(span);
      });
    });

    el.appendChild(top);
    el.appendChild(bottom);
  }
  document.querySelectorAll('.tp-nav-overlay-links a').forEach(buildTextRoll);
  document.querySelectorAll('.tp-hero-title span').forEach(buildTextRoll);

  // Theme switcher
  var themeToggle = document.getElementById('theme-toggle');
  var themedLogos = document.querySelectorAll('img[data-logo-dark]');
  var THEME_KEY = 'fynix-theme';
  var currentTheme = 'dark';

  function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    if (themeToggle) themeToggle.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    currentTheme = theme;
    updateLogos();
  }

  // Themed logos follow the theme, except the service-page header logo while it
  // floats over the navy hero (not sticky): that always uses the white logo.
  function updateLogos() {
    themedLogos.forEach(function (img) {
      var overHero = img.closest('.tp-service-header') && !img.closest('.tp-service-header.header-sticky');
      var dark = currentTheme === 'dark' || overHero;
      var next = dark ? img.getAttribute('data-logo-dark') : img.getAttribute('data-logo-light');
      if (next && img.getAttribute('src') !== next) img.src = next;
    });
  }

  if (themeToggle) {
    var savedTheme = 'dark';
    try {
      savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    } catch (e) {}
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', function () {
      var next = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  // Cursor trail (orange glow, desktop pointer devices only)
  var trailCanvas = document.getElementById('cursor-trail');
  var canRunTrail = trailCanvas
    && window.matchMedia('(hover: hover)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canRunTrail) {
    var ctx = trailCanvas.getContext('2d');
    var particles = [];
    var lastX = null;
    var lastY = null;

    function resizeTrailCanvas() {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    }
    resizeTrailCanvas();
    window.addEventListener('resize', resizeTrailCanvas);

    window.addEventListener('mousemove', function (e) {
      var x = e.clientX;
      var y = e.clientY;
      var dist = lastX === null ? 999 : Math.hypot(x - lastX, y - lastY);
      var steps = Math.min(Math.max(Math.floor(dist / 8), 1), 6);

      for (var i = 0; i < steps; i++) {
        var t = (i + 1) / steps;
        particles.push({
          x: lastX !== null ? lastX + (x - lastX) * t : x,
          y: lastY !== null ? lastY + (y - lastY) * t : y,
          life: 1,
          size: 14 + Math.random() * 10
        });
      }
      lastX = x;
      lastY = y;
      if (particles.length > 320) particles.splice(0, particles.length - 320);
    });

    (function renderTrail() {
      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.life -= 0.018;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        var radius = p.size * (0.6 + 0.4 * p.life);
        var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        gradient.addColorStop(0, 'rgba(255,90,38,' + (0.55 * p.life) + ')');
        gradient.addColorStop(1, 'rgba(255,90,38,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(renderTrail);
    })();
  }

  // Custom cursor dot (replaces the arrow on desktop pointer devices)
  var cursorDot = document.getElementById('cursor-dot');
  if (canRunTrail && cursorDot) {
    document.body.classList.add('tp-custom-cursor');

    var dotX = 0;
    var dotY = 0;
    var targetX = 0;
    var targetY = 0;
    var dotStarted = false;

    window.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!dotStarted) {
        dotX = targetX;
        dotY = targetY;
        dotStarted = true;
      }
      cursorDot.style.opacity = '1';
    });
    document.addEventListener('mouseleave', function () {
      cursorDot.style.opacity = '0';
    });

    (function animateDot() {
      dotX += (targetX - dotX) * 0.35;
      dotY += (targetY - dotY) * 0.35;
      cursorDot.style.transform = 'translate(' + dotX + 'px, ' + dotY + 'px) translate(-50%, -50%)';
      requestAnimationFrame(animateDot);
    })();

    var cursorInteractiveSelector = 'a, button, input, textarea, select, [role="button"]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(cursorInteractiveSelector)) {
        cursorDot.classList.add('is-active');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(cursorInteractiveSelector)) {
        cursorDot.classList.remove('is-active');
      }
    });
  }
});
