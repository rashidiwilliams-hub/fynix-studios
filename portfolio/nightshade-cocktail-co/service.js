document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const service = SERVICES.find(s => s.slug === id) || SERVICES[0];

  document.title = `${service.name} — Nightshade`;
  document.getElementById('crumbName').textContent = service.name;
  document.getElementById('serviceName').textContent = service.name;
  document.getElementById('serviceExcerpt').textContent = service.excerpt;
  const img = document.getElementById('serviceImage');
  img.src = service.image;
  img.alt = service.alt;

  const relatedGrid = document.getElementById('relatedGrid');
  const related = SERVICES.filter(s => s.slug !== service.slug);
  relatedGrid.innerHTML = related.map(s => `
    <article class="service-card">
      <div class="service-img"><img src="${s.image}" alt="${s.alt}"></div>
      <h3>${s.name}</h3>
      <p>${s.excerpt}</p>
      <a href="service.html?id=${s.slug}" class="link-arrow">Learn More →</a>
    </article>
  `).join('');
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
