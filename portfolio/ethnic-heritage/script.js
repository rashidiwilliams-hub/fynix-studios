// Ethnic Heritage — local proof-of-concept data & interactivity.
// Everything below runs entirely in the browser; there is no backend.
// This file is shared across every page, so each feature block is guarded
// to only run when its elements are actually present on the current page.

const CART_KEY = 'ethnicheritage_cart';
const CART_COUNT_KEY = 'ethnicheritage_cart_count';

function formatMoney(n) { return '$' + n.toFixed(2); }

// ---------- Cart storage ----------
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}

function getCartCount() {
  return parseInt(localStorage.getItem(CART_COUNT_KEY) || '0', 10);
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  localStorage.setItem(CART_COUNT_KEY, String(count));
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = count);
}

function getQty(slug) {
  const entry = getCart().find(c => c.slug === slug);
  return entry ? entry.qty : 0;
}

function addToCart(slug, qty) {
  qty = qty || 1;
  const cart = getCart();
  const entry = cart.find(c => c.slug === slug);
  if (entry) entry.qty += qty; else cart.push({ slug, qty });
  setCart(cart);
}

function setQty(slug, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(c => c.slug !== slug);
  } else {
    const entry = cart.find(c => c.slug === slug);
    if (entry) entry.qty = qty; else cart.push({ slug, qty });
  }
  setCart(cart);
}

function removeFromCart(slug) {
  setCart(getCart().filter(c => c.slug !== slug));
}

function cartSubtotal() {
  return getCart().reduce((sum, c) => {
    const item = MENU.find(m => m.slug === c.slug);
    return item ? sum + item.price * c.qty : sum;
  }, 0);
}

function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = getCartCount());
}

// ---------- Dish card rendering (menu + related grids) ----------
function dishCardHTML(item) {
  const qty = getQty(item.slug);
  return `
    <article class="dish-card" data-slug="${item.slug}">
      <div class="dish-img">
        <img src="${item.image}" alt="${item.alt}" loading="lazy">
        <span class="dish-category-pill">${item.category}</span>
      </div>
      <div class="dish-card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="dish-footer">
          <span class="dish-price">${formatMoney(item.price)}</span>
          <div class="qty-stepper" data-slug="${item.slug}">
            <button type="button" class="qty-minus" aria-label="Decrease quantity"${qty === 0 ? ' disabled' : ''}>&minus;</button>
            <span class="qty-num">${qty}</span>
            <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
    </article>`;
}

function featuredCardHTML(item) {
  return `
    <article class="featured-card" data-slug="${item.slug}">
      <div class="featured-img"><img src="${item.image}" alt="${item.alt}" loading="lazy"></div>
      <div class="featured-body">
        <span class="featured-tag">${item.category}</span>
        <h3>${item.name}</h3>
        <p class="featured-label">Description</p>
        <p class="featured-desc">${item.desc}</p>
        <p class="featured-label">Ingredients</p>
        <p class="featured-ingredients">${item.ingredients}</p>
        <button type="button" class="btn btn-primary featured-add" data-add="${item.slug}">Add to Cart — ${formatMoney(item.price)}</button>
      </div>
    </article>`;
}

function renderDishGrid(container, items) {
  container.innerHTML = items.length ? items.map(dishCardHTML).join('') : '<p class="no-results">No dishes found in this category.</p>';
}

function wireDishGrid(container) {
  container.addEventListener('click', (e) => {
    const plusBtn = e.target.closest('.qty-plus');
    if (plusBtn) {
      const slug = plusBtn.closest('.qty-stepper').dataset.slug;
      const newQty = getQty(slug) + 1;
      if (getQty(slug) === 0) addToCart(slug, 1); else setQty(slug, newQty);
      rerenderCard(container, slug);
      flashAdded(container, slug);
      return;
    }
    const minusBtn = e.target.closest('.qty-minus');
    if (minusBtn) {
      const slug = minusBtn.closest('.qty-stepper').dataset.slug;
      setQty(slug, getQty(slug) - 1);
      rerenderCard(container, slug);
      return;
    }
    const card = e.target.closest('.dish-card');
    if (card) window.location.href = `dish.html?id=${card.dataset.slug}`;
  });
}

function rerenderCard(container, slug) {
  const item = MENU.find(m => m.slug === slug);
  const card = container.querySelector(`.dish-card[data-slug="${slug}"]`);
  if (item && card) card.outerHTML = dishCardHTML(item);
}

function flashAdded(container, slug) {
  const card = container.querySelector(`.dish-card[data-slug="${slug}"]`);
  if (!card) return;
  card.classList.add('just-added');
  setTimeout(() => card.classList.remove('just-added'), 700);
}

function wireFeaturedGrid(container) {
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (btn) {
      addToCart(btn.dataset.add, 1);
      const original = btn.textContent;
      btn.textContent = 'Added to Cart ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = original; btn.classList.remove('added'); }, 1400);
      return;
    }
    const card = e.target.closest('.featured-card');
    if (card) window.location.href = `dish.html?id=${card.dataset.slug}`;
  });
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
    const item = MENU.find(m => m.slug === c.slug);
    if (!item) return '';
    return `
      <div class="cart-item" data-slug="${item.slug}">
        <img src="${item.image}" alt="${item.alt}">
        <div class="cart-item-body">
          <strong>${item.name}</strong>
          <div class="cart-item-price">${formatMoney(item.price)} &times; ${c.qty}</div>
          <div class="qty-stepper" data-slug="${item.slug}">
            <button type="button" class="qty-minus" aria-label="Decrease quantity">&minus;</button>
            <span class="qty-num">${c.qty}</span>
            <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" data-remove="${item.slug}">Remove</button>
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

function openCart() { renderCartDrawer(); showOverlay('cartOverlay'); }

function closeAllOverlays() {
  const open = document.querySelectorAll('.cart-overlay.open');
  open.forEach(o => o.classList.remove('open'));
  document.body.style.overflow = '';
  setTimeout(() => { open.forEach(o => { if (!o.classList.contains('open')) o.hidden = true; }); }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Nav toggle (every page) ----------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ---------- Cart badge + drawer (every page) ----------
  updateCartBadge();
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  const cartClose = document.getElementById('cartClose');
  if (cartClose) cartClose.addEventListener('click', closeAllOverlays);
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) closeAllOverlays(); });
    document.getElementById('cartItems').addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) { removeFromCart(removeBtn.dataset.remove); renderCartDrawer(); return; }
      const plusBtn = e.target.closest('.qty-plus');
      if (plusBtn) {
        const slug = plusBtn.closest('.qty-stepper').dataset.slug;
        setQty(slug, getQty(slug) + 1);
        renderCartDrawer();
        return;
      }
      const minusBtn = e.target.closest('.qty-minus');
      if (minusBtn) {
        const slug = minusBtn.closest('.qty-stepper').dataset.slug;
        setQty(slug, getQty(slug) - 1);
        renderCartDrawer();
        return;
      }
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllOverlays(); });

  // ---------- Home page featured + gallery already static HTML; just wire add-to-cart on home featured teaser ----------
  const homeFeaturedGrid = document.getElementById('homeFeaturedGrid');
  if (homeFeaturedGrid) {
    homeFeaturedGrid.innerHTML = MENU.filter(m => m.featured).slice(0, 3).map(featuredCardHTML).join('');
    wireFeaturedGrid(homeFeaturedGrid);
  }

  const homeSidebarList = document.getElementById('homeSidebarList');
  if (homeSidebarList) {
    const sidebarSlugs = ['moonlit-shrimp-crescents', 'alpine-breeze-cheese-salad', 'nomads-burrito'];
    const picks = sidebarSlugs.map(slug => MENU.find(m => m.slug === slug)).filter(Boolean);
    homeSidebarList.innerHTML = picks.map(item => `
      <a class="sidebar-dish" href="dish.html?id=${item.slug}">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </a>`).join('');
  }

  // ---------- Full menu page (menu.html) ----------
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    featuredGrid.innerHTML = MENU.filter(m => m.featured).map(featuredCardHTML).join('');
    wireFeaturedGrid(featuredGrid);
  }

  const menuGrid = document.getElementById('menuGrid');
  if (menuGrid) {
    const params = new URLSearchParams(window.location.search);
    const categories = ['All', ...CATEGORY_ORDER];
    let activeCategory = categories.includes(params.get('category')) ? params.get('category') : 'All';
    const tabs = document.getElementById('menuTabs');

    const render = () => {
      const items = activeCategory === 'All' ? MENU : MENU.filter(m => m.category === activeCategory);
      renderDishGrid(menuGrid, items);
      const countEl = document.getElementById('menuCount');
      if (countEl) countEl.textContent = `${items.length} ${items.length === 1 ? 'dish' : 'dishes'}`;
    };

    if (tabs) {
      tabs.innerHTML = categories.map(c => `<button type="button" class="menu-tab${c === activeCategory ? ' active' : ''}" data-category="${c}">${c}</button>`).join('');
      tabs.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          activeCategory = tab.dataset.category;
          tabs.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t === tab));
          render();
        });
      });
    }
    render();
    wireDishGrid(menuGrid);
  }

  // ---------- Dish detail page (dish.html) ----------
  initDishPage();

  // ---------- Checkout page (checkout.html) ----------
  initCheckoutPage();

  // ---------- Reservation form (reservation.html) ----------
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    const dateInput = document.getElementById('resDate');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!reservationForm.checkValidity()) { reservationForm.reportValidity(); return; }
      const name = document.getElementById('resName').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('resGuests').value;
      document.getElementById('confirmResName').textContent = name;
      document.getElementById('confirmResDetails').textContent = `${formatDisplayDate(date)} at ${time} · Party of ${guests}`;
      reservationForm.hidden = true;
      document.querySelector('.form-intro-hide')?.setAttribute('hidden', '');
      document.getElementById('reservationConfirmation').hidden = false;
    });
  }

  // ---------- Events inquiry form (events.html) ----------
  const eventsForm = document.getElementById('eventsForm');
  if (eventsForm) {
    eventsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!eventsForm.checkValidity()) { eventsForm.reportValidity(); return; }
      document.getElementById('eventsFormSuccess').hidden = false;
      eventsForm.hidden = true;
    });
  }

  // ---------- Contact form (contact.html) ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      document.getElementById('contactFormSuccess').hidden = false;
      contactForm.hidden = true;
    });
  }

  // ---------- Newsletter-style forms fallback (none currently) ----------

  // ---------- Header shadow on scroll (every page) ----------
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const updateHeaderShadow = () => siteHeader.classList.toggle('scrolled', window.scrollY > 8);
    updateHeaderShadow();
    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  }

  // ---------- Back to top button (every page, injected) ----------
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
  document.body.appendChild(backToTop);
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => { backToTop.classList.toggle('visible', window.scrollY > 500); }, { passive: true });
});

function formatDisplayDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function initDishPage() {
  const detail = document.getElementById('dishDetail');
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const item = MENU.find(m => m.slug === params.get('id')) || MENU[0];

  document.title = `${item.name} — Ethnic Heritage`;
  document.getElementById('crumbCategory').textContent = item.category;
  document.getElementById('crumbCategory').href = `menu.html?category=${encodeURIComponent(item.category)}`;
  document.getElementById('crumbName').textContent = item.name;
  document.getElementById('dishCategory').textContent = item.category;
  document.getElementById('dishName').textContent = item.name;
  document.getElementById('dishDesc').textContent = item.desc;
  document.getElementById('dishIngredients').textContent = item.ingredients;
  document.getElementById('dishPrice').textContent = formatMoney(item.price);
  const img = document.getElementById('dishImage');
  img.src = item.image;
  img.alt = item.alt;

  let qty = 1;
  const qtyValue = document.getElementById('dishQty');
  document.getElementById('dishQtyMinus').addEventListener('click', () => { qty = Math.max(1, qty - 1); qtyValue.textContent = qty; });
  document.getElementById('dishQtyPlus').addEventListener('click', () => { qty += 1; qtyValue.textContent = qty; });

  const addBtn = document.getElementById('dishAddBtn');
  addBtn.addEventListener('click', () => {
    addToCart(item.slug, qty);
    const original = addBtn.textContent;
    addBtn.textContent = 'Added to Cart ✓';
    addBtn.classList.add('added');
    setTimeout(() => { addBtn.textContent = original; addBtn.classList.remove('added'); }, 1400);
  });

  const relatedGrid = document.getElementById('relatedGrid');
  const sameCategory = MENU.filter(m => m.category === item.category && m.slug !== item.slug);
  const others = MENU.filter(m => m.category !== item.category && m.slug !== item.slug);
  const related = sameCategory.concat(others).slice(0, 4);
  renderDishGrid(relatedGrid, related);
  wireDishGrid(relatedGrid);
}

function initCheckoutPage() {
  const checkoutForm = document.getElementById('checkoutForm');
  const summaryItems = document.getElementById('summaryItems');
  if (!summaryItems) return;

  const checkoutEmpty = document.getElementById('checkoutEmpty');
  const checkoutContent = document.getElementById('checkoutContent');
  const cart = getCart();

  if (cart.length === 0) {
    checkoutContent.hidden = true;
    checkoutEmpty.hidden = false;
    return;
  }
  checkoutContent.hidden = false;
  checkoutEmpty.hidden = true;

  function renderSummary() {
    const items = getCart();
    if (items.length === 0) {
      checkoutContent.hidden = true;
      checkoutEmpty.hidden = false;
      return;
    }
    summaryItems.innerHTML = items.map(c => {
      const item = MENU.find(m => m.slug === c.slug);
      if (!item) return '';
      return `
        <div class="summary-item" data-slug="${item.slug}">
          <img src="${item.image}" alt="${item.alt}">
          <div class="summary-item-body">
            <strong>${item.name}</strong>
            <div class="qty-stepper" data-slug="${item.slug}">
              <button type="button" class="qty-minus" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-num">${c.qty}</span>
              <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <span class="summary-item-price">${formatMoney(item.price * c.qty)}</span>
          <button type="button" class="cart-item-remove" data-remove="${item.slug}">Remove</button>
        </div>`;
    }).join('');
    const subtotal = cartSubtotal();
    const serviceFee = subtotal * SERVICE_FEE_RATE;
    const total = subtotal + serviceFee + DELIVERY_FEE;
    document.getElementById('summarySubtotal').textContent = formatMoney(subtotal);
    document.getElementById('summaryDelivery').textContent = formatMoney(DELIVERY_FEE);
    document.getElementById('summaryService').textContent = formatMoney(serviceFee);
    document.getElementById('summaryTotal').textContent = formatMoney(total);
  }
  renderSummary();

  summaryItems.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) { removeFromCart(removeBtn.dataset.remove); renderSummary(); return; }
    const plusBtn = e.target.closest('.qty-plus');
    if (plusBtn) {
      const slug = plusBtn.closest('.qty-stepper').dataset.slug;
      setQty(slug, getQty(slug) + 1);
      renderSummary();
      return;
    }
    const minusBtn = e.target.closest('.qty-minus');
    if (minusBtn) {
      const slug = minusBtn.closest('.qty-stepper').dataset.slug;
      setQty(slug, getQty(slug) - 1);
      renderSummary();
      return;
    }
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (getCart().length === 0) return;
      if (!checkoutForm.checkValidity()) { checkoutForm.reportValidity(); return; }
      const name = document.getElementById('checkoutName').value || 'there';
      const orderNumber = 'EH' + Date.now().toString().slice(-6);
      const subtotal = cartSubtotal();
      const serviceFee = subtotal * SERVICE_FEE_RATE;
      const total = subtotal + serviceFee + DELIVERY_FEE;

      document.getElementById('confirmName').textContent = name.split(' ')[0];
      document.getElementById('confirmOrderNumber').textContent = '#' + orderNumber;
      document.getElementById('confirmTotal').textContent = formatMoney(total);

      checkoutForm.closest('.checkout-form-col').hidden = true;
      document.querySelector('.order-summary').hidden = true;
      document.getElementById('checkoutConfirmation').hidden = false;

      setCart([]);
    });
  }
}

// ---------- Permanent link back to the Fynix Studios portfolio ----------
(function () {
  var style = document.createElement('style');
  style.textContent = '.fynix-back-link{position:fixed;bottom:18px;left:18px;z-index:9000;background:#2a1210;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.85;transition:opacity .2s ease,transform .2s ease;display:inline-flex;align-items:center;gap:6px;}' +
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
