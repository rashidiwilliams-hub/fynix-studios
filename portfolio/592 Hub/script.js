// ---------- Shared cart (persisted across page loads via localStorage) ----------
const CART_KEY = 'hub592_cart_count';
function getCartCount() { return parseInt(localStorage.getItem(CART_KEY) || '0', 10); }
function setCartCount(n) {
  localStorage.setItem(CART_KEY, String(n));
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = n);
}

function starsHTML(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function productCardHTML(p) {
  return `
    <article class="product-card" data-slug="${p.slug}">
      <div class="card-img">
        <img src="${p.images[0]}" alt="${p.alt}">
        <button class="fav-btn" aria-label="Favorite">♡</button>
      </div>
      <h3>${p.name}</h3>
      <div class="card-rating"><span class="stars">${starsHTML(p.rating)}</span><span class="rating-count">(${p.reviews})</span></div>
      <div class="card-price-row"><span class="card-price">$${p.price.toFixed(2)}</span>${p.oldPrice ? `<span class="card-price-old">$${p.oldPrice.toFixed(2)}</span>` : ''}</div>
      <button class="add-btn" aria-label="Add to cart" data-qty-add="${p.slug}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>Add to Cart</button>
    </article>`;
}

function wireProductGrid(grid) {
  if (!grid) return;
  grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      this.classList.toggle('active');
      this.textContent = this.classList.contains('active') ? '♥' : '♡';
    });
  });
  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      setCartCount(getCartCount() + 1);
      const original = this.innerHTML;
      this.textContent = 'Added ✓';
      this.classList.add('added');
      setTimeout(() => { this.innerHTML = original; this.classList.remove('added'); }, 1200);
    });
  });
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn') || e.target.closest('.add-btn')) return;
      window.location.href = `product.html?id=${card.dataset.slug}`;
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(10px);background:#14151a;color:#fff;font-family:inherit;font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.25);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:99999;white-space:nowrap;';
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

document.addEventListener('DOMContentLoaded', () => {
  setCartCount(getCartCount());
  initHomePage();
  initShopPage();
  initProductPage();

  document.querySelectorAll('.price-row a.link-underline').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(`${link.textContent.trim()} info — demo only`);
    });
  });

  document.getElementById('cartBtn')?.addEventListener('click', () => {
    const n = getCartCount();
    showToast(n > 0 ? `${n} item${n === 1 ? '' : 's'} in cart — demo only, checkout isn't wired up` : 'Your cart is empty');
  });
  document.getElementById('headerWishlistBtn')?.addEventListener('click', () => showToast('Wishlist — demo only'));

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
  const grid = document.getElementById('homeFeaturedGrid');
  if (!grid) return;
  const featuredSlugs = ['smart-watch-pro', 'wireless-headphones', 'leather-backpack', 'running-shoes', 'smartphone-128gb', 'sunglasses-uv400'];
  const featured = featuredSlugs.map(s => PRODUCTS.find(p => p.slug === s)).filter(Boolean);
  grid.innerHTML = featured.map(productCardHTML).join('');
  wireProductGrid(grid);

  initCountdown();
  initFAQ();

  const strip = document.getElementById('brandStrip');
  if (strip) {
    document.getElementById('brandPrev')?.addEventListener('click', () => strip.scrollBy({ left: -240, behavior: 'smooth' }));
    document.getElementById('brandNext')?.addEventListener('click', () => strip.scrollBy({ left: 240, behavior: 'smooth' }));
  }
}

function initCountdown() {
  const el = document.getElementById('saleCountdown');
  if (!el) return;
  const dd = document.getElementById('cdDays'), hh = document.getElementById('cdHours'), mm = document.getElementById('cdMins'), ss = document.getElementById('cdSecs');
  const target = Date.now() + ((2 * 24 + 14) * 3600 + 37 * 60 + 59) * 1000;
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const diff = Math.max(0, target - Date.now());
    const s = Math.floor(diff / 1000);
    dd.textContent = pad(Math.floor(s / 86400));
    hh.textContent = pad(Math.floor((s % 86400) / 3600));
    mm.textContent = pad(Math.floor((s % 3600) / 60));
    ss.textContent = pad(s % 60);
  }
  tick();
  setInterval(tick, 1000);
}

function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
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

  document.title = `${product.name} — 592 Hub`;
  document.getElementById('crumbCategory').textContent = product.category;
  document.getElementById('crumbCategory').href = `shop.html?category=${encodeURIComponent(product.category)}`;
  document.getElementById('crumbName').textContent = product.name;
  document.getElementById('productBrand').textContent = product.brand;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productStars').textContent = starsHTML(product.rating);
  document.getElementById('productReviewCount').textContent = `(${product.reviews} reviews)`;
  document.getElementById('productStep').textContent = product.category;
  document.getElementById('productLead').textContent = product.lead;
  document.getElementById('productTargets').textContent = product.targets;
  document.getElementById('productSuited').textContent = product.suited;
  document.getElementById('productFormat').textContent = product.format;
  document.getElementById('productIngredients').textContent = product.ingredients;
  document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
  const oldPriceEl = document.getElementById('productOldPrice');
  oldPriceEl.textContent = product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : '';
  oldPriceEl.hidden = !product.oldPrice;
  document.getElementById('productSize').textContent = product.size;

  const mainImage = document.getElementById('mainImage');
  mainImage.src = product.images[0];
  mainImage.alt = product.alt;
  document.getElementById('thumbImage1').src = product.images[1] || product.images[0];
  document.getElementById('thumbImage2').src = product.images[2] || product.images[0];

  let qty = 1;
  const qtyValue = document.getElementById('qtyValue');
  document.getElementById('qtyPlus').addEventListener('click', () => { qty += 1; qtyValue.textContent = qty; });
  document.getElementById('qtyMinus').addEventListener('click', () => { qty = Math.max(1, qty - 1); qtyValue.textContent = qty; });

  const cartBtn = document.getElementById('addToCartBtn');
  cartBtn.addEventListener('click', () => {
    setCartCount(getCartCount() + qty);
    const original = cartBtn.textContent;
    cartBtn.textContent = 'added ✓';
    cartBtn.classList.add('added');
    setTimeout(() => { cartBtn.textContent = original; cartBtn.classList.remove('added'); }, 1400);
  });

  document.getElementById('wishlistBtn').addEventListener('click', function () { this.classList.toggle('active'); });

  const grid = document.getElementById('productGrid');
  const related = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4);
  grid.innerHTML = related.map(productCardHTML).join('');
  wireProductGrid(grid);

  document.getElementById('alNext')?.addEventListener('click', () => grid.scrollBy({ left: 300, behavior: 'smooth' }));
  document.getElementById('alPrev')?.addEventListener('click', () => grid.scrollBy({ left: -300, behavior: 'smooth' }));
}

// ---------- Permanent link back to the Fynix Studios portfolio ----------
(function () {
  var style = document.createElement('style');
  style.textContent = '.fynix-back-link{position:fixed;bottom:18px;left:18px;z-index:9000;background:#14151a;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:8px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.85;transition:opacity .2s ease,transform .2s ease;display:inline-flex;align-items:center;gap:6px;}' +
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
