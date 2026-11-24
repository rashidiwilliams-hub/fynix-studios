// ==========================================================================
// Flowspace — documents.html behavior
// Type/project/search filtering over a shared DOCUMENTS + localStorage-backed
// custom docs list, a drag & drop dropzone (mirrors the dashboard widget),
// and a "New document" form for adding an entry without a real file.
// ==========================================================================

const DOC_TYPE_FILTERS = [
  { type: 'all', label: 'All' },
  { type: 'invoice', label: 'Invoices' },
  { type: 'receipt', label: 'Receipts' },
  { type: 'bill', label: 'Bills' },
  { type: 'design', label: 'Design' },
  { type: 'report', label: 'Reports' }
];

let docTypeFilterValue = 'all';
let docProjectFilterValue = 'all';
let docSearchQuery = '';

function docQuickBtnHTML(f) {
  const meta = f.type === 'all'
    ? { icon: ICONS.more, color: 'var(--ink-dim)' }
    : docTypeMeta(f.type);
  return `
    <button class="doc-quick-btn ${docTypeFilterValue === f.type ? 'active' : ''}" data-type="${f.type}">
      <span class="doc-quick-icon" style="color:${meta.color};">${meta.icon}</span>
      ${f.label}
    </button>`;
}

function renderQuickActions() {
  const wrap = document.getElementById('docQuickActions');
  wrap.innerHTML = DOC_TYPE_FILTERS.map(docQuickBtnHTML).join('');
  wrap.querySelectorAll('.doc-quick-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      docTypeFilterValue = btn.dataset.type;
      renderQuickActions();
      renderDocTable();
    });
  });
}

function populateProjectFilters() {
  const projects = allProjectNames();
  const filterSelect = document.getElementById('docProjectFilter');
  const formSelect = document.getElementById('docProjectInput');
  projects.forEach((p) => {
    const opt1 = document.createElement('option');
    opt1.value = p; opt1.textContent = p;
    filterSelect.appendChild(opt1);
    const opt2 = document.createElement('option');
    opt2.value = p; opt2.textContent = p;
    formSelect.appendChild(opt2);
  });
}

function filteredDocs() {
  const q = docSearchQuery.trim().toLowerCase();
  return allDocuments()
    .filter((d) => docTypeFilterValue === 'all' || d.type === docTypeFilterValue)
    .filter((d) => docProjectFilterValue === 'all' || d.project === docProjectFilterValue)
    .filter((d) => !q || d.name.toLowerCase().includes(q) || d.project.toLowerCase().includes(q))
    .sort((a, b) => b.date.localeCompare(a.date));
}

function docRowHTML(d) {
  const meta = docTypeMeta(d.type);
  const uploader = d.uploadedBy || 'Unknown';
  return `
    <tr data-id="${d.id}">
      <td>
        <div class="doc-name-cell">
          <span class="doc-type-icon" style="color:${meta.color};">${meta.icon}</span>
          ${d.name}
        </div>
      </td>
      <td><span class="doc-tag has-pc" style="${pcStyle(d.project)}">${d.project}</span></td>
      <td>
        <div class="doc-uploader-name">
          <span class="doc-uploader-initials">${initialsFromName(uploader)}</span>
          ${uploader}
        </div>
      </td>
      <td>${formatDate(d.date)}</td>
      <td>${d.size}</td>
      <td style="text-align:right;">
        <button class="menu-btn" data-demo-toast="Download / Rename / Delete — demo only" aria-label="Document options">${ICONS.dots}</button>
      </td>
    </tr>`;
}

function renderStorageCard() {
  const docs = allDocuments();
  // Fabricated-but-plausible storage total derived from the visible file sizes.
  const usedGB = Math.min(2.4 + docs.length * 0.85, 48);
  document.getElementById('storageValue').textContent = `${usedGB.toFixed(1)} GB of 50 GB used`;
  document.getElementById('storageFill').style.width = `${Math.min((usedGB / 50) * 100, 100)}%`;
}

function renderDocTable() {
  const tbody = document.getElementById('docTableBody');
  const countEl = document.getElementById('docCount');
  const items = filteredDocs();
  countEl.textContent = `${items.length} file${items.length === 1 ? '' : 's'}`;
  if (!items.length) {
    tbody.innerHTML = `<tr class="doc-empty-row"><td colspan="6">No documents match your filters.</td></tr>`;
    return;
  }
  tbody.innerHTML = items.map(docRowHTML).join('');
  renderStorageCard();
}

// ---------- Drag & drop upload (mirrors dashboard widget, shared helpers in app.js) ----------
function initDocUpload() {
  const widget = document.getElementById('docUploadWidget');
  const input = document.getElementById('docUploadInput');
  const uploadBtn = document.getElementById('docUploadBtn');
  const browseLink = document.getElementById('docBrowseFilesLink');
  if (!widget || !input) return;

  const open = (e) => { e.preventDefault(); input.click(); };
  uploadBtn.addEventListener('click', open);
  browseLink.addEventListener('click', open);
  input.addEventListener('change', () => {
    if (input.files.length) { addFakeUpload(input.files); renderDocTable(); }
    input.value = '';
  });

  ['dragenter', 'dragover'].forEach((evt) => {
    widget.addEventListener(evt, (e) => { e.preventDefault(); widget.classList.add('is-dragover'); });
  });
  ['dragleave', 'drop'].forEach((evt) => {
    widget.addEventListener(evt, (e) => { e.preventDefault(); widget.classList.remove('is-dragover'); });
  });
  widget.addEventListener('drop', (e) => {
    if (e.dataTransfer?.files?.length) { addFakeUpload(e.dataTransfer.files); renderDocTable(); }
  });
}

// ---------- New document modal ----------
function initNewDocModal() {
  const modal = document.getElementById('newDocModal');
  const form = document.getElementById('newDocForm');
  const openers = [document.getElementById('newDocBtn')].filter(Boolean);
  const closers = [document.getElementById('closeNewDocModal'), document.getElementById('cancelNewDoc')].filter(Boolean);

  const open = () => { modal.classList.remove('hidden'); document.getElementById('docNameInput').focus(); };
  const close = () => { modal.classList.add('hidden'); form.reset(); };

  openers.forEach((btn) => btn.addEventListener('click', open));
  closers.forEach((btn) => btn.addEventListener('click', close));
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('docNameInput').value.trim();
    if (!name) return;
    const type = document.getElementById('docTypeInput').value;
    const project = document.getElementById('docProjectInput').value;

    pushCustomDoc({
      id: 'custom-doc-' + Date.now(),
      name,
      type,
      project,
      uploadedBy: getProfile().name,
      date: new Date().toISOString().slice(0, 10),
      size: humanFileSize(0)
    });

    renderDocTable();
    close();
    showToast(`“${name}” added to Documents`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderQuickActions();
  populateProjectFilters();
  renderDocTable();
  initDocUpload();
  initNewDocModal();

  document.getElementById('docSearch')?.addEventListener('input', (e) => {
    docSearchQuery = e.target.value;
    renderDocTable();
  });
  document.getElementById('docProjectFilter')?.addEventListener('change', (e) => {
    docProjectFilterValue = e.target.value;
    renderDocTable();
  });
});
