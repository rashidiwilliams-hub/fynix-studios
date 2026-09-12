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
