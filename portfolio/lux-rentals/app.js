// ===========================================================
// Lux Rentals — shared app shell, theme, and utility helpers.
// Loaded on every page after data.js. Pure vanilla JS, no build step.
// ===========================================================

const LS_THEME = 'luxrentals_theme';
const LS_LAST_VEHICLE = 'luxrentals_last_vehicle';
const LS_SETTINGS = 'luxrentals_settings';

const STUDIO_CONTACT = { phone: '+592 713 5786', email: 'hello@luxrentals.com' };

/* ---------- Theme ---------- */
function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.innerHTML = mode === 'dark' ? ICONS.moon : ICONS.sun;
}
function initTheme() {
  const saved = localStorage.getItem(LS_THEME) || 'dark';
  applyTheme(saved);
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(LS_THEME, next);
      applyTheme(next);
    });
  }
}

/* ---------- Formatting helpers ---------- */
function money(n) {
  return 'GYD ' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function moneyShort(n) {
  return 'GYD ' + Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 });
}
function numFmt(n) { return Number(n || 0).toLocaleString('en-US'); }
function slugifyBadge(s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ''); }
function initials(name) {
  return String(name).split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function getVehicle(slug) {
  return FLEET.find(v => v.slug === slug) || null;
}

/* ---------- Icon set (inline SVG strings, stroke=currentColor) ---------- */
const ICONS = {
  sun: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8"/></svg>',
  moon: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  bell: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  menu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  car: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.6-4.8A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.2L21 13"/><rect x="2.5" y="13" width="19" height="6" rx="1.8"/><circle cx="7" cy="19.5" r="1.6"/><circle cx="17" cy="19.5" r="1.6"/></svg>',
  fleet: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17l1.4-4.5A2 2 0 0 1 5.3 11h5.4a2 2 0 0 1 1.9 1.5L14 17"/><rect x="1.5" y="17" width="13" height="4" rx="1.2"/><circle cx="5" cy="21" r="1.2"/><circle cx="11" cy="21" r="1.2"/><path d="M14 14h5.2a2 2 0 0 1 1.9 1.4L22 19v2h-3"/><circle cx="18" cy="21" r="1.2"/></svg>',
  users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.4 2.9-6 6.5-6s6.5 2.6 6.5 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.8 14.3c2.9.4 5.2 2.6 5.2 5.7"/></svg>',
  financials: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 3 7-8"/><path d="M14 7h5v5"/></svg>',
  damage: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 20h20L12 2Z"/><path d="M12 9v5M12 17.2v.1"/></svg>',
  wrench: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z"/></svg>',
  settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.5 7.5 0 0 0 0-3l1.9-1.4-2-3.4-2.2.8a7.6 7.6 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.5a7.6 7.6 0 0 0-2.6 1.5l-2.2-.8-2 3.4L4.6 10.5a7.5 7.5 0 0 0 0 3L2.7 15l2 3.4 2.2-.8c.76.66 1.64 1.17 2.6 1.5l.5 2.4h4l.5-2.5a7.6 7.6 0 0 0 2.6-1.5l2.2.8 2-3.4-1.9-1.4Z"/></svg>',
  logout: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
  user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7"/></svg>',
  phone: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5c0 8.3 6.7 15 15 15l3-4-6-3-1.5 2A12 12 0 0 1 8.5 9.5L10.5 8 7.5 2 4 5Z"/></svg>',
  mail: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6l9 7 9-7"/></svg>',
  pin: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.3 7-11.5a7 7 0 1 0-14 0C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.4" r="2.4" fill="currentColor" stroke="none"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  info: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6M12 7.5v.1"/></svg>'
};

/* ---------- Sidebar / topbar chrome ---------- */
const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', href: 'index.html', icon: ICONS.dashboard },
  { key: 'rental-overview', label: 'Rental Overview', hrefFn: () => `rental-overview.html?id=${encodeURIComponent(localStorage.getItem(LS_LAST_VEHICLE) || FLEET[0].slug)}`, icon: ICONS.car },
  { key: 'fleet-management', label: 'Fleet Management', href: 'fleet-management.html', icon: ICONS.fleet },
  { key: 'customer-profiles', label: 'Customer Profiles', href: 'customer-profiles.html', icon: ICONS.users },
  { key: 'financials', label: 'Financials', href: 'financials.html', icon: ICONS.financials },
  { key: 'damage-reports', label: 'Damage Reports', href: 'damage-reports.html', icon: ICONS.damage },
  { key: 'maintenance-reports', label: 'Maintenance Reports', href: 'maintenance-reports.html', icon: ICONS.wrench },
  { key: 'settings', label: 'Settings', href: 'settings.html', icon: ICONS.settings }
];

const INFO_PANELS = {
  about: {
    title: 'About Lux Rentals',
    body: `<p class="hint" style="margin-top:0">Lux Rentals is the internal fleet-operations console used by Lux Rentals staff to track vehicles, renters, financials, and maintenance across the whole fleet.</p>
    <p style="font-size:.85rem;color:var(--text-muted);line-height:1.6">Built and maintained as part of the Fynix Studios portfolio — a design &amp; engineering studio crafting bespoke digital products.</p>`
  },
  policy: {
    title: 'Rental Policy',
    body: `<ul style="display:flex;flex-direction:column;gap:10px;font-size:.85rem;color:var(--text-muted);line-height:1.5">
      <li>Renters must present a valid driver's license and hold full insurance coverage or purchase Lux Rentals coverage at checkout.</li>
      <li>Vehicles are inspected against the 11-point Parts Overview before and after every rental; new damage is logged to Damage Reports.</li>
      <li>Late returns are billed at 1.5x the daily rate per additional day, starting one hour after the scheduled return time.</li>
      <li>A refundable security hold is authorized at pickup and released within 5 business days of a clean return.</li>
    </ul>`
  },
  legal: {
    title: 'Legal Information',
    body: `<p class="hint" style="margin-top:0">Lux Rentals is a fictional operations demo built by Fynix Studios to showcase dashboard-grade product design. No real rental transactions occur here.</p>
    <p style="font-size:.85rem;color:var(--text-muted);line-height:1.6">Studio contact: ${STUDIO_CONTACT.phone} &middot; ${STUDIO_CONTACT.email}</p>`
  }
};

function renderChrome(activeKey, subtitle) {
  const sidebarMount = document.getElementById('sidebarMount');
  const topbarMount = document.getElementById('topbarMount');
  if (!sidebarMount) return;

  const navHTML = NAV_ITEMS.map(item => {
    const href = item.hrefFn ? item.hrefFn() : item.href;
    const active = item.key === activeKey ? ' active' : '';
    return `<a class="side-link${active}" href="${href}">${item.icon}<span>${item.label}</span></a>`;
  }).join('');

  sidebarMount.innerHTML = `
    <div class="brand">
      <div>
        <img class="brand-logo" src="assets/images/logo-web.png?v=1" alt="Lux Rentals" width="720" height="106">
        <div class="brand-sub">Fleet Ops Console</div>
      </div>
    </div>
    <div class="top-links">
      <button data-info="about">About</button>
      <button data-info="policy">Rental Policy</button>
      <button data-info="legal">Legal Information</button>
    </div>
    <div class="account-card">
      <div class="account-avatar">${ICONS.user}</div>
      <div class="account-info">
        <div class="account-name">Ops Console</div>
        <div class="account-role">Signed in &middot; Fleet Manager</div>
        <div class="account-line">${ICONS.phone}<span>${STUDIO_CONTACT.phone}</span></div>
        <div class="account-line">${ICONS.mail}<span>${STUDIO_CONTACT.email}</span></div>
      </div>
    </div>
    <nav class="side-nav">
      <div class="side-nav-label">Operations</div>
      ${navHTML}
    </nav>
    <div class="sidebar-footer">
      <button class="logout-btn" id="logoutBtn">${ICONS.logout}<span>Log Out</span></button>
    </div>
  `;

  const scrim = document.createElement('div');
  scrim.className = 'sidebar-scrim';
  scrim.id = 'sidebarScrim';
  document.body.appendChild(scrim);

  if (topbarMount) {
    const current = NAV_ITEMS.find(n => n.key === activeKey);
    topbarMount.innerHTML = `
      <button class="icon-btn hamburger-btn" id="hamburgerBtn" aria-label="Open menu">${ICONS.menu}</button>
      <div class="topbar-title">
        <h1>${current ? current.label : 'Lux Rentals'}</h1>
        <p id="topbarSubtitle">${subtitle || 'Fleet operations, in real time.'}</p>
      </div>
      <div class="topbar-actions">
        <button class="icon-btn" id="themeToggleBtn" aria-label="Toggle theme"></button>
        <div class="topbar-anchor">
          <button class="icon-btn" id="notifBtn" aria-label="Notifications">${ICONS.bell}<span class="dot"></span></button>
          <div class="popover" id="notifPopover" hidden>
            <div class="popover-head">Notifications</div>
            <div class="notif-item"><div class="notif-dot"></div><div class="notif-body"><p>Sterling GT Coupe return is due in 2 days.</p><span>2h ago</span></div></div>
            <div class="notif-item"><div class="notif-dot"></div><div class="notif-body"><p>New damage report filed on Obsidian Convertible.</p><span>1d ago</span></div></div>
            <div class="notif-item"><div class="notif-dot"></div><div class="notif-body"><p>Halcyon Sport Sedan maintenance is in progress.</p><span>2d ago</span></div></div>
            <div class="notif-item"><div class="notif-dot"></div><div class="notif-body"><p>Priya Nair cleared her Voss SUV Elite rental.</p><span>3d ago</span></div></div>
          </div>
        </div>
      </div>
    `;
  }

  // wire hamburger / scrim
  const hb = document.getElementById('hamburgerBtn');
  const sidebar = document.querySelector('.sidebar');
  const sidebarScrim = document.getElementById('sidebarScrim');
  function closeSidebar() { sidebar.classList.remove('open'); sidebarScrim.classList.remove('show'); }
  if (hb) hb.addEventListener('click', () => { sidebar.classList.add('open'); sidebarScrim.classList.add('show'); });
  if (sidebarScrim) sidebarScrim.addEventListener('click', closeSidebar);

  // wire notifications popover
  const notifBtn = document.getElementById('notifBtn');
  const notifPop = document.getElementById('notifPopover');
  if (notifBtn && notifPop) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifPop.hidden = !notifPop.hidden;
    });
    document.addEventListener('click', (e) => {
      if (!notifPop.hidden && !notifPop.contains(e.target) && e.target !== notifBtn) notifPop.hidden = true;
    });
  }

  // wire info panel buttons
  document.querySelectorAll('[data-info]').forEach(btn => {
    btn.addEventListener('click', () => openInfoModal(btn.getAttribute('data-info')));
  });

  // wire logout (demo-only, non-destructive)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => showToast('Signed out (demo) — session unchanged.'));

  initTheme();
}

/* ---------- Generic modal system ---------- */
function ensureModalRoot() {
  let root = document.getElementById('modalRoot');
  if (!root) {
    root = document.createElement('div');
    root.id = 'modalRoot';
    document.body.appendChild(root);
  }
  return root;
}
function openModal(title, bodyHTML, onOpen) {
  const root = ensureModalRoot();
  root.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal-box" role="dialog" aria-modal="true" aria-label="${title}">
        <div class="modal-head"><h2>${title}</h2><button class="modal-close" id="modalCloseBtn" aria-label="Close">✕</button></div>
        <div class="modal-body">${bodyHTML}</div>
      </div>
    </div>
  `;
  const overlay = document.getElementById('modalOverlay');
  const close = () => { overlay.remove(); };
  document.getElementById('modalCloseBtn').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  if (onOpen) onOpen(overlay, close);
}
function openInfoModal(key) {
  const panel = INFO_PANELS[key];
  if (!panel) return;
  openModal(panel.title, panel.body);
}

/* ---------- Toasts ---------- */
function showToast(message) {
  let stack = document.getElementById('toastStack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    stack.id = 'toastStack';
    document.body.appendChild(stack);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity .25s ease';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}

/* ---------- New Rental modal (shared across pages) ---------- */
function openNewRentalModal(prefillSlug) {
  const options = FLEET.map(v => `<option value="${v.slug}" ${v.slug === prefillSlug ? 'selected' : ''}>${v.name} — ${money(v.dailyRate)}/day</option>`).join('');
  const body = `
    <p class="hint">Create a new rental agreement. This is a demo form — no data leaves your browser.</p>
    <form id="newRentalForm">
      <div class="field">
        <label for="nrVehicle">Vehicle</label>
        <select id="nrVehicle">${options}</select>
      </div>
      <div class="field">
        <label for="nrCustomer">Customer name</label>
        <input id="nrCustomer" type="text" placeholder="e.g. Daniel Cross" required>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="nrPhone">Phone</label>
          <input id="nrPhone" type="tel" placeholder="${STUDIO_CONTACT.phone}">
        </div>
        <div class="field">
          <label for="nrEmail">Email</label>
          <input id="nrEmail" type="email" placeholder="name@email.com">
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="nrStart">Start date</label>
          <input id="nrStart" type="date" required>
        </div>
        <div class="field">
          <label for="nrDuration">Duration (days)</label>
          <input id="nrDuration" type="number" min="1" value="7" required>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Confirm Rental</button>
    </form>
  `;
  openModal('New Rental', body, (overlay, close) => {
    const form = document.getElementById('newRentalForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const vehicle = getVehicle(document.getElementById('nrVehicle').value);
      const customer = document.getElementById('nrCustomer').value || 'New Customer';
      close();
      showToast(`Rental created for ${customer} — ${vehicle ? vehicle.name : 'vehicle'} (demo).`);
    });
  });
}

/* ---------- Back-to-portfolio link (matches sibling-project convention) ---------- */
function injectBackLink() {
  const style = document.createElement('style');
  style.textContent = `
    .fynix-back-link{position:fixed;bottom:18px;left:18px;z-index:9000;background:var(--bg-elevated,#14151a);color:var(--text,#fff);
      border:1px solid var(--border,rgba(255,255,255,.12));display:flex;align-items:center;gap:8px;padding:10px 14px;
      border-radius:100px;font-family:'Inter Tight',sans-serif;font-size:.78rem;font-weight:600;text-decoration:none;
      box-shadow:0 10px 24px rgba(0,0,0,.35);opacity:.9;transition:opacity .15s ease,transform .15s ease;}
    .fynix-back-link:hover{opacity:1;transform:translateY(-2px);}
    @media (max-width:900px){.fynix-back-link .fynix-back-label{display:none}.fynix-back-link{padding:10px;bottom:16px;left:16px;}}
  `;
  document.head.appendChild(style);
  const link = document.createElement('a');
  link.href = '../../index.html';
  link.className = 'fynix-back-link';
  link.setAttribute('aria-label', 'Back to Portfolio');
  link.innerHTML = '<span aria-hidden="true">←</span><span class="fynix-back-label">Back to Portfolio</span>';
  document.body.appendChild(link);
}

document.addEventListener('DOMContentLoaded', injectBackLink);
