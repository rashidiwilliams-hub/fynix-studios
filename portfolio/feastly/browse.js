// Feastly — browse/landing page logic (index.html).

function ratingBadgeSVG() {
  return '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z"/></svg>';
}

function restaurantCardHTML(r) {
  return `
    <a class="restaurant-card" href="order.html?restaurant=${r.slug}" data-cuisine="${r.cuisine}">
      <div class="rc-image">
        <img src="${r.cover}" alt="${r.name} — ${r.cuisine}" loading="lazy">
        <span class="rc-type">${r.cuisine}</span>
        <span class="rc-badge">${ratingBadgeSVG()} ${r.rating.toFixed(1)}</span>
        <span class="rc-time">${r.deliveryTime}</span>
      </div>
      <div class="rc-body">
        <h3>${r.name}</h3>
        <span class="rc-cuisine">${r.cuisine}</span>
        <div class="rc-meta">
          <span>${r.priceLevel} · ${r.reviews} reviews</span>
          <span>${r.address.split(',')[0]}</span>
        </div>
        <span class="rc-cta">View menu <span aria-hidden="true">→</span></span>
      </div>
    </a>`;
}

function renderRestaurants(filterCuisine) {
  const grid = document.getElementById('restaurantGrid');
  if (!grid) return;
  const list = !filterCuisine || filterCuisine === 'All'
    ? RESTAURANTS
    : RESTAURANTS.filter(r => r.cuisine === filterCuisine);
  grid.innerHTML = list.map(restaurantCardHTML).join('') ||
    '<div class="empty-state">No restaurants match that cuisine yet.</div>';
}

function renderCuisineFilters() {
  const wrap = document.getElementById('cuisineFilters');
  if (!wrap) return;
  const cuisines = ['All', ...new Set(RESTAURANTS.map(r => r.cuisine))];
  wrap.innerHTML = cuisines.map((c, i) =>
    `<button class="cuisine-chip${i === 0 ? ' active' : ''}" data-cuisine="${c}">${c}</button>`
  ).join('');
  wrap.querySelectorAll('.cuisine-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      wrap.querySelectorAll('.cuisine-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderRestaurants(chip.dataset.cuisine);
    });
  });
}

function renderFooterCuisines() {
  const el = document.getElementById('footerCuisines');
  if (!el) return;
  const cuisines = [...new Set(RESTAURANTS.map(r => r.cuisine))];
  el.innerHTML = cuisines.map(c => `<li>${c}</li>`).join('');
}

function renderContinueOrderPill() {
  const pill = document.getElementById('continueOrderPill');
  if (!pill) return;
  const cart = loadCart();
  const n = cartCount(cart);
  if (!cart.restaurant || n === 0) { pill.hidden = true; return; }
  const r = getRestaurant(cart.restaurant);
  if (!r) { pill.hidden = true; return; }
  pill.hidden = false;
  pill.innerHTML = `<a class="continue-order-pill" href="order.html?restaurant=${r.slug}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
      Continue order · ${r.name} (${n})
    </a>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  renderCuisineFilters();
  renderRestaurants('All');
  renderFooterCuisines();
  renderContinueOrderPill();
});
