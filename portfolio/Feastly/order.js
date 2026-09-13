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
const REVIEW_TEMPLATES = [
  "Exactly what I was craving — will order again.",
  "Arrived hot and fresh, packed really well.",
  "Portion size was generous for the price.",
  "One of the best versions of this I've had in Georgetown.",
  "Great flavor, quick delivery, no complaints.",
  "A little pricey but worth it for the quality."
];
const PROMOTIONS = [
  { title: '10% Off First Order', desc: "New to this kitchen? Save on your very first order.", code: 'WELCOME10' },
  { title: 'Free Delivery Over $30', desc: 'Spend $30 or more and delivery is on us.', code: 'FREESHIP30' },
  { title: '20% Off Weekend Orders', desc: 'Order Friday through Sunday and save 20%.', code: 'WEEKEND20' }
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

function addressKey(slug) { return `feastly_address_${slug}`; }
function settingsKey(slug) { return `feastly_settings_${slug}`; }

function renderIdentity(r) {
  document.getElementById('pageTitle').textContent = `${r.name} — Feastly`;
  document.getElementById('restLogo').src = r.cover;
  document.getElementById('restLogo').alt = r.name;
  document.getElementById('restName').textContent = r.name;
  document.getElementById('restCuisine').textContent = r.cuisine;
  document.getElementById('deliveryAddress').textContent = localStorage.getItem(addressKey(r.slug)) || r.address;
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

function generateOrderRows(r, count) {
  const seed = hashString(r.slug);
  const rows = [];
  for (let i = 0; i < count; i++) {
    const s = (seed + i * 97) >>> 0;
    const customer = FAKE_CUSTOMERS[(s + i) % FAKE_CUSTOMERS.length];
    const orderNum = 1000 + (s % 8999);
    const streetNum = 100 + (s % 800);
    const status = FAKE_STATUSES[(s >>> 3) % FAKE_STATUSES.length];
    const item = r.menu[(s >>> 5) % r.menu.length];
    const amount = item.price * (1 + (s % 3));
    rows.push({ customer, orderNum, address: `${streetNum} ${r.address.split(',')[0].replace(/^\d+\s*/, '')}`, amount, status, item });
  }
  return rows;
}

function renderReports(r) {
  const rows = generateOrderRows(r, 5);
  document.getElementById('reportsBody').innerHTML = rows.map(row => `
    <tr>
      <td>${row.customer}</td>
      <td>#${row.orderNum}</td>
      <td>${row.address}</td>
      <td>$${row.amount.toFixed(2)}</td>
      <td><span class="status-pill ${row.status.cls}">${row.status.label}</span></td>
    </tr>`).join('');
  const completed = rows.filter(x => x.status.label === 'Completed').length;
  document.getElementById('reportsSummary').textContent = `${completed}/${rows.length} completed orders`;
}

function renderCustomers(r) {
  const rows = generateOrderRows(r, 8);
  const map = new Map();
  rows.forEach(row => {
    const entry = map.get(row.customer) || { orders: 0, total: 0, lastStatus: row.status };
    entry.orders += 1;
    entry.total += row.amount;
    entry.lastStatus = row.status;
    map.set(row.customer, entry);
  });
  const entries = [...map.entries()];
  document.getElementById('customersBody').innerHTML = entries.map(([name, data]) => `
    <tr>
      <td>${name}</td>
      <td>${data.orders}</td>
      <td>$${data.total.toFixed(2)}</td>
      <td><span class="status-pill ${data.lastStatus.cls}">${data.lastStatus.label}</span></td>
    </tr>`).join('');
  document.getElementById('customersSummary').textContent = `${entries.length} customers this month`;
}

function renderReviews(r) {
  const seed = hashString(r.slug + '-reviews');
  const dishes = [...r.menu].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = dishes.map((item, i) => {
    const s = (seed + i * 53) >>> 0;
    const reviewer = FAKE_CUSTOMERS[s % FAKE_CUSTOMERS.length];
    const comment = REVIEW_TEMPLATES[s % REVIEW_TEMPLATES.length];
    return `
      <div class="review-card">
        <div class="rv-head">
          <strong>${reviewer}</strong>
          <span class="stars">${starsHTML(item.rating)}</span>
        </div>
        <p class="rv-dish">On ${item.name}</p>
        <p class="rv-comment">"${comment}"</p>
      </div>`;
  }).join('');
  const avg = (dishes.reduce((sum, d) => sum + d.rating, 0) / dishes.length).toFixed(1);
  document.getElementById('reviewsSummary').textContent = `${avg} average across top dishes`;
}

function renderPromotions() {
  const grid = document.getElementById('promoGrid');
  grid.innerHTML = PROMOTIONS.map(p => `
    <div class="promo-card-mini">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="promo-code-row">
        <code>${p.code}</code>
        <button type="button" class="copy-code-btn" data-code="${p.code}">Copy</button>
      </div>
    </div>`).join('');
  grid.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.dataset.code;
      try {
        await navigator.clipboard.writeText(code);
        showToast(`Code copied — ${code}`);
      } catch (e) {
        showToast(`Your code: ${code}`);
      }
    });
  });
}

function loadSettings(slug) {
  try {
    const raw = JSON.parse(localStorage.getItem(settingsKey(slug)));
    if (raw && typeof raw === 'object') return raw;
  } catch (e) {}
  return { emailNotif: true, smsNotif: false, marketing: false, acceptingOrders: true };
}

function wireSettings(r) {
  const settings = loadSettings(r.slug);
  const map = {
    setEmailNotif: 'emailNotif',
    setSmsNotif: 'smsNotif',
    setMarketing: 'marketing',
    setAcceptingOrders: 'acceptingOrders'
  };
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.checked = !!settings[key];
    el.addEventListener('change', () => {
      const current = loadSettings(r.slug);
      current[key] = el.checked;
      localStorage.setItem(settingsKey(r.slug), JSON.stringify(current));
      showToast('Settings saved');
    });
  });
}

function renderUpcomingReservations(r) {
  const seed = hashString(r.slug + '-upcoming');
  const times = ['5:30 PM', '6:00 PM', '6:45 PM', '7:15 PM', '7:30 PM', '8:00 PM', '8:30 PM'];
  const dayNames = ['Today', 'Tomorrow'];
  const list = document.getElementById('upcomingReservationsList');
  const items = [];
  for (let i = 0; i < 4; i++) {
    const s = (seed + i * 71) >>> 0;
    const name = FAKE_CUSTOMERS[(s + i * 3) % FAKE_CUSTOMERS.length];
    const party = 2 + (s % 6);
    const dayOffset = (s >>> 4) % 4;
    const day = dayOffset < dayNames.length ? dayNames[dayOffset] : `In ${dayOffset} days`;
    const time = times[(s >>> 7) % times.length];
    items.push({ name, party, day, time });
  }
  list.innerHTML = items.map(item => `
    <div class="upcoming-res-item">
      <div class="upcoming-res-info">
        <strong>${item.name}</strong>
        <span>${item.day} · ${item.time}</span>
      </div>
      <span class="upcoming-res-party">${item.party} guests</span>
    </div>`).join('');
}

function wireReservations(r) {
  const form = document.getElementById('reservationForm');
  const confirmBox = document.getElementById('reservationConfirm');
  document.getElementById('reservationsSummary').textContent = 'Same-day requests welcome';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('resName').value.trim();
    const party = document.getElementById('resParty').value;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const dateObj = date ? new Date(`${date}T${time || '19:00'}`) : null;
    const formatted = dateObj && !isNaN(dateObj)
      ? dateObj.toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })
      : `${date} at ${time}`;
    document.getElementById('reservationConfirmText').textContent =
      `Thanks, ${name}! Your table for ${party} at ${r.name} is requested for ${formatted}. We'll confirm shortly.`;
    form.hidden = true;
    confirmBox.hidden = false;
  });
  document.getElementById('reservationNewBtn').addEventListener('click', () => {
    form.reset();
    document.getElementById('resParty').value = 2;
    document.getElementById('resTime').value = '19:00';
    form.hidden = false;
    confirmBox.hidden = true;
  });
}

function wireAddressEditing(r) {
  const displayRow = document.getElementById('addressDisplayRow');
  const editRow = document.getElementById('addressEditRow');
  const input = document.getElementById('addressInput');
  const addressSpan = document.getElementById('deliveryAddress');

  document.getElementById('changeAddressBtn').addEventListener('click', () => {
    input.value = addressSpan.textContent;
    displayRow.hidden = true;
    editRow.hidden = false;
    input.focus();
  });
  document.getElementById('saveAddressBtn').addEventListener('click', () => {
    const value = input.value.trim();
    if (value) {
      addressSpan.textContent = value;
      localStorage.setItem(addressKey(r.slug), value);
    }
    displayRow.hidden = false;
    editRow.hidden = true;
  });
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

  const itemCount = entries.reduce((sum, [, qty]) => sum + qty, 0);
  document.getElementById('mobileCartCount').textContent = `${itemCount} item${itemCount === 1 ? '' : 's'}`;
  document.getElementById('mobileCartSubtotal').textContent = `$${subtotal.toFixed(2)}`;

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

function wireSidebarNav() {
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.side-nav-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');
      document.getElementById(el.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  document.getElementById('switchRestaurantBtn')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

function wireMobileCartDrawer() {
  const rail = document.getElementById('appRail');
  const backdrop = document.getElementById('railBackdrop');
  const openCart = () => { rail.classList.add('open'); backdrop.classList.add('open'); };
  const closeCart = () => { rail.classList.remove('open'); backdrop.classList.remove('open'); };
  document.getElementById('mobileCartBar').addEventListener('click', openCart);
  document.getElementById('railCloseBtn').addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);
}

function closeMobileCart() {
  document.getElementById('appRail').classList.remove('open');
  document.getElementById('railBackdrop').classList.remove('open');
}

function wirePlaceOrder(r) {
  document.getElementById('placeOrderBtn').addEventListener('click', () => {
    const cart = loadCart();
    if (cart.restaurant !== r.slug || cartCount(cart) === 0) return;
    const orderNumber = 1000 + Math.floor(Math.random() * 8999);
    document.getElementById('confirmOrderNumber').textContent = `#${orderNumber}`;
    document.getElementById('confirmRestName').textContent = r.name;
    document.getElementById('confirmEta').textContent = r.deliveryTime;
    closeMobileCart();
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
  renderIdentity(r);
  renderCategoryChips(r);
  renderDishGrid(r);
  renderReports(r);
  renderCustomers(r);
  renderReviews(r);
  renderPromotions();
  renderCart(r);
  wireFulfillmentToggle(r);
  wireSearch(r);
  wireSidebarNav();
  renderUpcomingReservations(r);
  wireReservations(r);
  wireSettings(r);
  wireAddressEditing(r);
  wirePlaceOrder(r);
  wireMobileCartDrawer();
}

document.addEventListener('DOMContentLoaded', initOrderPage);
