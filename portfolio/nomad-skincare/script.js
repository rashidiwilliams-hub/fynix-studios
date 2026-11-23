// ---------- Shared cart (persisted across pages via localStorage) ----------
const CART_KEY = 'nomadskincare_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function getCartQty(slug) {
  const entry = getCart().find(c => c.slug === slug);
  return entry ? entry.qty : 0;
}
function addToCart(slug, qty) {
  const cart = getCart();
  const entry = cart.find(c => c.slug === slug);
  if (entry) entry.qty += qty; else cart.push({ slug, qty });
  setCart(cart);
}
function setCartQty(slug, qty) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter(c => c.slug !== slug);
  else {
    const entry = cart.find(c => c.slug === slug);
    if (entry) entry.qty = qty; else cart.push({ slug, qty });
  }
  setCart(cart);
}
function removeFromCart(slug) { setCart(getCart().filter(c => c.slug !== slug)); }
function cartCount() { return getCart().reduce((s, c) => s + c.qty, 0); }
function findProduct(slug) {
  return (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.slug === slug) : null;
}
function cartSubtotal() {
  return getCart().reduce((s, c) => {
    const p = findProduct(c.slug);
    return p ? s + p.price * c.qty : s;
  }, 0);
}
function formatMoney(n) { return `G$${Math.round(n).toLocaleString('en-US')}`; }
function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = cartCount());
}

function starsHTML(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function productCardHTML(p) {
  return `
    <article class="product-card" data-slug="${p.slug}">
      <div class="card-img"><img src="${p.images[0]}" alt="${p.alt}"></div>
      <h3>${p.name}</h3>
      <p class="card-desc">${p.lead}</p>
      <div class="card-bottom">
        <span class="card-price">${formatMoney(p.price)}</span>
        <button class="add-btn" aria-label="Add to cart" data-qty-add="${p.slug}">+</button>
      </div>
    </article>`;
}

function wireProductGrid(grid) {
  if (!grid) return;
  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      addToCart(this.dataset.qtyAdd, 1);
      const original = this.innerHTML;
      this.textContent = '✓';
      this.classList.add('added');
      setTimeout(() => { this.innerHTML = original; this.classList.remove('added'); }, 1200);
    });
  });
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-btn')) return;
      window.location.href = `product.html?id=${card.dataset.slug}`;
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(10px);background:#1c1a17;color:#fff;font-family:inherit;font-size:13px;font-weight:600;padding:10px 18px;border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,0.25);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:99999;white-space:nowrap;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2200);
}

// ---------- Cart drawer ----------
function closeAllOverlays() {
  document.querySelectorAll('.drawer-overlay.open').forEach(o => o.classList.remove('open'));
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

function renderCartDrawer() {
  const cart = getCart();
  const list = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmptyMsg');
  const foot = document.getElementById('cartFoot');
  if (!list) return;
  if (cart.length === 0) {
    list.innerHTML = '';
    if (empty) empty.hidden = false;
    if (foot) foot.hidden = true;
    return;
  }
  if (empty) empty.hidden = true;
  if (foot) foot.hidden = false;
  list.innerHTML = cart.map(c => {
    const p = findProduct(c.slug);
    if (!p) return '';
    return `
      <div class="drawer-item" data-slug="${p.slug}">
        <img src="${p.images[0]}" alt="${p.alt}">
        <div class="drawer-item-body">
          <strong>${p.name}</strong>
          <div class="drawer-item-price">${formatMoney(p.price)} × ${c.qty}</div>
          <div class="qty-stepper" data-slug="${p.slug}">
            <button class="qty-btn qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="drawer-item-remove" data-remove="${p.slug}" aria-label="Remove">✕</button>
      </div>`;
  }).join('');
  document.getElementById('cartSubtotal').textContent = formatMoney(cartSubtotal());
}

// ---------- Mobile nav toggle ----------
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => { nav.classList.remove('open'); toggle.classList.remove('open'); });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initMobileNav();
  initHomePage();
  initShopPage();
  initProductPage();

  document.querySelectorAll('[data-category-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `shop.html?category=${encodeURIComponent(link.dataset.categoryLink)}`;
    });
  });

  // Cart drawer
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', () => { renderCartDrawer(); openOverlay('cartOverlay'); });
  const cartClose = document.getElementById('cartClose');
  if (cartClose) cartClose.addEventListener('click', closeAllOverlays);
  const cartItems = document.getElementById('cartItems');
  if (cartItems) {
    cartItems.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) { removeFromCart(removeBtn.dataset.remove); renderCartDrawer(); return; }
      const plusBtn = e.target.closest('.qty-plus');
      if (plusBtn) { const slug = plusBtn.closest('.qty-stepper').dataset.slug; setCartQty(slug, getCartQty(slug) + 1); renderCartDrawer(); return; }
      const minusBtn = e.target.closest('.qty-minus');
      if (minusBtn) { const slug = minusBtn.closest('.qty-stepper').dataset.slug; setCartQty(slug, getCartQty(slug) - 1); renderCartDrawer(); return; }
    });
  }
  const bodyOverlay = document.getElementById('bodyOverlay');
  if (bodyOverlay) bodyOverlay.addEventListener('click', closeAllOverlays);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllOverlays(); });

  document.getElementById('accountBtn')?.addEventListener('click', () => showToast('Account — demo only'));
  document.getElementById('searchBtn')?.addEventListener('click', () => showToast('Search — demo only'));

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      newsletterForm.reset();
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  }
});

// ---------- Home page ----------
function initHomePage() {
  const grid = document.getElementById('bestSellersGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(0, 5).map(productCardHTML).join('');
  wireProductGrid(grid);
}

// ---------- Shop page ----------
function initShopPage() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const tabs = document.getElementById('shopTabs');
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') && categories.includes(params.get('category')) ? params.get('category') : 'All';

  function render() {
    const list = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
    grid.innerHTML = list.length ? list.map(productCardHTML).join('') : '<p class="no-results">No products found.</p>';
    wireProductGrid(grid);
    const countEl = document.getElementById('shopCount');
    if (countEl) countEl.textContent = `${list.length} ${list.length === 1 ? 'product' : 'products'}`;
  }

  if (tabs) {
    tabs.innerHTML = categories.map(c => `<button class="shop-tab${c === activeCategory ? ' active' : ''}" data-category="${c}">${c}</button>`).join('');
    tabs.querySelectorAll('.shop-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeCategory = tab.dataset.category;
        tabs.querySelectorAll('.shop-tab').forEach(t => t.classList.toggle('active', t === tab));
        render();
      });
    });
  }
  render();
}

// ---------- Product detail page ----------
function initProductPage() {
  const detail = document.getElementById('productDetail');
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const product = PRODUCTS.find(p => p.slug === params.get('id')) || PRODUCTS[0];

  document.title = `${product.name} — Nomad Skincare`;
  document.getElementById('crumbCategory').textContent = product.category;
  document.getElementById('crumbCategory').href = `shop.html?category=${encodeURIComponent(product.category)}`;
  document.getElementById('crumbName').textContent = product.name;
  document.getElementById('crumbCategoryTag').textContent = product.category;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productStars').textContent = starsHTML(product.rating);
  document.getElementById('productReviewCount').textContent = `(${product.reviews} reviews)`;
  document.getElementById('productLead').textContent = product.lead;
  document.getElementById('productIngredients').textContent = product.ingredients;
  document.getElementById('productSuited').textContent = product.suited;
  document.getElementById('productFormat').textContent = product.format;
  document.getElementById('productRoutine').textContent = product.routine;
  document.getElementById('productPrice').textContent = formatMoney(product.price);

  const mainImage = document.getElementById('mainImage');
  mainImage.src = product.images[0];
  mainImage.alt = product.alt;
  const thumbWrap = document.getElementById('thumbWrap');
  if (product.images.length > 1) {
    thumbWrap.innerHTML = product.images.map((img, i) => `<button class="thumb-btn${i === 0 ? ' active' : ''}" data-src="${img}"><img src="${img}" alt=""></button>`).join('');
    thumbWrap.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        mainImage.src = btn.dataset.src;
        thumbWrap.querySelectorAll('.thumb-btn').forEach(b => b.classList.toggle('active', b === btn));
      });
    });
  } else {
    thumbWrap.hidden = true;
  }

  let qty = 1;
  const qtyValue = document.getElementById('qtyValue');
  document.getElementById('qtyPlus').addEventListener('click', () => { qty += 1; qtyValue.textContent = qty; });
  document.getElementById('qtyMinus').addEventListener('click', () => { qty = Math.max(1, qty - 1); qtyValue.textContent = qty; });

  const cartBtn = document.getElementById('addToCartBtn');
  cartBtn.addEventListener('click', () => {
    addToCart(product.slug, qty);
    const original = cartBtn.textContent;
    cartBtn.textContent = 'Added ✓';
    cartBtn.classList.add('added');
    setTimeout(() => { cartBtn.textContent = original; cartBtn.classList.remove('added'); }, 1400);
  });

  const grid = document.getElementById('relatedGrid');
  const related = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4);
  grid.innerHTML = related.map(productCardHTML).join('');
  wireProductGrid(grid);
}

// ---------- Permanent link back to the Fynix Studios portfolio ----------
(function () {
  var style = document.createElement('style');
  style.textContent = '.fynix-back-link{position:fixed;bottom:18px;left:18px;z-index:9000;background:#1c1a17;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:4px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.85;transition:opacity .2s ease,transform .2s ease;display:inline-flex;align-items:center;gap:6px;}' +
    '@media (max-width:640px){.fynix-back-link{left:auto;right:14px;bottom:80px;padding:0;width:40px;height:40px;justify-content:center;border-radius:50%;}.fynix-back-link .fynix-back-label{display:none;}}';
  document.head.appendChild(style);
  var link = document.createElement('a');
  link.href = '../../index.html';
  link.className = 'fynix-back-link';
  link.setAttribute('aria-label', 'Back to Portfolio');
  link.innerHTML = '<span aria-hidden="true">←</span><span class="fynix-back-label">Back to Portfolio</span>';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = ''; link.style.transform = ''; });
  document.body.appendChild(link);
})();
