// Rum Me! — local proof-of-concept data & interactivity.
// Everything below runs entirely in the browser; there is no backend.
// This file is shared across every page, so each feature block is guarded
// to only run when its elements are actually present on the current page.

const BOTTLES = [
  { id: 1, name: 'Demerara Gold', type: 'Gold Rum', label: 'DEMERARA', sub: 'GOLD', tagline: '5 Year Gold Rum', price: 54.99, c1: '#3a2a1a', c2: '#8a5a2a' },
  { id: 2, name: 'Stabroek Reserve', type: 'Gold Rum', label: 'STABROEK', sub: '', tagline: 'Premium Gold Rum', price: 89.99, c1: '#5a1a2a', c2: '#8a2a3a' },
  { id: 3, name: 'Kaieteur Gold', type: 'Gold Rum', label: 'KAIETEUR', sub: '', tagline: '8 Year Gold Rum', price: 42.99, c1: '#1a1a1a', c2: '#3a3a3a' },
  { id: 4, name: 'Corentyne Classic', type: 'Gold Rum', label: 'CORENTYNE', sub: '', tagline: 'Classic Gold Rum', price: 38.99, c1: '#4a2a0a', c2: '#8a6a2a' },
  { id: 5, name: 'Essequibo Dark', type: 'Demerara Dark', label: 'ESSEQUIBO', sub: '12', tagline: '12 Year Demerara Dark', price: 64.99, c1: '#2a3a1a', c2: '#5a7a3a' },
  { id: 6, name: 'Berbice Black', type: 'Demerara Dark', label: 'BERBICE', sub: 'BLACK', tagline: 'Rich Demerara Dark', price: 72.99, c1: '#1a2a3a', c2: '#3a5a7a' },
  { id: 7, name: 'Shell Beach Spiced', type: 'Demerara Dark', label: 'SHELL BEACH', sub: '', tagline: 'Spiced Demerara Rum', price: 58.99, c1: '#1a1a2a', c2: '#3a3a5a' },
  { id: 8, name: 'Puncheon 21', type: 'Reserve', label: 'PUNCHEON', sub: '21', tagline: '21 Year Reserve', price: 124.99, c1: '#6a4a1a', c2: '#a8823a', badge: 'Rare' },
  { id: 9, name: 'Wooden Pot Still', type: 'Reserve', label: 'WOODEN POT', sub: 'STILL', tagline: 'Small Batch Reserve', price: 46.99, c1: '#5a2a1a', c2: '#a85a2a' },
  { id: 10, name: "Founder's Puncheon", type: 'Reserve', label: "FOUNDER'S", sub: 'PUNCHEON', tagline: 'Limited Edition Puncheon', price: 95.99, c1: '#2a1a1a', c2: '#5a3a2a', badge: 'Limited' }
];

const HOME_FEATURED_IDS = [1, 2, 3];
const CART_KEY = 'rumme_cart';
const LAST_ORDER_KEY = 'rumme_last_order';
const DELIVERY_FEE = 9.99;
const TAX_RATE = 0.08;

function formatMoney(n) {
  return '$' + n.toFixed(2);
}

// ---------- Cart storage ----------
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function getQty(id) {
  const entry = getCart().find(c => c.id === id);
  return entry ? entry.qty : 0;
}
function addToCart(id) {
  const cart = getCart();
  const entry = cart.find(c => c.id === id);
  if (entry) entry.qty += 1; else cart.push({ id, qty: 1 });
  setCart(cart);
}
function setQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter(c => c.id !== id);
  else {
    const entry = cart.find(c => c.id === id);
    if (entry) entry.qty = qty; else cart.push({ id, qty });
  }
  setCart(cart);
}
function removeFromCart(id) { setCart(getCart().filter(c => c.id !== id)); }
function cartCount() { return getCart().reduce((s, c) => s + c.qty, 0); }
function cartSubtotal() {
  return getCart().reduce((s, c) => {
    const b = BOTTLES.find(m => m.id === c.id);
    return b ? s + b.price * c.qty : s;
  }, 0);
}
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cartCount();
}

// ---------- Bottle rendering ----------
function bottleGraphicHTML(b) {
  return `<div class="bottle" style="--c1:${b.c1};--c2:${b.c2}"><div class="bottle-cap"></div><div class="bottle-label">${b.label}${b.sub ? '<br><small>' + b.sub + '</small>' : ''}</div></div>`;
}

function bottleCardHTML(b, variant) {
  const qty = getQty(b.id);
  const footHTML = qty > 0
    ? `<div class="qty-stepper" data-id="${b.id}">
         <button class="qty-minus" aria-label="Decrease quantity">−</button>
         <span class="qty-num">${qty}</span>
         <button class="qty-plus" aria-label="Increase quantity">+</button>
       </div>`
    : `<button class="add-btn" data-id="${b.id}" aria-label="Add to cart">+</button>`;
  const badgeHTML = b.badge ? `<span class="bottle-badge">${b.badge}</span>` : '';
  const wrapClass = variant === 'shop' ? 'bottle-card' : 'brand-item';
  return `
    <div class="${wrapClass}" data-id="${b.id}">
      <div class="bottle-wrap">
        ${badgeHTML}
        ${bottleGraphicHTML(b)}
      </div>
      <strong>${b.name}</strong><span>${b.tagline}</span>
      <div class="bottle-foot"><span class="bottle-price">${formatMoney(b.price)}</span>${footHTML}</div>
    </div>`;
}

function renderBottleGrid(container, items, variant) {
  container.innerHTML = items.map(b => bottleCardHTML(b, variant)).join('');
}

function wireBottleGrid(container) {
  container.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-btn');
    if (addBtn) { addToCart(Number(addBtn.dataset.id)); rerenderBottleCard(container, Number(addBtn.dataset.id)); return; }
    const plusBtn = e.target.closest('.qty-plus');
    if (plusBtn) { const id = Number(plusBtn.closest('.qty-stepper').dataset.id); setQty(id, getQty(id) + 1); rerenderBottleCard(container, id); return; }
    const minusBtn = e.target.closest('.qty-minus');
    if (minusBtn) { const id = Number(minusBtn.closest('.qty-stepper').dataset.id); setQty(id, getQty(id) - 1); rerenderBottleCard(container, id); return; }
    const card = e.target.closest('.bottle-card, .brand-item');
    if (card) { window.location.href = `bottle.html?id=${card.dataset.id}`; }
  });
}

function rerenderBottleCard(container, id) {
  const b = BOTTLES.find(m => m.id === id);
  const variant = container.id === 'shopGrid' ? 'shop' : 'home';
  const card = container.querySelector(`[data-id="${id}"]`);
  if (b && card) card.outerHTML = bottleCardHTML(b, variant);
}

// ---------- Cart drawer ----------
function renderCartDrawer() {
  const cart = getCart();
  const list = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmpty');
  const foot = document.getElementById('cartFoot');
  if (!list) return;
  if (cart.length === 0) {
    list.innerHTML = '';
    empty.hidden = false;
    foot.hidden = true;
    return;
  }
  empty.hidden = true;
  foot.hidden = false;
  list.innerHTML = cart.map(c => {
    const b = BOTTLES.find(m => m.id === c.id);
    if (!b) return '';
    return `
      <div class="cart-item" data-id="${b.id}">
        <div class="cart-item-swatch" style="background:linear-gradient(160deg, ${b.c1}, ${b.c2})"></div>
        <div class="cart-item-body">
          <strong>${b.name}</strong>
          <div class="cart-item-price">${formatMoney(b.price)} × ${c.qty}</div>
          <div class="qty-stepper" data-id="${b.id}">
            <button class="qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-remove="${b.id}">Remove</button>
      </div>`;
  }).join('');
  document.getElementById('cartSubtotal').textContent = formatMoney(cartSubtotal());
}

function showOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = false;
  void el.offsetWidth;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAllOverlays() {
  const open = document.querySelectorAll('.cart-overlay.open, .modal-overlay.open');
  open.forEach(o => o.classList.remove('open'));
  document.body.style.overflow = '';
  setTimeout(() => { open.forEach(o => { if (!o.classList.contains('open')) o.hidden = true; }); }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Nav toggle (both left & right nav lists on index; single on subpages) ----------
  const navToggle = document.getElementById('navToggle');
  const mainNavs = document.querySelectorAll('.main-nav');
  if (navToggle && mainNavs.length) {
    navToggle.addEventListener('click', () => {
      const isOpen = !mainNavs[0].classList.contains('open');
      mainNavs.forEach(nav => nav.classList.toggle('open', isOpen));
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  updateCartBadge();

  // ---------- Cart drawer ----------
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', () => { renderCartDrawer(); showOverlay('cartOverlay'); });
  const cartClose = document.getElementById('cartClose');
  if (cartClose) cartClose.addEventListener('click', closeAllOverlays);
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) closeAllOverlays(); });
    document.getElementById('cartItems').addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) { removeFromCart(Number(removeBtn.dataset.remove)); renderCartDrawer(); return; }
      const plusBtn = e.target.closest('.qty-plus');
      if (plusBtn) { const id = Number(plusBtn.closest('.qty-stepper').dataset.id); setQty(id, getQty(id) + 1); renderCartDrawer(); return; }
      const minusBtn = e.target.closest('.qty-minus');
      if (minusBtn) { const id = Number(minusBtn.closest('.qty-stepper').dataset.id); setQty(id, getQty(id) - 1); renderCartDrawer(); return; }
    });
  }

  // ---------- Login modal ----------
  const accountBtn = document.getElementById('accountBtn');
  if (accountBtn) accountBtn.addEventListener('click', () => showOverlay('signInModal'));
  const loginLink = document.getElementById('loginLink');
  if (loginLink) loginLink.addEventListener('click', (e) => { e.preventDefault(); showOverlay('signInModal'); });
  const signInClose = document.getElementById('signInClose');
  if (signInClose) signInClose.addEventListener('click', closeAllOverlays);
  const signInModal = document.getElementById('signInModal');
  if (signInModal) signInModal.addEventListener('click', (e) => { if (e.target === signInModal) closeAllOverlays(); });
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('signInSuccess').hidden = false;
      signInForm.hidden = true;
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllOverlays(); });

  // ---------- Home bottle grid ----------
  const homeGrid = document.getElementById('homeBottleGrid');
  if (homeGrid) {
    renderBottleGrid(homeGrid, BOTTLES.filter(b => HOME_FEATURED_IDS.includes(b.id)), 'home');
    wireBottleGrid(homeGrid);
  }

  // ---------- Shop page ----------
  const shopGrid = document.getElementById('shopGrid');
  if (shopGrid) {
    let activeType = 'All';
    const render = () => {
      const items = activeType === 'All' ? BOTTLES : BOTTLES.filter(b => b.type === activeType);
      renderBottleGrid(shopGrid, items, 'shop');
      document.getElementById('shopCount').textContent = items.length + (items.length === 1 ? ' bottle' : ' bottles');
    };
    render();
    wireBottleGrid(shopGrid);
    document.querySelectorAll('.shop-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeType = tab.dataset.type;
        document.querySelectorAll('.shop-tab').forEach(t => t.classList.toggle('active', t === tab));
        render();
      });
    });
  }

  // ---------- Hero arrows (decorative, original behavior) ----------
  document.querySelectorAll('.hero-arrow').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.add('clicked'));
  });

  // ---------- Newsletter / Join the Club ----------
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Welcome to the club ✓';
      e.target.reset();
      setTimeout(() => { btn.textContent = original; }, 2000);
    });
  }

  // ---------- FAQ accordions ----------
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });

  // ---------- Blog read-more ----------
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.blog-card');
      const expanded = card.classList.toggle('expanded');
      btn.textContent = expanded ? 'Show Less ↑' : 'Read More →';
    });
  });

  // ---------- Track order ----------
  const trackForm = document.getElementById('trackForm');
  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = document.getElementById('trackOrderNumber').value.trim().toUpperCase();
      const result = document.getElementById('trackResult');
      const notFound = document.getElementById('trackNotFound');
      let lastOrder = null;
      try { lastOrder = JSON.parse(localStorage.getItem(LAST_ORDER_KEY)); } catch (err) {}
      if (lastOrder && lastOrder.orderNumber === entered) {
        result.hidden = false;
        notFound.hidden = true;
        document.getElementById('trackOrderNumberOut').textContent = lastOrder.orderNumber;
        document.getElementById('trackOrderDate').textContent = lastOrder.date;
        document.getElementById('trackOrderTotal').textContent = formatMoney(lastOrder.total);
        document.getElementById('trackOrderStatus').textContent = 'Preparing for dispatch';
      } else {
        result.hidden = true;
        notFound.hidden = false;
      }
    });
  }

  // ---------- Checkout page ----------
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    const cart = getCart();
    const checkoutEmpty = document.getElementById('checkoutEmpty');
    const checkoutContent = document.getElementById('checkoutContent');

    if (cart.length === 0) {
      checkoutContent.hidden = true;
      checkoutEmpty.hidden = false;
    } else {
      checkoutContent.hidden = false;
      checkoutEmpty.hidden = true;

      const renderSummary = () => {
        const items = getCart();
        document.getElementById('summaryItems').innerHTML = items.map(c => {
          const b = BOTTLES.find(m => m.id === c.id);
          if (!b) return '';
          return `<div class="summary-item"><span>${b.name} × ${c.qty}</span><strong>${formatMoney(b.price * c.qty)}</strong></div>`;
        }).join('');
        const subtotal = cartSubtotal();
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + DELIVERY_FEE;
        document.getElementById('summarySubtotal').textContent = formatMoney(subtotal);
        document.getElementById('summaryDelivery').textContent = formatMoney(DELIVERY_FEE);
        document.getElementById('summaryTax').textContent = formatMoney(tax);
        document.getElementById('summaryTotal').textContent = formatMoney(total);
      };
      renderSummary();

      const paymentRadios = document.querySelectorAll('input[name="payment"]');
      const cardFields = document.getElementById('cardFields');
      paymentRadios.forEach(r => {
        r.addEventListener('change', () => {
          cardFields.hidden = document.querySelector('input[name="payment"]:checked').value !== 'card';
        });
      });

      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const ageCheck = document.getElementById('ageVerify');
        if (ageCheck && !ageCheck.checked) {
          ageCheck.closest('.check-row').style.color = '#c0392b';
          ageCheck.focus();
          return;
        }
        const name = document.getElementById('checkoutName').value || 'there';
        const orderNumber = 'RM' + Date.now().toString().slice(-6);
        const subtotal = cartSubtotal();
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + DELIVERY_FEE;

        document.getElementById('confirmName').textContent = name.split(' ')[0];
        document.getElementById('confirmOrderNumber').textContent = '#' + orderNumber;
        document.getElementById('confirmTotal').textContent = formatMoney(total);

        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify({
          orderNumber, total, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }));

        checkoutForm.closest('.checkout-form-col').hidden = true;
        document.querySelector('.order-summary').hidden = true;
        document.getElementById('checkoutConfirmation').hidden = false;

        setCart([]);
      });
    }
  }

  initBottlePage();
});

function initBottlePage() {
  const detail = document.getElementById('bottleDetail');
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const bottle = BOTTLES.find(b => b.id === id) || BOTTLES[0];

  document.title = `${bottle.name} — Rum Me!`;
  document.getElementById('crumbName').textContent = bottle.name;
  document.getElementById('bottleType').textContent = bottle.type;
  document.getElementById('bottleName').textContent = bottle.name;
  document.getElementById('bottleTagline').textContent = bottle.tagline;
  document.getElementById('bottlePrice').textContent = formatMoney(bottle.price);
  document.getElementById('bottleGraphic').innerHTML = bottleGraphicHTML(bottle);
  const badge = document.getElementById('bottleBadge');
  if (bottle.badge) { badge.textContent = bottle.badge; badge.hidden = false; } else { badge.hidden = true; }

  const qtyValue = document.getElementById('bottleQty');
  document.querySelector('#bottleQtyStepper .qty-minus').addEventListener('click', () => {
    qtyValue.textContent = Math.max(1, Number(qtyValue.textContent) - 1);
  });
  document.querySelector('#bottleQtyStepper .qty-plus').addEventListener('click', () => {
    qtyValue.textContent = Number(qtyValue.textContent) + 1;
  });

  const addBtn = document.getElementById('bottleAddBtn');
  addBtn.addEventListener('click', () => {
    const qty = Number(qtyValue.textContent);
    const cart = getCart();
    const entry = cart.find(c => c.id === bottle.id);
    if (entry) entry.qty += qty; else cart.push({ id: bottle.id, qty });
    setCart(cart);
    const original = addBtn.textContent;
    addBtn.textContent = 'Added ✓';
    setTimeout(() => { addBtn.textContent = original; }, 1400);
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
  const sameType = BOTTLES.filter(b => b.type === bottle.type && b.id !== bottle.id);
  const others = BOTTLES.filter(b => b.type !== bottle.type && b.id !== bottle.id);
  const related = sameType.concat(others).slice(0, 4);
  renderBottleGrid(relatedGrid, related, 'shop');
  wireBottleGrid(relatedGrid);
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
