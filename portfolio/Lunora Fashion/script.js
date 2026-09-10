// ---------- Shared cart (persisted across pages via localStorage) ----------
const CART_KEY = 'lunora_cart';
const WISHLIST_KEY = 'lunora_wishlist';

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
function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = cartCount());
}

// ---------- Wishlist (persisted across pages via localStorage) ----------
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch (e) { return []; }
}
function setWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  updateWishlistBadge();
  syncFavButtons();
}
function isWishlisted(slug) { return getWishlist().includes(slug); }
function toggleWishlist(slug) {
  let list = getWishlist();
  if (list.includes(slug)) list = list.filter(s => s !== slug); else list.push(slug);
  setWishlist(list);
}
function updateWishlistBadge() {
  const n = getWishlist().length;
  const badge = document.getElementById('wishlistBadge');
  if (badge) { badge.textContent = n; badge.hidden = n === 0; }
}
function syncFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const card = btn.closest('[data-slug]');
    if (!card) return;
    const on = isWishlisted(card.dataset.slug);
    btn.textContent = on ? '♥' : '♡';
    btn.classList.toggle('active', on);
  });
  const pdpFav = document.querySelector('.pdp-fav[data-slug]');
  if (pdpFav) {
    const on = isWishlisted(pdpFav.dataset.slug);
    pdpFav.textContent = on ? '♥' : '♡';
    pdpFav.classList.toggle('active', on);
  }
}

// ---------- Product card rendering (home grid + related + wishlist + search) ----------
function productCardHTML(p) {
  return `
    <article class="product-card" data-slug="${p.slug}">
      <div class="card-img"><img src="${p.image}" alt="${p.alt}"><button class="fav-btn" aria-label="Favorite">♡</button></div>
      <h3>${p.name}</h3>
      <span class="price">$${p.price.toFixed(2)}</span>
      <div class="rating"><span class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</span><small>(${p.reviews})</small></div>
    </article>`;
}
function wireProductCards(container) {
  container.querySelectorAll('.product-card[data-slug]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn')) return;
      window.location.href = `product.html?id=${card.dataset.slug}`;
    });
  });
  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const card = this.closest('[data-slug]');
      if (card) toggleWishlist(card.dataset.slug);
    });
  });
  syncFavButtons();
}

function renderProductGrid(filterFn, title) {
  const grid = document.getElementById('productGrid');
  if (!grid || typeof PRODUCTS === 'undefined') return;
  const list = filterFn ? PRODUCTS.filter(filterFn) : PRODUCTS;
  grid.innerHTML = list.length
    ? list.map(productCardHTML).join('')
    : '<p class="no-results">No products found in this category yet — check back soon.</p>';
  wireProductCards(grid);
  const titleEl = document.getElementById('bestSellersTitle');
  const eyebrowEl = document.getElementById('bestSellersEyebrow');
  if (titleEl) titleEl.textContent = title ? `${title}` : 'Our Most Loved Picks';
  if (eyebrowEl) eyebrowEl.textContent = title ? title : 'Best Sellers';
}

// ---------- Overlays (cart / wishlist / search / account / info) ----------
function closeAllOverlays() {
  document.querySelectorAll('.drawer-overlay.open, .modal-overlay.open').forEach(o => o.classList.remove('open'));
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
        <img src="${p.image}" alt="${p.alt}">
        <div class="drawer-item-body">
          <strong>${p.name}</strong>
          <div class="drawer-item-price">$${p.price.toFixed(2)} × ${c.qty}</div>
          <div class="qty-stepper" data-slug="${p.slug}">
            <button class="qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="drawer-item-remove" data-remove="${p.slug}" aria-label="Remove">&times;</button>
      </div>`;
  }).join('');
  document.getElementById('cartSubtotal').textContent = `$${cartSubtotal().toFixed(2)}`;
}

function renderWishlistDrawer() {
  const list = document.getElementById('wishlistItems');
  const empty = document.getElementById('wishlistEmptyMsg');
  if (!list) return;
  const wishlist = getWishlist().map(findProduct).filter(Boolean);
  if (wishlist.length === 0) {
    list.innerHTML = '';
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  list.innerHTML = wishlist.map(p => `
    <div class="drawer-item" data-slug="${p.slug}">
      <img src="${p.image}" alt="${p.alt}">
      <div class="drawer-item-body">
        <strong>${p.name}</strong>
        <div class="drawer-item-price">$${p.price.toFixed(2)}</div>
        <a href="product.html?id=${p.slug}" class="link-arrow small">View →</a>
      </div>
      <button class="drawer-item-remove" data-unwish="${p.slug}" aria-label="Remove from wishlist">&times;</button>
    </div>
  `).join('');
}

function renderSearchResults(query) {
  const results = document.getElementById('searchResults');
  const empty = document.getElementById('searchEmptyMsg');
  if (!results || typeof PRODUCTS === 'undefined') return;
  const q = query.trim().toLowerCase();
  if (!q) { results.innerHTML = ''; if (empty) empty.hidden = true; return; }
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  if (matches.length === 0) {
    results.innerHTML = '';
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  results.innerHTML = matches.map(p => `
    <a class="drawer-item search-result" href="product.html?id=${p.slug}">
      <img src="${p.image}" alt="${p.alt}">
      <div class="drawer-item-body">
        <strong>${p.name}</strong>
        <div class="drawer-item-price">$${p.price.toFixed(2)} · ${p.category}</div>
      </div>
    </a>
  `).join('');
}

// ---------- Info modal content ----------
const INFO_CONTENT = {
  'contact': { title: 'Contact Us', body: '<p>We\'re happy to help with sizing, orders, or anything else.</p><p><strong>Email:</strong> support@lunora.example<br><strong>Phone:</strong> Mon–Fri, 9am–6pm</p>' },
  'shipping': { title: 'Shipping & Delivery', body: '<p>Free standard shipping on all orders over $99. Standard delivery takes 3–7 business days; express options are available at checkout.</p>' },
  'returns': { title: 'Returns & Exchanges', body: '<p>Not the right fit? Return any unworn item within 30 days for a full refund or exchange — no questions asked.</p>' },
  'size-guide': { title: 'Size Guide', body: '<table class="info-table"><tr><th>Size</th><th>Bust (in)</th><th>Waist (in)</th></tr><tr><td>XS</td><td>31–32</td><td>24–25</td></tr><tr><td>S</td><td>33–34</td><td>26–27</td></tr><tr><td>M</td><td>35–37</td><td>28–30</td></tr><tr><td>L</td><td>38–40</td><td>31–33</td></tr></table>' },
  'faqs': { title: 'FAQs', body: '<p><strong>How do I track my order?</strong> You\'ll receive a tracking link by email once your order ships.</p><p><strong>Do you ship internationally?</strong> Currently we ship within the US only.</p><p><strong>Can I change my order?</strong> Contact us within an hour of ordering and we\'ll do our best.</p>' },
  'our-story': { title: 'Our Story', body: '<p>Lunora started with a simple idea: timeless pieces shouldn\'t be complicated. Every collection is designed to mix, match, and last — comfort and elegance without compromise.</p>' },
  'sustainability': { title: 'Sustainability', body: '<p>We favor natural fibers, responsible production partners, and packaging that\'s fully recyclable. Fewer, better pieces — made to be worn for years.</p>' },
  'careers': { title: 'Careers', body: '<p>We\'re a small, hands-on team. If you love product, styling, or design and want to build something from the ground up, we\'d love to hear from you at careers@lunora.example.</p>' },
  'press': { title: 'Press', body: '<p>For press inquiries, samples, or interviews, reach out to press@lunora.example and we\'ll get back to you within two business days.</p>' },
  'store-locator': { title: 'Store Locator', body: '<p>We\'re currently online-only, so every order ships direct from our warehouse. No storefronts yet — but never say never.</p>' },
  'social-ig': { title: 'Instagram', body: '<p>This is a demo link — in a live store this would open our Instagram profile in a new tab.</p>' },
  'social-f': { title: 'Facebook', body: '<p>This is a demo link — in a live store this would open our Facebook page in a new tab.</p>' },
  'social-p': { title: 'Pinterest', body: '<p>This is a demo link — in a live store this would open our Pinterest profile in a new tab.</p>' },
  'social-tt': { title: 'TikTok', body: '<p>This is a demo link — in a live store this would open our TikTok profile in a new tab.</p>' }
};
function openInfoModal(key) {
  const entry = INFO_CONTENT[key];
  if (!entry) return;
  document.getElementById('infoTitle').textContent = entry.title;
  document.getElementById('infoBody').innerHTML = entry.body;
  openOverlay('infoModal');
}

// ---------- Category / sale filtering + smooth scroll ----------
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateWishlistBadge();

  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Home product grid (initial render + wiring)
  if (document.getElementById('productGrid') && typeof PRODUCTS !== 'undefined') {
    renderProductGrid(null, null);
  }

  // Smooth-scroll links
  document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      scrollToId(id);
    });
  });

  // Category filter links (category strip, style grid, footer)
  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.category;
      renderProductGrid(p => p.category === cat, cat);
      scrollToId('bestSellers');
    });
  });

  // Sale filter links
  document.querySelectorAll('[data-category-sale]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      renderProductGrid(p => p.sale === true, 'Sale');
      scrollToId('bestSellers');
    });
  });

  // Buttons that just scroll + reset filter
  document.querySelectorAll('[data-scroll-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      renderProductGrid(null, null);
      scrollToId(link.dataset.scrollTarget);
    });
  });

  const viewAllBtn = document.getElementById('viewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderProductGrid(null, null);
      scrollToId('bestSellers');
    });
  }
  const footerAllProducts = document.getElementById('footerAllProducts');
  if (footerAllProducts) {
    footerAllProducts.addEventListener('click', (e) => {
      e.preventDefault();
      renderProductGrid(null, null);
      scrollToId('bestSellers');
    });
  }

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

  // Wishlist drawer
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) wishlistBtn.addEventListener('click', () => { renderWishlistDrawer(); openOverlay('wishlistOverlay'); });
  const wishlistClose = document.getElementById('wishlistClose');
  if (wishlistClose) wishlistClose.addEventListener('click', closeAllOverlays);
  const wishlistItems = document.getElementById('wishlistItems');
  if (wishlistItems) {
    wishlistItems.addEventListener('click', (e) => {
      const unwishBtn = e.target.closest('[data-unwish]');
      if (unwishBtn) { toggleWishlist(unwishBtn.dataset.unwish); renderWishlistDrawer(); }
    });
  }

  // Search overlay
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      openOverlay('searchOverlay');
      if (searchInput) { searchInput.value = ''; renderSearchResults(''); setTimeout(() => searchInput.focus(), 100); }
    });
  }
  const searchClose = document.getElementById('searchClose');
  if (searchClose) searchClose.addEventListener('click', closeAllOverlays);
  if (searchInput) searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));

  // Account modal
  const accountBtn = document.getElementById('accountBtn');
  if (accountBtn) accountBtn.addEventListener('click', () => openOverlay('accountModal'));
  const accountClose = document.getElementById('accountClose');
  if (accountClose) accountClose.addEventListener('click', closeAllOverlays);
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('signInSuccess').hidden = false;
      signInForm.hidden = true;
    });
  }

  // Info modal (footer + social links)
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

  // Hero slide index cycler (decorative)
  const slides = document.querySelectorAll('.slide-index span');
  let current = 0;
  if (slides.length) {
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 3000);
  }

  // Watch lookbook placeholder
  const watchBtn = document.getElementById('watchLookbookBtn');
  if (watchBtn) {
    watchBtn.addEventListener('click', () => alert('Lookbook video coming soon!'));
  }

  // Newsletter forms
  ['joinForm', 'footerForm'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      const original = btn.textContent;
      btn.textContent = id === 'footerForm' ? '✓' : 'Subscribed ✓';
      e.target.reset();
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  });

  initProductPage();
});

// ---------- Product detail page ----------
function initProductPage() {
  const detail = document.getElementById('productDetail');
  if (!detail || typeof PRODUCTS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.slug === id) || PRODUCTS[0];

  document.title = `${product.name} — Lunora`;
  document.getElementById('crumbName').textContent = product.name;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
  const img = document.getElementById('productImage');
  img.src = product.image;
  img.alt = product.alt || product.name;
  document.getElementById('productStars').textContent = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
  document.getElementById('productReviewCount').textContent = `(${product.reviews} reviews)`;

  document.querySelectorAll('.size-group button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-group button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.color-group .color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-group .color-swatch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const qtyValue = document.getElementById('qtyValue');
  document.getElementById('qtyMinus').addEventListener('click', () => {
    qtyValue.textContent = Math.max(1, parseInt(qtyValue.textContent, 10) - 1);
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qtyValue.textContent = parseInt(qtyValue.textContent, 10) + 1;
  });

  const addBtn = document.getElementById('addToCartBtn');
  addBtn.addEventListener('click', () => {
    addToCart(product.slug, parseInt(qtyValue.textContent, 10));
    const original = addBtn.textContent;
    addBtn.textContent = 'Added ✓';
    addBtn.classList.add('added');
    setTimeout(() => {
      addBtn.textContent = original;
      addBtn.classList.remove('added');
    }, 1400);
  });

  const pdpFav = document.querySelector('.pdp-fav');
  if (pdpFav) {
    pdpFav.dataset.slug = product.slug;
    pdpFav.addEventListener('click', () => toggleWishlist(product.slug));
  }

  document.querySelectorAll('.pdp-tab-head').forEach(head => {
    head.addEventListener('click', () => {
      document.querySelectorAll('.pdp-tab-head').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.pdp-tab-panel').forEach(p => p.classList.remove('active'));
      head.classList.add('active');
      document.querySelector(`.pdp-tab-panel[data-tab-panel="${head.dataset.tab}"]`).classList.add('active');
    });
  });

  const relatedGrid = document.getElementById('relatedGrid');
  const related = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4);
  relatedGrid.innerHTML = related.map(productCardHTML).join('');
  wireProductCards(relatedGrid);

  syncFavButtons();
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
