const CART_KEY = 'urban592_cart';
const BAG_ICON = '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32"><path d="M80,176a16,16,0,0,0-16,16V408c0,30.24,25.76,56,56,56H392c30.24,0,56-24.51,56-54.75V192a16,16,0,0,0-16-16Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M160,176V144a96,96,0,0,1,96-96h0a96,96,0,0,1,96,96v32" stroke-linecap="round" stroke-linejoin="round"/><path d="M160,224v16a96,96,0,0,0,96,96h0a96,96,0,0,0,96-96V224" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SHIPPING_FEE = 0; // free shipping site-wide
const VAT_RATE = 0.14; // Guyana standard VAT

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
function formatMoney(n) { return `G$${Math.round(n).toLocaleString('en-US')}`; }

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icon="bag"]').forEach(el => el.insertAdjacentHTML('afterbegin', BAG_ICON));

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
  const vat = subtotal * VAT_RATE;
  const total = subtotal + SHIPPING_FEE + vat;
  document.getElementById('summarySubtotal').textContent = formatMoney(subtotal);
  document.getElementById('summaryShipping').textContent = SHIPPING_FEE === 0 ? 'Free' : formatMoney(SHIPPING_FEE);
  document.getElementById('summaryTax').textContent = formatMoney(vat);
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
    const orderNumber = 'U592-' + Date.now().toString().slice(-6);

    document.getElementById('confirmName').textContent = name.split(' ')[0];
    document.getElementById('confirmOrderNumber').textContent = '#' + orderNumber;
    document.getElementById('confirmTotal').textContent = formatMoney(total);

    document.querySelector('.checkout-grid').hidden = true;
    document.getElementById('checkoutConfirmation').hidden = false;

    setCart([]);
  });

  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
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
  link.innerHTML = '<span aria-hidden="true">\u2190</span><span class="fynix-back-label">Back to Portfolio</span>';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = ''; link.style.transform = ''; });
  document.body.appendChild(link);
})();
