// Feastly — shared cart logic (localStorage, prefixed feastly_).
// Cart is single-restaurant-at-a-time, mirroring real food-delivery apps:
// adding an item from a different restaurant offers to clear the cart first.

const CART_KEY = 'feastly_cart';
const DELIVERY_FEE = 2.50;

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY));
    if (raw && typeof raw === 'object' && raw.items) return raw;
  } catch (e) {}
  return { restaurant: null, items: {}, fulfillment: 'Delivery' };
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function cartCount(cart) {
  return Object.values(cart.items).reduce((a, b) => a + b, 0);
}

function updateCartBadges() {
  const cart = loadCart();
  const n = cartCount(cart);
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = n);
}

// Returns true if the item was added, false if the user cancelled a
// cross-restaurant clear-cart prompt.
function addToCart(restaurantSlug, itemId) {
  let cart = loadCart();
  if (cart.restaurant && cart.restaurant !== restaurantSlug && cartCount(cart) > 0) {
    const other = getRestaurant(cart.restaurant);
    const otherName = other ? other.name : 'your other order';
    const ok = window.confirm(`Your cart has items from ${otherName}. Starting an order here will clear your current cart. Continue?`);
    if (!ok) return false;
    cart = { restaurant: restaurantSlug, items: {}, fulfillment: cart.fulfillment || 'Delivery' };
  }
  cart.restaurant = restaurantSlug;
  cart.items[itemId] = (cart.items[itemId] || 0) + 1;
  if (!cart.fulfillment) cart.fulfillment = 'Delivery';
  saveCart(cart);
  return true;
}

function setQty(itemId, qty) {
  const cart = loadCart();
  if (qty <= 0) delete cart.items[itemId];
  else cart.items[itemId] = qty;
  if (Object.keys(cart.items).length === 0) cart.restaurant = null;
  saveCart(cart);
}

function setFulfillment(mode) {
  const cart = loadCart();
  cart.fulfillment = mode;
  saveCart(cart);
}

function clearCart() {
  saveCart({ restaurant: null, items: {}, fulfillment: 'Delivery' });
}

function starsHTML(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function showToast(message) {
  let toast = document.getElementById('demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
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

document.addEventListener('DOMContentLoaded', updateCartBadges);

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
