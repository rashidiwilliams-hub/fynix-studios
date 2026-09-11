// ---------- Shared cart (persisted across page loads via localStorage) ----------
const CART_KEY = 'quickbite_cart_count';
function getCartCount() { return parseInt(localStorage.getItem(CART_KEY) || '0', 10); }
function setCartCount(n) {
  localStorage.setItem(CART_KEY, String(n));
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = n);
}

function starsHTML(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function itemCardHTML(item) {
  return `
    <article class="item-card" data-slug="${item.slug}">
      <div class="card-img"><img src="${item.image}" alt="${item.alt}"></div>
      <h3>${item.name}</h3>
      <div class="card-rating"><span class="stars">${starsHTML(item.rating)}</span><span class="rating-count">(${item.reviews})</span></div>
      <div class="card-bottom">
        <span class="card-price">$${item.price.toFixed(2)}</span>
        <button class="add-btn" aria-label="Add to cart" data-qty-add="${item.slug}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>Add to Cart</button>
      </div>
    </article>`;
}

function wireItemGrid(grid) {
  if (!grid) return;
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
  grid.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-btn')) return;
      window.location.href = `item.html?id=${card.dataset.slug}`;
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(10px);background:#1a1a1a;color:#fff;font-family:inherit;font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.25);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:99999;white-space:nowrap;';
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
  initMenuPage();
  initItemPage();

  document.getElementById('cartBtn')?.addEventListener('click', () => {
    const n = getCartCount();
    showToast(n > 0 ? `${n} item${n === 1 ? '' : 's'} in cart — demo only, checkout isn't wired up` : 'Your cart is empty');
  });
  document.getElementById('orderNowBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Order Online — demo only');
  });

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
  const grid = document.getElementById('homePicksGrid');
  if (!grid) return;
  grid.innerHTML = MENU.map(itemCardHTML).join('');
  wireItemGrid(grid);
}

// ---------- Menu page ----------
function initMenuPage() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  const categories = ['All', ...Array.from(new Set(MENU.map(i => i.category)))];
  const tabs = document.getElementById('menuTabs');
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') && categories.includes(params.get('category')) ? params.get('category') : 'All';

  function render() {
    const list = activeCategory === 'All' ? MENU : MENU.filter(i => i.category === activeCategory);
    grid.innerHTML = list.length ? list.map(itemCardHTML).join('') : '<p class="no-results">No items found.</p>';
    wireItemGrid(grid);
    const countEl = document.getElementById('menuCount');
    if (countEl) countEl.textContent = `${list.length} ${list.length === 1 ? 'item' : 'items'}`;
  }

  if (tabs) {
    tabs.innerHTML = categories.map(c => `<button class="menu-tab${c === activeCategory ? ' active' : ''}" data-category="${c}">${c}</button>`).join('');
    tabs.querySelectorAll('.menu-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeCategory = tab.dataset.category;
        tabs.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t === tab));
        render();
      });
    });
  }
  render();
}

// ---------- Item detail page ----------
function initItemPage() {
  const detail = document.getElementById('itemDetail');
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const item = MENU.find(i => i.slug === params.get('id')) || MENU[0];

  document.title = `${item.name} — QuickBite`;
  document.getElementById('crumbCategory').textContent = item.category;
  document.getElementById('crumbCategory').href = `menu.html?category=${encodeURIComponent(item.category)}`;
  document.getElementById('crumbName').textContent = item.name;
  document.getElementById('itemCategory').textContent = item.category;
  document.getElementById('itemName').textContent = item.name;
  document.getElementById('itemStars').textContent = starsHTML(item.rating);
  document.getElementById('itemReviewCount').textContent = `(${item.reviews} reviews)`;
  document.getElementById('itemLead').textContent = item.lead;
  document.getElementById('itemDetails').textContent = item.details;
  document.getElementById('itemPrepTime').textContent = item.prepTime;
  document.getElementById('itemSpice').textContent = item.spice;
  document.getElementById('itemServes').textContent = item.serves;
  document.getElementById('itemPrice').textContent = `$${item.price.toFixed(2)}`;

  const mainImage = document.getElementById('itemImage');
  mainImage.src = item.image;
  mainImage.alt = item.alt;

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

  const grid = document.getElementById('relatedGrid');
  const related = MENU.filter(i => i.slug !== item.slug).slice(0, 4);
  grid.innerHTML = related.map(itemCardHTML).join('');
  wireItemGrid(grid);
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
