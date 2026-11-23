// ---------- Vector icon set (inline SVG, no external icon font/clipart) ----------
const ICONS = {
  search: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" stroke-miterlimit="10"/><line x1="338.29" y1="338.29" x2="448" y2="448" stroke-linecap="round" stroke-miterlimit="10"/></svg>',
  person: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z" stroke-miterlimit="10"/></svg>',
  heart: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M352.92,80C288,80,256,144,256,144s-32-64-96.92-64C106.32,80,64.54,124.14,64,176.81c-1.1,109.33,86.73,187.08,183,252.42a16,16,0,0,0,18,0c96.26-65.34,184.09-143.09,183-252.42C447.46,124.14,405.68,80,352.92,80Z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bag: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M80,176a16,16,0,0,0-16,16V408c0,30.24,25.76,56,56,56H392c30.24,0,56-24.51,56-54.75V192a16,16,0,0,0-16-16Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M160,176V144a96,96,0,0,1,96-96h0a96,96,0,0,1,96,96v32" stroke-linecap="round" stroke-linejoin="round"/><path d="M160,224v16a96,96,0,0,0,96,96h0a96,96,0,0,0,96-96V224" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="40"><line x1="368" y1="368" x2="144" y2="144" stroke-linecap="round" stroke-linejoin="round"/><line x1="368" y1="144" x2="144" y2="368" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevDown: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="48"><polyline points="112 184 256 328 400 184" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevLeft: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="40"><polyline points="328 112 184 256 328 400" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevRight: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="40"><polyline points="184 112 328 256 184 400" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cube: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="69 153.99 256 263.99 443 153.99" stroke-linecap="round" stroke-linejoin="round"/><line x1="256" y1="463.99" x2="256" y2="263.99" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sync: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M434.67,285.59v-29.8C434.67,157.06,354.43,77,255.47,77a179,179,0,0,0-140.14,67.36m-38.53,82v29.8C76.8,355,157,435,256,435a180.45,180.45,0,0,0,140-66.92" stroke-linecap="round" stroke-linejoin="round"/><polyline points="32 256 76 212 122 256" stroke-linecap="round" stroke-linejoin="round"/><polyline points="480 256 436 300 390 256" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><polyline points="336 176 225.2 304 176 255.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M463.1,112.37C373.68,96.33,336.71,84.45,256,48,175.29,84.45,138.32,96.33,48.9,112.37,32.7,369.13,240.58,457.79,256,464,271.42,457.79,479.3,369.13,463.1,112.37Z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chat: '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="28"><path d="M256,64C132.3,64,32,145.3,32,256c0,45.7,17,87.8,45.8,121.6L64,448l82.6-27.6C178.3,438.6,215.6,448,256,448c123.7,0,224-81.3,224-192S379.7,64,256,64Z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
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

// ---------- Shared cart / wishlist (persisted across pages via localStorage) ----------
const CART_KEY = 'regent_cart';
const WISHLIST_KEY = 'regent_wishlist';

function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
function setCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }
function cartKeyFor(slug, size, length) { return `${slug}__${size || ''}__${length || ''}`; }
function addToCart(slug, qty, size, length) {
  const cart = getCart();
  const key = cartKeyFor(slug, size, length);
  const entry = cart.find(c => cartKeyFor(c.slug, c.size, c.length) === key);
  if (entry) entry.qty += qty; else cart.push({ slug, qty, size: size || null, length: length || null });
  setCart(cart);
}
function setCartQty(key, qty) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter(c => cartKeyFor(c.slug, c.size, c.length) !== key);
  else { const entry = cart.find(c => cartKeyFor(c.slug, c.size, c.length) === key); if (entry) entry.qty = qty; }
  setCart(cart);
}
function removeFromCart(key) { setCart(getCart().filter(c => cartKeyFor(c.slug, c.size, c.length) !== key)); }
function cartCount() { return getCart().reduce((s, c) => s + c.qty, 0); }
function productImage(p) { return (p.images && p.images[0]) || p.image || ''; }
function formatMoney(n) { return `G$${Math.round(n).toLocaleString('en-US')}`; }
function cartSubtotal() {
  return getCart().reduce((s, c) => { const p = findProduct(c.slug); return p ? s + (p.salePrice || p.price) * c.qty : s; }, 0);
}
function updateCartBadge() { document.querySelectorAll('.cart-badge').forEach(b => b.textContent = cartCount()); }

function getWishlist() { try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch (e) { return []; } }
function setWishlist(list) { localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); updateWishlistBadge(); syncFavButtons(); }
function isWishlisted(slug) { return getWishlist().includes(slug); }
function toggleWishlist(slug) { let list = getWishlist(); list = list.includes(slug) ? list.filter(s => s !== slug) : list.concat(slug); setWishlist(list); }
function updateWishlistBadge() {
  const n = getWishlist().length;
  const badge = document.getElementById('wishlistBadge');
  if (badge) { badge.textContent = n; badge.hidden = n === 0; }
}
function syncFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const card = btn.closest('[data-slug]');
    if (card) btn.classList.toggle('active', isWishlisted(card.dataset.slug));
  });
  const pdpFav = document.querySelector('.pdp-fav[data-slug]');
  if (pdpFav) pdpFav.classList.toggle('active', isWishlisted(pdpFav.dataset.slug));
}

// ---------- Product card rendering ----------
function priceHTML(p) {
  return p.salePrice
    ? `<span class="was">${formatMoney(p.price)}</span><span class="now">${formatMoney(p.salePrice)}</span>`
    : formatMoney(p.price);
}
function availabilityText(p) {
  const sizeCount = p.sizes ? p.sizes.length : 0;
  const lengthCount = p.lengths ? p.lengths.length : 0;
  if (lengthCount) return `Available in ${sizeCount} sizes and ${lengthCount} lengths`;
  return `Available in ${sizeCount} size${sizeCount === 1 ? '' : 's'}`;
}
function productCardHTML(p) {
  return `
    <article class="product-card" data-slug="${p.slug}">
      <div class="card-img">
        ${p.badge ? `<span class="tag${p.badge === 'Sale' ? ' sale' : ''}">${p.badge}</span>` : (p.salePrice ? '<span class="tag sale">Sale</span>' : '')}
        <img src="${productImage(p)}" alt="${p.alt}" loading="lazy">
        <button class="fav-btn" data-icon="heart" aria-label="Add to wishlist"></button>
        <span class="quick-add" data-quickadd="${p.slug}">Quick Add</span>
      </div>
      <h3>${p.name}</h3>
      <p class="price">${priceHTML(p)}</p>
      <p class="availability">${availabilityText(p)}</p>
    </article>`;
}
function wireProductCards(container) {
  container.querySelectorAll('.product-card[data-slug]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn') || e.target.closest('[data-quickadd]')) return;
      window.location.href = `product.html?id=${card.dataset.slug}`;
    });
  });
  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      const card = this.closest('[data-slug]');
      if (card) toggleWishlist(card.dataset.slug);
    });
  });
  container.querySelectorAll('[data-quickadd]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      const p = findProduct(this.dataset.quickadd);
      if (!p) return;
      addToCart(p.slug, 1, p.sizes ? p.sizes[0] : null, p.lengths && p.lengths.length ? p.lengths[0] : null);
      const original = this.textContent;
      this.textContent = 'Added ✓';
      setTimeout(() => { this.textContent = original; }, 1200);
    });
  });
  injectIcons(container);
  syncFavButtons();
}
function decorateStaticCards(root) {
  (root || document).querySelectorAll('.product-card[data-slug]').forEach(card => {
    if (card.querySelector('.fav-btn')) return;
    const img = card.querySelector('.card-img');
    if (!img) return;
    img.insertAdjacentHTML('beforeend', `<button class="fav-btn" data-icon="heart" aria-label="Add to wishlist"></button><span class="quick-add" data-quickadd="${card.dataset.slug}">Quick Add</span>`);
  });
  wireProductCards(root || document);
}

// ---------- Overlays (cart / wishlist / search / account / info / size chart) ----------
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
    const key = cartKeyFor(c.slug, c.size, c.length);
    const variant = [c.size, c.length].filter(Boolean).join(' / ');
    return `
      <div class="drawer-item" data-key="${key}">
        <img src="${productImage(p)}" alt="${p.alt}">
        <div class="drawer-item-body">
          <strong>${p.name}</strong>
          ${variant ? `<div class="drawer-item-price">${variant}</div>` : ''}
          <div class="drawer-item-price">${formatMoney(p.salePrice || p.price)} × ${c.qty}</div>
          <div class="qty-stepper" data-key="${key}">
            <button class="qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="drawer-item-remove" data-remove="${key}" data-icon="close" aria-label="Remove"></button>
      </div>`;
  }).join('');
  document.getElementById('cartSubtotal').textContent = formatMoney(cartSubtotal());
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
        <div class="drawer-item-price">${formatMoney(p.salePrice || p.price)}</div>
        <a href="product.html?id=${p.slug}">View →</a>
      </div>
      <button class="drawer-item-remove" data-unwish="${p.slug}" data-icon="close" aria-label="Remove from wishlist"></button>
    </div>
  `).join('');
  injectIcons(list);
}

function renderSearchResults(query) {
  const results = document.getElementById('searchResults');
  const empty = document.getElementById('searchEmptyMsg');
  if (!results) return;
  const q = query.trim().toLowerCase();
  if (!q) { results.innerHTML = ''; if (empty) empty.hidden = true; return; }
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  if (matches.length === 0) { results.innerHTML = ''; if (empty) empty.hidden = false; return; }
  if (empty) empty.hidden = true;
  results.innerHTML = matches.map(p => `
    <a class="drawer-item search-result" href="product.html?id=${p.slug}">
      <img src="${productImage(p)}" alt="${p.alt}">
      <div class="drawer-item-body">
        <strong>${p.name}</strong>
        <div class="drawer-item-price">${formatMoney(p.salePrice || p.price)} · ${p.category}</div>
      </div>
    </a>
  `).join('');
}

// ---------- Info modal content (original copy) ----------
const INFO_CONTENT = {
  contact: { title: 'Contact Us', body: '<p><em>This is a demo storefront built by Fynix Studios to showcase design and development work — no real orders are placed here.</em></p><p>We\'re happy to help with sizing, orders, or anything else.</p><p><strong>Email:</strong> <a href="mailto:core@fynixstudios.com">core@fynixstudios.com</a></p>' },
  returns: { title: 'Exchanges & Returns', body: '<p>Not the right fit? Return any unworn item within 30 days for a full refund or exchange — no questions asked.</p>' },
  reviews: { title: 'Reviews', body: '<p>Every review on a product page comes from a verified buyer. We publish the good and the mixed alike.</p>' },
  cancel: { title: 'Cancel An Order', body: '<p>Orders can be cancelled free of charge within one hour of purchase. Contact us right away and we\'ll do our best to catch it before it ships.</p>' },
  about: { title: 'About Us', body: '<p>Your one-stop destination for top-quality products at the best prices. Shop smart, live better.</p>' },
  sustainability: { title: 'Sustainability & Responsibility', body: '<p>We favor recycled and low-impact packaging wherever we can, and we work with suppliers who meet the same standard.</p>' },
  terms: { title: 'Terms & Conditions', body: '<p>This is a demo store built for portfolio purposes. No real purchases, accounts, or agreements are created here.</p>' },
  privacy: { title: 'Privacy Policy', body: '<p>This is a demo store. No real personal data is collected, stored, or shared.</p>' },
  cookies: { title: 'Cookie Policy', body: '<p>This demo does not set tracking or advertising cookies. Cart and wishlist contents are stored locally in your browser only.</p>' },
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

// ---------- Sample reviews (original text, not scraped) ----------
const SAMPLE_REVIEWS = [
  { stars: 5, body: "Amazing quality and fast delivery! The product is exactly as described. Highly recommended.", author: 'Michael B.' },
  { stars: 5, body: "Best online shop I've used in Guyana. Packaging was solid and my order arrived two days early.", author: 'Sarah C.' },
  { stars: 4, body: "Great price and the customer support actually replies fast when you have a question.", author: 'Devon L.' },
  { stars: 5, body: "Smooth checkout, easy tracking, and the item matched the photos perfectly. No complaints.", author: 'Priya S.' }
];
function renderReviews(product) {
  const list = document.getElementById('reviewsList');
  if (!list) return;
  const reviews = SAMPLE_REVIEWS.slice(0, Math.min(4, SAMPLE_REVIEWS.length));
  list.innerHTML = reviews.map(r => `
    <div class="review">
      <span class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
      <p>${r.body}</p>
      <small>— ${r.author}, Verified Buyer</small>
    </div>
  `).join('');
  const big = document.getElementById('ratingBig');
  const sub = document.getElementById('ratingSub');
  if (big) big.textContent = (product.rating - 0.2).toFixed(1);
  if (sub) sub.textContent = `Based on ${product.reviews} reviews`;
}

// ---------- Product detail page ----------
function initProductPage() {
  const detail = document.getElementById('productDetail');
  if (!detail || typeof PRODUCTS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = findProduct(id) || PRODUCTS[0];
  const images = product.images && product.images.length ? product.images : [product.image];

  document.title = `${product.name} — Regent`;
  document.getElementById('crumbName').textContent = product.name;
  document.getElementById('crumbCategory').textContent = product.category;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productPrice').innerHTML = priceHTML(product);
  document.getElementById('productCategoryTag').textContent = product.category;
  document.getElementById('productDesc').textContent = product.description;
  document.getElementById('productFitCopy').textContent = product.description;

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
    } else { thumbRow.hidden = true; thumbRow.innerHTML = ''; }
  }

  document.getElementById('productStars').textContent = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
  document.getElementById('productReviewCount').textContent = `(${product.reviews} reviews)`;

  // Size selector
  let selectedSize = product.sizes ? product.sizes[Math.min(2, product.sizes.length - 1)] : null;
  const sizeGroup = document.getElementById('sizeGroup');
  sizeGroup.innerHTML = (product.sizes || []).map((s, i) => `<button type="button" class="${s === selectedSize ? 'active' : ''}" data-size="${s}">${s}</button>`).join('');
  sizeGroup.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      sizeGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  // Length selector
  let selectedLength = null;
  const lengthOption = document.getElementById('lengthOption');
  const lengthGroup = document.getElementById('lengthGroup');
  if (product.lengths && product.lengths.length) {
    lengthOption.hidden = false;
    selectedLength = product.lengths[0];
    lengthGroup.innerHTML = product.lengths.map((l, i) => `<button type="button" class="${i === 0 ? 'active' : ''}" data-length="${l}">${l}</button>`).join('');
    lengthGroup.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        lengthGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedLength = btn.dataset.length;
      });
    });
  } else { lengthOption.hidden = true; }

  // Size chart modal
  const sizeChartBtn = document.getElementById('sizeChartBtn');
  if (sizeChartBtn) sizeChartBtn.addEventListener('click', () => openOverlay('sizeChartModal'));
  const sizeChartClose = document.getElementById('sizeChartClose');
  if (sizeChartClose) sizeChartClose.addEventListener('click', closeAllOverlays);

  // Quantity stepper
  const qtyValue = document.getElementById('qtyValue');
  document.getElementById('qtyMinus').addEventListener('click', () => { qtyValue.textContent = Math.max(1, parseInt(qtyValue.textContent, 10) - 1); });
  document.getElementById('qtyPlus').addEventListener('click', () => { qtyValue.textContent = parseInt(qtyValue.textContent, 10) + 1; });

  // Add to cart
  const addBtn = document.getElementById('addToCartBtn');
  addBtn.addEventListener('click', () => {
    addToCart(product.slug, parseInt(qtyValue.textContent, 10), selectedSize, selectedLength);
    const original = addBtn.textContent;
    addBtn.textContent = 'Added ✓';
    addBtn.classList.add('added');
    setTimeout(() => { addBtn.textContent = original; addBtn.classList.remove('added'); }, 1400);
  });

  // Wishlist button
  const pdpFav = document.querySelector('.pdp-fav');
  if (pdpFav) {
    pdpFav.dataset.slug = product.slug;
    pdpFav.addEventListener('click', () => toggleWishlist(product.slug));
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

  // Feature callout
  const featureSection = document.getElementById('featureCallout');
  if (product.feature) {
    document.getElementById('featureTitle').textContent = product.feature.title;
    document.getElementById('featureBody').textContent = product.feature.body;
  } else if (featureSection) { featureSection.hidden = true; }

  // Match With: accessories + one other category item
  const matchGrid = document.getElementById('matchGrid');
  const accessories = PRODUCTS.filter(p => p.category === 'Accessories' && p.slug !== product.slug);
  const matchList = accessories.slice(0, 4);
  matchGrid.innerHTML = matchList.map(productCardHTML).join('');
  wireProductCards(matchGrid);

  // Related products: same category first, then anything else, up to 4
  const relatedGrid = document.getElementById('relatedGrid');
  const sameCategory = PRODUCTS.filter(p => p.slug !== product.slug && p.category === product.category);
  const others = PRODUCTS.filter(p => p.slug !== product.slug && p.category !== product.category && p.category !== 'Accessories');
  const related = sameCategory.concat(others).slice(0, 4);
  relatedGrid.innerHTML = related.map(productCardHTML).join('');
  wireProductCards(relatedGrid);

  renderReviews(product);
  injectIcons(detail);
  syncFavButtons();
}

// ---------- DOM wiring shared across pages ----------
document.addEventListener('DOMContentLoaded', () => {
  injectIcons(document);
  updateCartBadge();
  updateWishlistBadge();
  decorateStaticCards(document);

  document.querySelectorAll('.look-card[data-slug]').forEach(card => {
    card.addEventListener('click', () => { window.location.href = `product.html?id=${card.dataset.slug}`; });
  });

  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }
  // Sticky header on scroll (only when the header overlays a hero image)
  const heroHeader = document.querySelector('.hero .site-header');
  if (heroHeader) {
    const toggleSticky = () => heroHeader.classList.toggle('is-sticky', window.scrollY > 80);
    toggleSticky();
    window.addEventListener('scroll', toggleSticky);
  }

  // Tap-to-open dropdowns on touch/mobile
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth > 760) return;
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    });
  });

  // Tab toggles (Ladies/Dudes, Hybrid/Aura/Clean)
  document.querySelectorAll('[data-tabgroup]').forEach(group => {
    const buttons = group.querySelectorAll('[data-tab]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const panelGroup = document.querySelector(`[data-panelgroup="${group.dataset.tabgroup}"]`);
        if (panelGroup) {
          panelGroup.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== btn.dataset.tab; });
        }
      });
    });
  });

  // Carousel arrow scroll
  document.querySelectorAll('.carousel-arrows').forEach(arrows => {
    const track = document.querySelector(arrows.dataset.target);
    if (!track) return;
    const prev = arrows.querySelector('[data-dir="prev"]');
    const next = arrows.querySelector('[data-dir="next"]');
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.9, behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.9, behavior: 'smooth' }));
  });

  // Before/after slider (Home / Tech room reveal)
  const baSlider = document.getElementById('baSlider');
  const baBefore = document.getElementById('baBefore');
  const baHandle = document.getElementById('baHandle');
  if (baSlider && baBefore && baHandle) {
    const setSplit = (percent) => {
      const clamped = Math.max(0, Math.min(100, percent));
      baBefore.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      baHandle.style.left = `${clamped}%`;
    };
    const moveFromEvent = (e) => {
      const rect = baSlider.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      setSplit((x / rect.width) * 100);
    };
    let dragging = false;
    const onMove = (e) => { if (dragging) { e.preventDefault(); moveFromEvent(e); } };
    const stopDrag = () => { dragging = false; };
    baSlider.addEventListener('mousedown', (e) => { dragging = true; moveFromEvent(e); });
    baSlider.addEventListener('touchstart', (e) => { dragging = true; moveFromEvent(e); }, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    baSlider.addEventListener('click', moveFromEvent);
  }

  // Category filter links (nav dropdown -> homepage sections; no-op if not on homepage)
  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', () => { if (mainNav) mainNav.classList.remove('open'); });
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
      if (plusBtn) {
        const key = plusBtn.closest('.qty-stepper').dataset.key;
        const entry = getCart().find(c => cartKeyFor(c.slug, c.size, c.length) === key);
        if (entry) setCartQty(key, entry.qty + 1);
        renderCartDrawer(); return;
      }
      const minusBtn = e.target.closest('.qty-minus');
      if (minusBtn) {
        const key = minusBtn.closest('.qty-stepper').dataset.key;
        const entry = getCart().find(c => cartKeyFor(c.slug, c.size, c.length) === key);
        if (entry) setCartQty(key, entry.qty - 1);
        renderCartDrawer(); return;
      }
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
    link.addEventListener('click', (e) => { e.preventDefault(); openInfoModal(link.dataset.info); });
  });
  const infoClose = document.getElementById('infoClose');
  if (infoClose) infoClose.addEventListener('click', closeAllOverlays);

  // Backdrop + Escape close everything
  const bodyOverlay = document.getElementById('bodyOverlay');
  if (bodyOverlay) bodyOverlay.addEventListener('click', closeAllOverlays);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllOverlays(); });

  initProductPage();
});

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
  link.innerHTML = '<span aria-hidden="true">←</span><span class="fynix-back-label">Back to Portfolio</span>';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = ''; link.style.transform = ''; });
  document.body.appendChild(link);
})();
