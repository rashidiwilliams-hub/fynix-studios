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
