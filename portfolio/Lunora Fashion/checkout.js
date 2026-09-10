const CART_KEY = 'lunora_cart';
const SHIPPING_FEE = 0; // free shipping site-wide
const TAX_RATE = 0.07;

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = cart.reduce((s, c) => s + c.qty, 0));
}
function findProduct(slug) {
  return (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.slug === slug) : null;
}
function cartSubtotal(cart) {
  return cart.reduce((s, c) => {
    const p = findProduct(c.slug);
    return p ? s + p.price * c.qty : s;
  }, 0);
}
function formatMoney(n) { return `$${n.toFixed(2)}`; }

document.addEventListener('DOMContentLoaded', () => {
  const cart = getCart();
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = cart.reduce((s, c) => s + c.qty, 0));

  const checkoutEmpty = document.getElementById('checkoutEmpty');
  const checkoutContent = document.getElementById('checkoutContent');

  if (cart.length === 0) {
    checkoutEmpty.hidden = false;
    checkoutContent.hidden = true;
    return;
  }

  const summaryItems = document.getElementById('summaryItems');
  summaryItems.innerHTML = cart.map(c => {
    const p = findProduct(c.slug);
    if (!p) return '';
    return `<div class="summary-item"><span>${p.name} × ${c.qty}</span><strong>${formatMoney(p.price * c.qty)}</strong></div>`;
  }).join('');

  const subtotal = cartSubtotal(cart);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_FEE + tax;
  document.getElementById('summarySubtotal').textContent = formatMoney(subtotal);
  document.getElementById('summaryShipping').textContent = SHIPPING_FEE === 0 ? 'Free' : formatMoney(SHIPPING_FEE);
  document.getElementById('summaryTax').textContent = formatMoney(tax);
  document.getElementById('summaryTotal').textContent = formatMoney(total);

  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const cardFields = document.getElementById('cardFields');
  paymentRadios.forEach(r => {
    r.addEventListener('change', () => {
      cardFields.hidden = document.querySelector('input[name="payment"]:checked').value !== 'card';
    });
  });

  document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('checkoutName').value || 'there';
    const orderNumber = 'LN' + Date.now().toString().slice(-6);

    document.getElementById('confirmName').textContent = name.split(' ')[0];
    document.getElementById('confirmOrderNumber').textContent = '#' + orderNumber;
    document.getElementById('confirmTotal').textContent = formatMoney(total);

    document.querySelector('.checkout-grid').hidden = true;
    document.getElementById('checkoutConfirmation').hidden = false;

    setCart([]);
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
