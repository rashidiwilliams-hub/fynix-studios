// Feastly — shared ordering dashboard template (order.html?restaurant=<slug>).
// Reads the slug from the query string and renders that restaurant's menu,
// branding accent, and delivery info from data.js. One template, eight restaurants.

let CURRENT_RESTAURANT = null;
let ACTIVE_CATEGORY = 'All';
let SEARCH_TERM = '';

const FAKE_CUSTOMERS = ['Jared Williamson', 'Stephanie Altman', 'Marcus Chen', 'Priya Narine', 'Devon Bacchus', 'Aaliyah Fraser'];
const FAKE_STATUSES = [
  { label: 'Completed', cls: 'status-completed' },
  { label: 'Pending', cls: 'status-pending' },
  { label: 'Preparing', cls: 'status-preparing' }
];

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Simple deterministic hash so the same restaurant always renders the same
// "fake" order-report rows / order id, instead of reshuffling on every load.
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
  return h;
}

function applyAccent(restaurant) {
  document.documentElement.style.setProperty('--accent', restaurant.accent);
}

function renderIdentity(r) {
  document.getElementById('pageTitle').textContent = `${r.name} — Feastly`;
  document.getElementById('restLogo').src = r.cover;
  document.getElementById('restLogo').alt = r.name;
  document.getElementById('restName').textContent = r.name;
  document.getElementById('restCuisine').textContent = r.cuisine;
  document.getElementById('deliveryAddress').textContent = r.address;
  document.getElementById('deliveryEta').textContent = `Estimated ${r.deliveryTime}`;
}

function dishCardHTML(item, slug) {
  return `
    <article class="dish-card" data-id="${item.id}">
      <div class="dc-image"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>
      <div class="dc-body">
        <div class="dc-rating">${starsHTML(item.rating)} <span class="rc-count">(${item.reviews})</span></div>
        <h4>${item.name}</h4>
        <div class="dc-bottom">
          <span class="dc-price">$${item.price.toFixed(2)}</span>
          <button class="dc-add" aria-label="Add ${item.name} to cart" data-add="${item.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;
}

function renderCategoryChips(r) {
  const wrap = document.getElementById('categoryChips');
  const categories = ['All', ...new Set(r.menu.map(i => i.category))];
  wrap.innerHTML = categories.map(c =>
    `<button class="category-chip${c === ACTIVE_CATEGORY ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
  wrap.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      ACTIVE_CATEGORY = chip.dataset.cat;
      wrap.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderDishGrid(r);
    });
  });
}

function renderDishGrid(r) {
  const grid = document.getElementById('dishGrid');
  const term = SEARCH_TERM.trim().toLowerCase();
  const items = r.menu.filter(i => {
    const matchesCategory = ACTIVE_CATEGORY === 'All' || i.category === ACTIVE_CATEGORY;
    const matchesSearch = !term || i.name.toLowerCase().includes(term) || i.category.toLowerCase().includes(term) || i.desc.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
  document.getElementById('dishCountLabel').textContent = `${items.length} dish${items.length === 1 ? '' : 'es'}`;
  grid.innerHTML = items.length
    ? items.map(i => dishCardHTML(i, r.slug)).join('')
    : `<div class="empty-state" style="grid-column: 1/-1;">No dishes match "${SEARCH_TERM}". Try another search.</div>`;

  grid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.add;
      const added = addToCart(r.slug, id);
      if (added) {
        btn.classList.add('added');
        const original = btn.innerHTML;
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
        setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = original; }, 900);
        renderCart(r);
      }
    });
  });
}

function renderReports(r) {
  const seed = hashString(r.slug);
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const s = (seed + i * 97) >>> 0;
    const customer = FAKE_CUSTOMERS[(s + i) % FAKE_CUSTOMERS.length];
    const orderNum = 1000 + (s % 8999);
    const streetNum = 100 + (s % 800);
    const status = FAKE_STATUSES[(s >>> 3) % FAKE_STATUSES.length];
    const item = r.menu[(s >>> 5) % r.menu.length];
    const amount = (item.price * (1 + (s % 3))).toFixed(2);
    rows.push({ customer, orderNum, address: `${streetNum} ${r.address.split(',')[0].replace(/^\d+\s*/, '')}`, amount, status });
  }
  document.getElementById('reportsBody').innerHTML = rows.map(row => `
    <tr>
      <td>${row.customer}</td>
      <td>#${row.orderNum}</td>
      <td>${row.address}</td>
      <td>$${row.amount}</td>
      <td><span class="status-pill ${row.status.cls}">${row.status.label}</span></td>
    </tr>`).join('');
  const completed = rows.filter(r2 => r2.status.label === 'Completed').length;
  document.getElementById('reportsSummary').textContent = `${completed}/${rows.length} completed orders`;
}

function cartItemHTML(menuItem, qty) {
  return `
    <div class="cart-item" data-id="${menuItem.id}">
      <img src="${menuItem.image}" alt="${menuItem.name}">
      <div class="ci-info">
        <div class="ci-name">${menuItem.name}</div>
        <div class="ci-price">$${menuItem.price.toFixed(2)}</div>
      </div>
      <div class="qty-stepper">
        <button data-step="-1" aria-label="Decrease quantity">−</button>
        <span>${qty}</span>
        <button data-step="1" aria-label="Increase quantity">+</button>
      </div>
      <div class="ci-line-total">$${(menuItem.price * qty).toFixed(2)}</div>
    </div>`;
}

function renderCart(r) {
  const cart = loadCart();
  const list = document.getElementById('cartList');
  const belongsHere = cart.restaurant === r.slug;
  const entries = belongsHere ? Object.entries(cart.items) : [];

  if (entries.length === 0) {
    list.innerHTML = '<div class="cart-empty">Your cart is empty. Add a dish to get started.</div>';
  } else {
    list.innerHTML = entries.map(([id, qty]) => {
      const menuItem = r.menu.find(m => m.id === id);
      if (!menuItem) return '';
      return cartItemHTML(menuItem, qty);
    }).join('');
    list.querySelectorAll('.cart-item').forEach(row => {
      const id = row.dataset.id;
      row.querySelectorAll('[data-step]').forEach(btn => {
        btn.addEventListener('click', () => {
          const delta = parseInt(btn.dataset.step, 10);
          const current = loadCart();
          const newQty = (current.items[id] || 0) + delta;
          setQty(id, newQty);
          renderCart(r);
        });
      });
    });
  }

  const subtotal = entries.reduce((sum, [id, qty]) => {
    const menuItem = r.menu.find(m => m.id === id);
    return sum + (menuItem ? menuItem.price * qty : 0);
  }, 0);
  const hasItems = subtotal > 0;
  const deliveryFee = hasItems ? DELIVERY_FEE : 0;
  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartDeliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
  document.getElementById('placeOrderBtn').disabled = !hasItems;
  document.getElementById('orderIdLabel').textContent = hasItems ? `Order ID: ${1000 + hashString(r.slug) % 8999}` : '';

  const fulfillment = (belongsHere && cart.fulfillment) || 'Delivery';
  document.querySelectorAll('#fulfillmentToggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === fulfillment);
  });
}

function wireFulfillmentToggle(r) {
  document.querySelectorAll('#fulfillmentToggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      setFulfillment(btn.dataset.mode);
      renderCart(r);
    });
  });
}

function wireSearch(r) {
  const input = document.getElementById('menuSearch');
  input.addEventListener('input', () => {
    SEARCH_TERM = input.value;
    renderDishGrid(r);
  });
}

function wireSidebarDemos() {
  document.querySelectorAll('[data-demo]').forEach(el => {
    el.addEventListener('click', () => showToast(`${el.dataset.demo} — demo only`));
  });
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById(el.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  document.getElementById('changeAddressBtn')?.addEventListener('click', () => {
    showToast('Address editing — demo only');
  });
  document.getElementById('switchRestaurantBtn')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

function wirePlaceOrder(r) {
  document.getElementById('placeOrderBtn').addEventListener('click', () => {
    const cart = loadCart();
    if (cart.restaurant !== r.slug || cartCount(cart) === 0) return;
    const orderNumber = 1000 + Math.floor(Math.random() * 8999);
    document.getElementById('confirmOrderNumber').textContent = `#${orderNumber}`;
    document.getElementById('confirmRestName').textContent = r.name;
    document.getElementById('confirmEta').textContent = r.deliveryTime;
    document.getElementById('confirmOverlay').hidden = false;
    clearCart();
    renderCart(r);
  });

  document.getElementById('confirmCloseBtn').addEventListener('click', () => {
    document.getElementById('confirmOverlay').hidden = true;
  });
  document.getElementById('confirmBrowseBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

function initOrderPage() {
  const slug = getQueryParam('restaurant');
  const r = slug ? getRestaurant(slug) : null;

  if (!r) {
    document.getElementById('appShell').style.display = 'none';
    document.getElementById('pickRestaurantOverlay').hidden = false;
    return;
  }

  CURRENT_RESTAURANT = r;
  applyAccent(r);
  renderIdentity(r);
  renderCategoryChips(r);
  renderDishGrid(r);
  renderReports(r);
  renderCart(r);
  wireFulfillmentToggle(r);
  wireSearch(r);
  wireSidebarDemos();
  wirePlaceOrder(r);
}

document.addEventListener('DOMContentLoaded', initOrderPage);
