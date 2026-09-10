// ---------- Shared cart (persisted across page loads via localStorage) ----------
const CART_KEY = 'ordinary_cart_count';
function getCartCount() {
  return parseInt(localStorage.getItem(CART_KEY) || '0', 10);
}
function setCartCount(n) {
  localStorage.setItem(CART_KEY, String(n));
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = n);
}

function productCardHTML(p) {
  return `
    <article class="product-card" data-slug="${p.slug}">
      <div class="card-img">
        <img src="${p.images[0]}" alt="${p.alt}">
        <button class="fav-btn" aria-label="Favorite">♡</button>
        <button class="add-btn" aria-label="Add to cart" data-qty-add="${p.slug}">+</button>
      </div>
      <h3>${p.name}</h3>
      <p>${p.lead}</p>
      <span class="card-price">$${p.price.toFixed(2)}</span>
    </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
  setCartCount(getCartCount());

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.slug === id) || PRODUCTS[0];

  document.title = `${product.name} — The Ordinary`;
  document.getElementById('crumbName').textContent = product.name;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productStep').textContent = product.step;
  document.getElementById('productLead').textContent = product.lead;
  document.getElementById('productTargets').textContent = product.targets;
  document.getElementById('productSuited').textContent = product.suited;
  document.getElementById('productFormat').textContent = product.format;
  document.getElementById('productIngredients').textContent = product.ingredients;
  document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('productSize').textContent = product.size;

  const mainImage = document.getElementById('mainImage');
  mainImage.src = product.images[0];
  mainImage.alt = product.alt;
  document.getElementById('thumbImage1').src = product.images[1] || product.images[0];
  document.getElementById('thumbImage2').src = product.images[2] || product.images[0];

  // Quantity stepper
  let qty = 1;
  const qtyValue = document.getElementById('qtyValue');
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty += 1;
    qtyValue.textContent = qty;
  });
  document.getElementById('qtyMinus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });

  // Add to cart feedback
  const cartBtn = document.getElementById('addToCartBtn');
  cartBtn.addEventListener('click', () => {
    setCartCount(getCartCount() + qty);
    const original = cartBtn.textContent;
    cartBtn.textContent = 'added ✓';
    cartBtn.classList.add('added');
    setTimeout(() => {
      cartBtn.textContent = original;
      cartBtn.classList.remove('added');
    }, 1400);
  });

  // Wishlist toggles
  document.getElementById('wishlistBtn').addEventListener('click', function () {
    this.classList.toggle('active');
  });

  // "You may also like" — everything except the current product
  const grid = document.getElementById('productGrid');
  const related = PRODUCTS.filter(p => p.slug !== product.slug);
  grid.innerHTML = related.map(productCardHTML).join('');

  grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('active');
      this.textContent = this.classList.contains('active') ? '♥' : '♡';
    });
  });
  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setCartCount(getCartCount() + 1);
      const original = this.textContent;
      this.textContent = '✓';
      setTimeout(() => { this.textContent = original; }, 1000);
    });
  });
  grid.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn') || e.target.closest('.add-btn')) return;
      window.location.href = `index.html?id=${card.dataset.slug}`;
    });
  });

  // "You may also like" carousel
  document.getElementById('alNext').addEventListener('click', () => {
    grid.scrollBy({ left: 300, behavior: 'smooth' });
  });
  document.getElementById('alPrev').addEventListener('click', () => {
    grid.scrollBy({ left: -300, behavior: 'smooth' });
  });
});

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
