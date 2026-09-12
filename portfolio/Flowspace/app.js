// ==========================================================================
// Flowspace — shared app shell behavior (theme, mobile nav, toast, avatars)
// Loaded on every page, after data.js.
// ==========================================================================

const THEME_KEY = 'flowspace_theme';
const PROFILE_KEY = 'flowspace_profile';
const CUSTOM_TASKS_KEY = 'flowspace_custom_tasks';
const CUSTOM_DOCS_KEY = 'flowspace_custom_docs';
const NOTIFICATIONS_KEY = 'flowspace_notifications';

// ---------- Profile (shared across sidebar, topbar, greeting, settings.html) ----------
function getProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (stored && stored.name) return stored;
  } catch (e) { /* ignore malformed storage */ }
  return { name: CURRENT_USER.name, role: CURRENT_USER.role, email: CURRENT_USER.email, bio: '' };
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function initialsFromName(name) {
  return (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '?';
}

// Fills in every element carrying a .js-profile-* class, on every page, so a
// change saved on settings.html is reflected everywhere without a full reload.
function applyProfileToShell() {
  const profile = getProfile();
  const initials = initialsFromName(profile.name);
  const firstName = (profile.name || '').split(' ')[0] || profile.name;
  document.querySelectorAll('.js-profile-name').forEach((el) => { el.textContent = profile.name; });
  document.querySelectorAll('.js-profile-firstname').forEach((el) => { el.textContent = firstName; });
  document.querySelectorAll('.js-profile-role').forEach((el) => { el.textContent = profile.role; });
  document.querySelectorAll('.js-profile-email').forEach((el) => { el.textContent = profile.email; });
  document.querySelectorAll('.js-profile-initials').forEach((el) => { el.textContent = initials; });
}

// ---------- Tasks (shared: dashboard tabs + teams.html member task lookups) ----------
function loadCustomTasks() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_TASKS_KEY) || '[]'); }
  catch (e) { return []; }
}
function saveCustomTasks(list) {
  localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(list));
}
function allTasks() {
  return TASKS.concat(loadCustomTasks());
}

// ---------- Documents (shared: dashboard upload widget + documents.html) ----------
function loadCustomDocs() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_DOCS_KEY) || '[]'); }
  catch (e) { return []; }
}
function saveCustomDocs(list) {
  localStorage.setItem(CUSTOM_DOCS_KEY, JSON.stringify(list));
}
function allDocuments() {
  return DOCUMENTS.concat(loadCustomDocs());
}
function pushCustomDoc(doc) {
  const custom = loadCustomDocs();
  custom.push(doc);
  saveCustomDocs(custom);
}
function guessDocType(name) {
  const n = name.toLowerCase();
  if (n.includes('invoice')) return 'invoice';
  if (n.includes('receipt')) return 'receipt';
  if (n.includes('contract') || n.includes('bill') || n.includes('agreement')) return 'bill';
  if (/\.(fig|sketch|psd|ai|png|jpg|jpeg)$/.test(n)) return 'design';
  return 'report';
}
function humanFileSize(bytes) {
  if (!bytes) return `${(Math.random() * 4 + 0.2).toFixed(1)} MB`;
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0; let val = bytes;
  while (val >= 1024 && i < units.length - 1) { val /= 1024; i++; }
  return `${val.toFixed(val < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
function addFakeUpload(fileList) {
  const names = [];
  Array.from(fileList).slice(0, 5).forEach((file) => {
    names.push(file.name);
    pushCustomDoc({
      id: 'custom-doc-' + Date.now() + Math.random().toString(16).slice(2),
      name: file.name,
      type: guessDocType(file.name),
      project: 'Studio Ops',
      uploadedBy: getProfile().name,
      date: new Date().toISOString().slice(0, 10),
      size: humanFileSize(file.size)
    });
  });
  showToast(names.length > 1 ? `${names.length} files added to Documents` : `“${names[0]}” added to Documents`);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-opt').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  const toggle = document.getElementById('quickThemeToggle');
  if (toggle) toggle.checked = theme === 'dark';
}

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

function initTheme() {
  applyTheme(getStoredTheme());
  document.querySelectorAll('.theme-opt').forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
  });
  const quickToggle = document.getElementById('quickThemeToggle');
  if (quickToggle) {
    quickToggle.addEventListener('change', () => setTheme(quickToggle.checked ? 'dark' : 'light'));
  }
}

// Apply theme immediately (before DOMContentLoaded) to avoid a flash of the wrong theme
applyThemeEarly();
function applyThemeEarly() {
  document.documentElement.setAttribute('data-theme', getStoredTheme());
}

// ---------- Mobile sidebar ----------
function initMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar || !toggle || !backdrop) return;
  const open = () => { sidebar.classList.add('is-open'); backdrop.classList.add('is-open'); };
  const close = () => { sidebar.classList.remove('is-open'); backdrop.classList.remove('is-open'); };
  toggle.addEventListener('click', open);
  backdrop.addEventListener('click', close);
  sidebar.querySelectorAll('.nav-item').forEach((a) => a.addEventListener('click', close));
}

// ---------- Toast ----------
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
  }, 2400);
}

// ---------- Avatar helpers ----------
function avatarHTML(memberId, size) {
  const m = teamMemberById(memberId);
  if (!m) return `<span class="avatar" style="width:${size || 30}px;height:${size || 30}px;">?</span>`;
  return `<span class="avatar" title="${m.name}" style="${size ? `width:${size}px;height:${size}px;` : ''}"><img src="${m.avatar}" alt="${m.name}" loading="lazy"></span>`;
}

function avatarStackHTML(memberIds, size) {
  return `<div class="avatar-stack">${memberIds.map((id) => avatarHTML(id, size)).join('')}</div>`;
}

// ---------- Icons (inline SVG, stroke-based, 1.8 weight) ----------
const ICONS = {
  bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  dots: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  play: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  stop: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  upload: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
  file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
  invoice: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10a1 1 0 0 1 1 1v17l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 0 1 1-1Z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  receipt: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5Z"/><path d="M9 8h6M9 12h6"/></svg>',
  bill: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/></svg>',
  design: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  report: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13l2 2 4-4"/></svg>',
  more: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>'
};

function docTypeMeta(type) {
  const map = {
    invoice: { icon: ICONS.invoice, color: 'var(--accent-2)', bg: 'var(--accent-soft)', label: 'Invoice' },
    receipt: { icon: ICONS.receipt, color: 'var(--info)', bg: 'var(--info-soft)', label: 'Receipt' },
    bill: { icon: ICONS.bill, color: 'var(--danger)', bg: 'var(--danger-soft)', label: 'Bill' },
    design: { icon: ICONS.design, color: 'var(--success)', bg: 'var(--success-soft)', label: 'Design' },
    report: { icon: ICONS.report, color: 'var(--ink-dim)', bg: 'var(--surface-2)', label: 'Report' }
  };
  return map[type] || map.report;
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// ---------- Boot ----------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileSidebar();
  applyProfileToShell();

  // Generic "demo only" wiring for icon buttons that have no real backend
  document.querySelectorAll('[data-demo-toast]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(el.dataset.demoToast || 'Demo only — not wired up');
    });
  });
});
