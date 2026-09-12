// ==========================================================================
// Flowspace — teams.html behavior
// Searchable / filterable member directory + a per-member modal listing
// their assigned tasks (pulled from the same TASKS data as the dashboard).
// ==========================================================================

let teamSearchQuery = '';
let teamStatusFilter = 'all';
let teamProjectFilterValue = 'all';

function tasksForMember(id) {
  return allTasks().filter((t) => t.team.includes(id));
}

function populateProjectFilter() {
  const select = document.getElementById('teamProjectFilter');
  if (!select) return;
  allProjectNames().forEach((project) => {
    const opt = document.createElement('option');
    opt.value = project;
    opt.textContent = project;
    select.appendChild(opt);
  });
}

function filteredTeam() {
  const q = teamSearchQuery.trim().toLowerCase();
  return TEAM.filter((m) => {
    if (teamStatusFilter !== 'all' && m.status.toLowerCase() !== teamStatusFilter) return false;
    if (teamProjectFilterValue !== 'all' && m.project !== teamProjectFilterValue) return false;
    if (!q) return true;
    return m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.project.toLowerCase().includes(q);
  });
}

function teamCardHTML(m) {
  const taskCount = tasksForMember(m.id).length;
  return `
    <article class="card team-card" data-id="${m.id}" tabindex="0" role="button" aria-label="View ${m.name}'s workload">
      <span class="team-avatar"><img src="${m.avatar}" alt="${m.name}" loading="lazy"></span>
      <div class="team-name">${m.name}</div>
      <div class="team-role">${m.role}</div>
      <span class="team-project-tag">${m.project}</span>
      <div class="team-stats">
        <div>
          <div class="team-stat-value">${m.hours}h</div>
          <div class="team-stat-label">This Week</div>
        </div>
        <div>
          <div class="team-stat-value">${taskCount}</div>
          <div class="team-stat-label">Tasks</div>
        </div>
      </div>
      <span class="team-status ${m.status.toLowerCase()}" style="margin-top: 14px;">${m.status}</span>
    </article>`;
}

function renderTeamGrid() {
  const grid = document.getElementById('teamGrid');
  const countEl = document.getElementById('teamCount');
  if (!grid) return;
  const items = filteredTeam();
  if (countEl) countEl.textContent = `${items.length} member${items.length === 1 ? '' : 's'}`;
  if (!items.length) {
    grid.innerHTML = `<div class="team-empty">No team members match your filters.</div>`;
    return;
  }
  grid.innerHTML = items.map(teamCardHTML).join('');
  grid.querySelectorAll('.team-card').forEach((card) => {
    card.addEventListener('click', () => openMemberModal(card.dataset.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMemberModal(card.dataset.id); }
    });
  });
}

function memberTaskRowHTML(t) {
  return `
    <div class="member-task-row">
      <div>
        <div class="member-task-title">${t.title}</div>
        <div class="member-task-project">${t.project}</div>
      </div>
      <div class="task-progress">
        <div class="progress-track"><div class="progress-fill" style="width:${t.progress}%"></div></div>
        <span class="progress-pct">${t.progress}%</span>
      </div>
    </div>`;
}

function openMemberModal(id) {
  const m = teamMemberById(id);
  if (!m) return;
  const modal = document.getElementById('memberModal');

  document.getElementById('memberModalAvatar').src = m.avatar;
  document.getElementById('memberModalAvatar').alt = m.name;
  document.getElementById('memberModalName').textContent = m.name;
  document.getElementById('memberModalRole').textContent = m.role;
  document.getElementById('memberModalProject').textContent = m.project;

  const statusEl = document.getElementById('memberModalStatus');
  statusEl.textContent = m.status;
  statusEl.className = `team-status ${m.status.toLowerCase()}`;

  const workloadPct = Math.min(Math.round((m.hours / 40) * 100), 100);
  document.getElementById('memberModalWorkloadFill').style.width = `${workloadPct}%`;
  document.getElementById('memberModalWorkloadLabel').textContent = `${m.hours}h / 40h (${workloadPct}%)`;

  const emailLink = document.getElementById('memberModalEmailLink');
  emailLink.dataset.demoToast = `Composing email to ${m.email} — demo only`;

  const tasks = tasksForMember(id);
  const list = document.getElementById('memberModalTasks');
  list.innerHTML = tasks.length
    ? tasks.map(memberTaskRowHTML).join('')
    : '<p style="font-size:13px;color:var(--ink-faint);padding:6px 2px;">No tasks currently assigned.</p>';

  modal.classList.remove('hidden');
}

function initMemberModal() {
  const modal = document.getElementById('memberModal');
  const closers = [document.getElementById('closeMemberModal'), document.getElementById('closeMemberModalBtn')].filter(Boolean);
  const close = () => modal.classList.add('hidden');
  closers.forEach((btn) => btn.addEventListener('click', close));
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });
}

function initFilters() {
  const searchInput = document.getElementById('teamSearch');
  const projectSelect = document.getElementById('teamProjectFilter');
  const statusButtons = document.querySelectorAll('.status-filter-btn');

  searchInput?.addEventListener('input', () => {
    teamSearchQuery = searchInput.value;
    renderTeamGrid();
  });

  projectSelect?.addEventListener('change', () => {
    teamProjectFilterValue = projectSelect.value;
    renderTeamGrid();
  });

  statusButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      statusButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      teamStatusFilter = btn.dataset.status;
      renderTeamGrid();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateProjectFilter();
  renderTeamGrid();
  initFilters();
  initMemberModal();
});
