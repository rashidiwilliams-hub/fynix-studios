document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  const grid = document.getElementById('serviceGrid');
  document.getElementById('svcNext').addEventListener('click', () => grid.scrollBy({ left: 300, behavior: 'smooth' }));
  document.getElementById('svcPrev').addEventListener('click', () => grid.scrollBy({ left: -300, behavior: 'smooth' }));

  // Smooth-scroll nav/hero/CTA links
  document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
      if (link.closest('.main-nav')) link.classList.add('active');
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// ---------- Permanent link back to the Fynix Studios portfolio ----------
(function () {
  var link = document.createElement('a');
  link.href = '../../index.html';
  link.textContent = '← Back to Portfolio';
  link.style.cssText = 'position:fixed;bottom:18px;left:18px;z-index:99999;background:#111;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.9;transition:opacity .2s ease,transform .2s ease;';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = '0.9'; link.style.transform = 'translateY(0)'; });
  document.body.appendChild(link);
})();
