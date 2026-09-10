// ---------- Shared cart (persisted across pages via localStorage) ----------
const CART_KEY = 'lunora_cart_count';
function getCartCount() {
  return parseInt(localStorage.getItem(CART_KEY) || '0', 10);
}
function setCartCount(n) {
  localStorage.setItem(CART_KEY, String(n));
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = n);
}
function addToCart(qty) {
  setCartCount(getCartCount() + qty);
}

document.addEventListener('DOMContentLoaded', () => {
  setCartCount(getCartCount());

  // Favorite toggles
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('active');
      this.textContent = this.classList.contains('active') ? '♥' : '♡';
    });
  });

  // Product cards link to their product page
  document.querySelectorAll('.product-card[data-slug]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn')) return;
      window.location.href = `product.html?id=${card.dataset.slug}`;
    });
  });

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
    addToCart(parseInt(qtyValue.textContent, 10));
    const original = addBtn.textContent;
    addBtn.textContent = 'Added ✓';
    addBtn.classList.add('added');
    setTimeout(() => {
      addBtn.textContent = original;
      addBtn.classList.remove('added');
    }, 1400);
  });

  const favBtn = document.querySelector('.pdp-fav');
  favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('active');
    favBtn.textContent = favBtn.classList.contains('active') ? '♥' : '♡';
  });

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
  relatedGrid.innerHTML = related.map(p => `
    <article class="product-card" data-slug="${p.slug}">
      <div class="card-img"><img src="${p.image}" alt="${p.alt}"><button class="fav-btn" aria-label="Favorite">♡</button></div>
      <h3>${p.name}</h3>
      <span class="price">$${p.price.toFixed(2)}</span>
      <div class="rating"><span class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</span><small>(${p.reviews})</small></div>
    </article>
  `).join('');
  relatedGrid.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn')) return;
      window.location.href = `product.html?id=${card.dataset.slug}`;
    });
  });
  relatedGrid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.textContent = this.textContent === '♡' ? '♥' : '♡';
    });
  });
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
