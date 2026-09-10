function dishCardHTML(item) {
  return `
    <article class="dish-card" data-slug="${item.slug}">
      <div class="dish-img">
        <span class="dish-tag">${item.tag}</span>
        <img src="${item.image}" alt="${item.alt}">
      </div>
      <div class="dish-row"><h3>${item.name}</h3><span>$${item.price}</span></div>
    </article>`;
}

function wireDishGrid(container) {
  container.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = `dish.html?id=${card.dataset.slug}`;
    });
  });
}

// ---------- Overlays (reservation / info modals) ----------
function closeAllOverlays() {
  document.querySelectorAll('.modal-overlay.open').forEach(o => o.classList.remove('open'));
  const bodyOverlay = document.getElementById('bodyOverlay');
  if (bodyOverlay) bodyOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
function openOverlay(id) {
  closeAllOverlays();
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = false;
  void el.offsetWidth;
  el.classList.add('open');
  const bodyOverlay = document.getElementById('bodyOverlay');
  if (bodyOverlay) { bodyOverlay.hidden = false; void bodyOverlay.offsetWidth; bodyOverlay.classList.add('open'); }
  document.body.style.overflow = 'hidden';
}

const INFO_CONTENT = {
  'chef': { title: 'Meet The Chef', body: '<p>Our head chef trained in kitchens across three countries before settling on one simple idea: cook over live fire, source close to home, and get out of the ingredients\' way. Every seasonal menu at Ember starts in the same place — a conversation with the farmers and fishermen we work with each week.</p>' },
  'social-ig': { title: 'Instagram', body: '<p>This is a demo link — in a live site this would open our Instagram profile in a new tab.</p>' },
  'social-f': { title: 'Facebook', body: '<p>This is a demo link — in a live site this would open our Facebook page in a new tab.</p>' }
};
function openInfoModal(key) {
  const entry = INFO_CONTENT[key];
  if (!entry) return;
  document.getElementById('infoTitle').textContent = entry.title;
  document.getElementById('infoBody').innerHTML = entry.body;
  openOverlay('infoModal');
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const menuGrid = document.getElementById('menuGrid');
  if (menuGrid && typeof MENU !== 'undefined') {
    menuGrid.innerHTML = MENU.map(dishCardHTML).join('');
    wireDishGrid(menuGrid);
  }

  // Smooth-scroll nav links
  document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mainNav) mainNav.classList.remove('open');
    });
  });

  // Reservation modal triggers
  document.querySelectorAll('[data-open-reservation]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openOverlay('reservationModal');
      if (mainNav) mainNav.classList.remove('open');
    });
  });
  const reservationClose = document.getElementById('reservationClose');
  if (reservationClose) reservationClose.addEventListener('click', closeAllOverlays);
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      reservationForm.hidden = true;
      document.getElementById('reservationSuccess').hidden = false;
    });
  }

  // Info modal triggers (Meet the Chef / social)
  document.querySelectorAll('[data-info]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal(link.dataset.info);
    });
  });
  const infoClose = document.getElementById('infoClose');
  if (infoClose) infoClose.addEventListener('click', closeAllOverlays);

  const bodyOverlay = document.getElementById('bodyOverlay');
  if (bodyOverlay) bodyOverlay.addEventListener('click', closeAllOverlays);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllOverlays(); });

  initDishPage();
});

function initDishPage() {
  const detail = document.getElementById('dishDetail');
  if (!detail || typeof MENU === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const item = MENU.find(m => m.slug === id) || MENU[0];

  document.title = `${item.name} — Ember`;
  document.getElementById('crumbName').textContent = item.name;
  document.getElementById('dishTag').textContent = item.tag;
  document.getElementById('dishName').textContent = item.name;
  document.getElementById('dishPrice').textContent = `$${item.price}`;
  const img = document.getElementById('dishImage');
  img.src = item.image;
  img.alt = item.alt;

  document.querySelectorAll('.pdp-tab-head').forEach(head => {
    head.addEventListener('click', () => {
      document.querySelectorAll('.pdp-tab-head').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.pdp-tab-panel').forEach(p => p.classList.remove('active'));
      head.classList.add('active');
      document.querySelector(`.pdp-tab-panel[data-tab-panel="${head.dataset.tab}"]`).classList.add('active');
    });
  });

  const relatedGrid = document.getElementById('relatedGrid');
  const related = MENU.filter(m => m.slug !== item.slug).slice(0, 3);
  relatedGrid.innerHTML = related.map(dishCardHTML).join('');
  wireDishGrid(relatedGrid);
}

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
