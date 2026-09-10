// ---------- Vector icon set (inline SVG, no external icon font/clipart) ----------
const ICONS = {
  search: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" stroke-miterlimit="10"/><line x1="338.29" y1="338.29" x2="448" y2="448" stroke-linecap="round" stroke-miterlimit="10"/></svg>',
  person: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z" stroke-miterlimit="10"/></svg>',
  heart: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M352.92,80C288,80,256,144,256,144s-32-64-96.92-64C106.32,80,64.54,124.14,64,176.81c-1.1,109.33,86.73,187.08,183,252.42a16,16,0,0,0,18,0c96.26-65.34,184.09-143.09,183-252.42C447.46,124.14,405.68,80,352.92,80Z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bag: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M80,176a16,16,0,0,0-16,16V408c0,30.24,25.76,56,56,56H392c30.24,0,56-24.51,56-54.75V192a16,16,0,0,0-16-16Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M160,176V144a96,96,0,0,1,96-96h0a96,96,0,0,1,96,96v32" stroke-linecap="round" stroke-linejoin="round"/><path d="M160,224v16a96,96,0,0,0,96,96h0a96,96,0,0,0,96-96V224" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="40"><line x1="368" y1="368" x2="144" y2="144" stroke-linecap="round" stroke-linejoin="round"/><line x1="368" y1="144" x2="144" y2="368" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  medal: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="28"><circle cx="256" cy="352" r="112" stroke-linecap="round" stroke-linejoin="round"/><circle cx="256" cy="352" r="48" stroke-linecap="round" stroke-linejoin="round"/><path d="M147,323,41.84,159.32a32,32,0,0,1-1.7-31.61l31-62A32,32,0,0,1,99.78,48H412.22a32,32,0,0,1,28.62,17.69l31,62a32,32,0,0,1-1.7,31.61L365,323" stroke-linecap="round" stroke-linejoin="round"/><line x1="371" y1="144" x2="37" y2="144" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><polyline points="336 176 225.2 304 176 255.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M463.1,112.37C373.68,96.33,336.71,84.45,256,48,175.29,84.45,138.32,96.33,48.9,112.37,32.7,369.13,240.58,457.79,256,464,271.42,457.79,479.3,369.13,463.1,112.37Z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cube: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="69 153.99 256 263.99 443 153.99" stroke-linecap="round" stroke-linejoin="round"/><line x1="256" y1="463.99" x2="256" y2="263.99" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sync: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M434.67,285.59v-29.8C434.67,157.06,354.43,77,255.47,77a179,179,0,0,0-140.14,67.36m-38.53,82v29.8C76.8,355,157,435,256,435a180.45,180.45,0,0,0,140-66.92" stroke-linecap="round" stroke-linejoin="round"/><polyline points="32 256 76 212 122 256" stroke-linecap="round" stroke-linejoin="round"/><polyline points="480 256 436 300 390 256" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  logoIg: '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"/><path d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"/><path d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"/></svg>',
  logoFb: '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M480,257.35c0-123.7-100.3-224-224-224s-224,100.3-224,224c0,111.8,81.9,204.47,189,221.29V322.12H164.11V257.35H221V208c0-56.13,33.45-87.16,84.61-87.16,24.51,0,50.15,4.38,50.15,4.38v55.13H327.5c-27.81,0-36.51,17.26-36.51,35v42h62.12l-9.92,64.77H291V478.66C398.1,461.85,480,369.18,480,257.35Z" fill-rule="evenodd"/></svg>',
  logoPin: '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M256.05,32c-123.7,0-224,100.3-224,224,0,91.7,55.2,170.5,134.1,205.2-.6-15.6-.1-34.4,3.9-51.4,4.3-18.2,28.8-122.1,28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2,19.2-58,43.2-58,20.4,0,30.2,15.3,30.2,33.6,0,20.5-13.1,51.1-19.8,79.5-5.6,23.8,11.9,43.1,35.4,43.1,42.4,0,71-54.5,71-119.1,0-49.1-33.1-85.8-93.2-85.8-67.9,0-110.3,50.7-110.3,107.3,0,19.5,5.8,33.3,14.8,43.9,4.1,4.9,4.7,6.9,3.2,12.5-1.1,4.1-3.5,14-4.6,18-1.5,5.7-6.1,7.7-11.2,5.6-31.3-12.8-45.9-47-45.9-85.6,0-63.6,53.7-139.9,160.1-139.9,85.5,0,141.8,61.9,141.8,128.3,0,87.9-48.9,153.5-120.9,153.5-24.2,0-46.9-13.1-54.7-27.9,0,0-13,51.6-15.8,61.6-4.7,17.3-14,34.5-22.5,48a225.13,225.13,0,0,0,63.5,9.2c123.7,0,224-100.3,224-224S379.75,32,256.05,32Z"/></svg>',
  logoYt: '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"/></svg>'
};
function injectIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    if (ICONS[name] && !el.querySelector('svg')) el.insertAdjacentHTML('afterbegin', ICONS[name]);
  });
}

// ---------- Shared cart (persisted across pages via localStorage) ----------
const CART_KEY = 'urban592_cart';
const WISHLIST_KEY = 'urban592_wishlist';

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
function productImage(p) { return (p.images && p.images[0]) || p.image || ''; }
function formatMoney(n) { return `G$${Math.round(n).toLocaleString('en-US')}`; }
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
    btn.classList.toggle('active', isWishlisted(card.dataset.slug));
  });
  const pdpFav = document.querySelector('.pdp-fav[data-slug]');
  if (pdpFav) pdpFav.classList.toggle('active', isWishlisted(pdpFav.dataset.slug));
}

// ---------- Product card rendering (home grid + related + wishlist + search) ----------
function productCardHTML(p) {
  return `
    <article class="product-card" data-slug="${p.slug}">
      <div class="card-img"><img src="${productImage(p)}" alt="${p.alt}" loading="lazy">${p.sale ? '<span class="sale-flag">Sale</span>' : ''}<button class="fav-btn" data-icon="heart" aria-label="Add to wishlist"></button></div>
      <span class="card-category">${p.category}</span>
      <h3>${p.name}</h3>
      <p>${formatMoney(p.price)}</p>
      <span class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)} (${p.reviews})</span>
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
  injectIcons(container);
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
  if (titleEl) titleEl.textContent = title || 'Best Sellers';
  const countEl = document.getElementById('bestSellersCount');
  if (countEl) countEl.textContent = `${list.length} ${list.length === 1 ? 'style' : 'styles'}`;
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
        <img src="${productImage(p)}" alt="${p.alt}">
        <div class="drawer-item-body">
          <strong>${p.name}</strong>
          <div class="drawer-item-price">${formatMoney(p.price)} × ${c.qty}</div>
          <div class="qty-stepper" data-slug="${p.slug}">
            <button class="qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="drawer-item-remove" data-remove="${p.slug}" data-icon="close" aria-label="Remove"></button>
      </div>`;
  }).join('');
  document.getElementById('cartSubtotal').textContent = `${formatMoney(cartSubtotal())}`;
  injectIcons(list);
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
      <img src="${productImage(p)}" alt="${p.alt}">
      <div class="drawer-item-body">
        <strong>${p.name}</strong>
        <div class="drawer-item-price">${formatMoney(p.price)}</div>
        <a href="product.html?id=${p.slug}" class="link-arrow small">View →</a>
      </div>
      <button class="drawer-item-remove" data-unwish="${p.slug}" data-icon="close" aria-label="Remove from wishlist"></button>
    </div>
  `).join('');
  injectIcons(list);
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
      <img src="${productImage(p)}" alt="${p.alt}">
      <div class="drawer-item-body">
        <strong>${p.name}</strong>
        <div class="drawer-item-price">${formatMoney(p.price)} · ${p.category}</div>
      </div>
    </a>
  `).join('');
}

// ---------- Info modal content ----------
const INFO_CONTENT = {
  'contact': { title: 'Contact Us', body: '<p>We\'re happy to help with sizing, orders, or anything else.</p><p><strong>Email:</strong> <a href="mailto:core@fynixstudios.com">core@fynixstudios.com</a><br><strong>Phone:</strong> <a href="https://wa.me/5927135786" target="_blank" rel="noopener">+592 713 5786</a><br>Mon–Fri, 9am–6pm</p>' },
  'shipping': { title: 'Shipping & Delivery', body: '<p>Free standard shipping on all orders over G$20,000. Standard delivery within Georgetown takes 1–2 business days; regional delivery across Guyana takes 3–5 business days.</p>' },
  'returns': { title: 'Returns & Refunds', body: '<p>Not the right fit? Return any unworn item within 30 days for a full refund or exchange — no questions asked.</p>' },
  'size-guide': { title: 'Size Guide', body: '<table class="info-table"><tr><th>Size</th><th>Chest/Bust (in)</th><th>Waist (in)</th></tr><tr><td>XS</td><td>32–34</td><td>25–27</td></tr><tr><td>S</td><td>35–37</td><td>28–30</td></tr><tr><td>M</td><td>38–40</td><td>31–33</td></tr><tr><td>L</td><td>41–43</td><td>34–36</td></tr><tr><td>XL</td><td>44–46</td><td>37–39</td></tr></table>' },
  'faqs': { title: 'FAQs', body: '<p><strong>How do I track my order?</strong> You\'ll receive a tracking link by email once your order ships.</p><p><strong>Do you ship outside Guyana?</strong> Currently we ship within Guyana only, with regional Caribbean shipping coming soon.</p><p><strong>Can I change my order?</strong> Contact us within an hour of ordering and we\'ll do our best.</p>' },
  'our-story': { title: 'Our Story', body: '<p>Urban 592 started on the streets of Georgetown — 592 is Guyana\'s country code, and it\'s stitched into every label. We build wardrobe essentials for anyone, in any size, that are good enough to wear every day, priced fairly, and made to last.</p>' },
  'sustainability': { title: 'Sustainability', body: '<p>We favor natural fibers, long-lasting construction, and packaging that\'s fully recyclable. We\'d rather sell you one great piece than three you\'ll replace next year.</p>' },
  'careers': { title: 'Careers', body: '<p>We\'re a small, hands-on team. If you love product, retail, or design and want to build something from the ground up, we\'d love to hear from you at <a href="mailto:core@fynixstudios.com">core@fynixstudios.com</a>.</p>' },
  'store-locator': { title: 'Store Locator', body: '<p>We\'re currently online-only, so every order ships direct from our warehouse. No storefronts yet — but never say never.</p>' },
  'press': { title: 'Press', body: '<p>For press inquiries, samples, or interviews, reach out to <a href="mailto:core@fynixstudios.com">core@fynixstudios.com</a> and we\'ll get back to you within two business days.</p>' },
  'privacy': { title: 'Privacy Policy', body: '<p>This is a demo store. No real personal data is collected, stored, or shared. In a live store, this page would describe exactly what we collect and how it\'s used.</p>' },
  'terms': { title: 'Terms & Conditions', body: '<p>This is a demo store built for portfolio purposes. No real purchases, accounts, or agreements are created here.</p>' },
  'social-ig': { title: 'Instagram', body: '<p>This is a demo link — in a live store this would open our Instagram profile in a new tab.</p>' },
  'social-f': { title: 'Facebook', body: '<p>This is a demo link — in a live store this would open our Facebook page in a new tab.</p>' },
  'social-p': { title: 'Pinterest', body: '<p>This is a demo link — in a live store this would open our Pinterest profile in a new tab.</p>' },
  'social-yt': { title: 'YouTube', body: '<p>This is a demo link — in a live store this would open our YouTube channel in a new tab.</p>' }
};
function openInfoModal(key) {
  const entry = INFO_CONTENT[key];
  if (!entry) return;
  document.getElementById('infoTitle').textContent = entry.title;
  document.getElementById('infoBody').innerHTML = entry.body;
  openOverlay('infoModal');
}

// ---------- Category / sale filtering + smooth scroll ----------
function setActiveNav(link) {
  document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
  if (link) link.classList.add('active');
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  injectIcons(document);
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
    renderProductGrid(null, 'Best Sellers');
  }

  // Smooth-scroll nav/footer links
  document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      scrollToId(id);
      setActiveNav(link.closest('.main-nav') ? link : null);
      if (mainNav) mainNav.classList.remove('open');
    });
  });

  // Category filter links (nav, footer, category cards)
  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.category;
      renderProductGrid(p => p.category === cat, cat);
      scrollToId('bestSellers');
      setActiveNav(link.closest('.main-nav') ? link : null);
      if (mainNav) mainNav.classList.remove('open');
    });
  });

  // Sale filter links
  document.querySelectorAll('[data-category-sale]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      renderProductGrid(p => p.sale === true, 'Sale');
      scrollToId('bestSellers');
      setActiveNav(link.closest('.main-nav') ? link : null);
      if (mainNav) mainNav.classList.remove('open');
    });
  });

  // Promo card buttons scroll to a target section and reset the filter
  document.querySelectorAll('[data-scroll-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      renderProductGrid(null, 'Best Sellers');
      scrollToId(link.dataset.scrollTarget);
    });
  });

  // View All resets the filter
  const viewAllBtn = document.getElementById('viewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderProductGrid(null, 'Best Sellers');
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

  // Backdrop + Escape close everything
  const bodyOverlay = document.getElementById('bodyOverlay');
  if (bodyOverlay) bodyOverlay.addEventListener('click', closeAllOverlays);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllOverlays(); });

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      btn.textContent = '✓';
      e.target.reset();
      setTimeout(() => { btn.textContent = '→'; }, 1500);
    });
  }

  initProductPage();
});

// ---------- Product detail page ----------
function initProductPage() {
  const detail = document.getElementById('productDetail');
  if (!detail || typeof PRODUCTS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.slug === id) || PRODUCTS[0];
  const images = product.images && product.images.length ? product.images : [product.image];

  document.title = `${product.name} — Urban 592`;
  document.getElementById('crumbName').textContent = product.name;
  document.getElementById('crumbCategory').textContent = product.category;
  document.getElementById('crumbCategory').href = `index.html#bestSellers`;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productPrice').textContent = `${formatMoney(product.price)}`;
  document.getElementById('productCategoryTag').textContent = product.category;

  const mainImg = document.getElementById('productImage');
  mainImg.src = images[0];
  mainImg.alt = product.alt || product.name;

  const thumbRow = document.getElementById('galleryThumbs');
  if (thumbRow) {
    if (images.length > 1) {
      thumbRow.hidden = false;
      thumbRow.innerHTML = images.map((src, i) => `<button type="button" class="gallery-thumb${i === 0 ? ' active' : ''}" data-src="${src}"><img src="${src}" alt=""></button>`).join('');
      thumbRow.querySelectorAll('.gallery-thumb').forEach(btn => {
        btn.addEventListener('click', () => {
          mainImg.src = btn.dataset.src;
          thumbRow.querySelectorAll('.gallery-thumb').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    } else {
      thumbRow.hidden = true;
      thumbRow.innerHTML = '';
    }
  }

  document.getElementById('productStars').textContent = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
  document.getElementById('productReviewCount').textContent = `(${product.reviews} reviews)`;

  // Size selector
  document.querySelectorAll('.size-group button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-group button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Color selector
  document.querySelectorAll('.color-group .color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-group .color-swatch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Quantity stepper
  const qtyValue = document.getElementById('qtyValue');
  document.getElementById('qtyMinus').addEventListener('click', () => {
    const n = Math.max(1, parseInt(qtyValue.textContent, 10) - 1);
    qtyValue.textContent = n;
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    const n = parseInt(qtyValue.textContent, 10) + 1;
    qtyValue.textContent = n;
  });

  // Add to cart
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

  // Wishlist button on the product page
  const pdpFav = document.querySelector('.pdp-fav');
  if (pdpFav) {
    pdpFav.dataset.slug = product.slug;
    pdpFav.addEventListener('click', () => {
      toggleWishlist(product.slug);
    });
  }

  // Tabs
  document.querySelectorAll('.pdp-tab-head').forEach(head => {
    head.addEventListener('click', () => {
      document.querySelectorAll('.pdp-tab-head').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.pdp-tab-panel').forEach(p => p.classList.remove('active'));
      head.classList.add('active');
      document.querySelector(`.pdp-tab-panel[data-tab-panel="${head.dataset.tab}"]`).classList.add('active');
    });
  });

  // Related products: same category first, then anything else, up to 4
  const relatedGrid = document.getElementById('relatedGrid');
  const sameCategory = PRODUCTS.filter(p => p.slug !== product.slug && p.category === product.category);
  const others = PRODUCTS.filter(p => p.slug !== product.slug && p.category !== product.category);
  const related = sameCategory.concat(others).slice(0, 4);
  relatedGrid.innerHTML = related.map(productCardHTML).join('');
  wireProductCards(relatedGrid);

  injectIcons(detail);
  syncFavButtons();
}

// ---------- Permanent link back to the Fynix Studios portfolio ----------
(function () {
  var style = document.createElement('style');
  style.textContent = '.fynix-back-link{position:fixed;bottom:18px;left:18px;z-index:9000;background:#111;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.85;transition:opacity .2s ease,transform .2s ease;display:inline-flex;align-items:center;gap:6px;}' +
    '@media (max-width:640px){.fynix-back-link{left:auto;right:14px;bottom:80px;padding:0;width:40px;height:40px;justify-content:center;border-radius:50%;}.fynix-back-link .fynix-back-label{display:none;}}';
  document.head.appendChild(style);
  var link = document.createElement('a');
  link.href = '../../index.html';
  link.className = 'fynix-back-link';
  link.setAttribute('aria-label', 'Back to Portfolio');
  link.innerHTML = '<span aria-hidden="true">\u2190</span><span class="fynix-back-label">Back to Portfolio</span>';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = ''; link.style.transform = ''; });
  document.body.appendChild(link);
})();
