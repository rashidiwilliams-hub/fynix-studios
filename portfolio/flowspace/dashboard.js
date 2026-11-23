// ==========================================================================
// Flowspace — index.html (Dashboard) behavior
// Tabs, add-task modal, calendar strip + events, circular time tracker,
// mini project queue, and a (visual) drag-and-drop upload shortcut.
// ==========================================================================

// CUSTOM_TASKS_KEY / loadCustomTasks / saveCustomTasks / allTasks now live in app.js
// (shared with teams.html, which looks up a member's tasks including custom ones).

let activeWhen = 'today';

// ---------- Dashboard stats row (uses the shared kpiCardHTML from app.js) ----------
function renderDashStats() {
  const grid = document.getElementById('dashStatsGrid');
  if (!grid) return;
  const tasksToday = allTasks().filter((t) => t.when === 'today').length;
  const totalTasks = allTasks().length;
  const hoursWeek = WEEKLY_HOURS.reduce((sum, d) => sum + d.hours, 0);
  const activeProjects = allProjectNames().length;
  const teamOnline = TEAM.filter((m) => m.status === 'Active').length;

  const cards = [
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
      iconColor: 'var(--accent-2)', label: 'Tasks Today', value: String(tasksToday),
      sub: `${totalTasks} total across all projects`
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
      iconColor: 'var(--info)', label: 'Hours This Week', value: `${hoursWeek}h`,
      sub: 'Across the whole studio'
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
      iconColor: 'var(--accent-2)', label: 'Active Projects', value: String(activeProjects),
      sub: 'Currently in progress'
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="8.5" r="2.6"/><path d="M16 14.3c2.8.4 4.7 2.4 4.7 5.2"/></svg>',
      iconColor: 'var(--success)', label: 'Team Online', value: `${teamOnline}/${TEAM.length}`,
      sub: 'Active right now'
    }
  ];
  grid.innerHTML = cards.map(kpiCardHTML).join('');
}

// ---------- Recent activity feed (rail) ----------
function activityItemHTML(a) {
  const member = teamMemberById(a.member);
  const name = member ? member.name : 'Someone';
  return `
    <div class="activity-item">
      <span class="activity-avatar">${member ? `<img src="${member.avatar}" alt="${name}">` : '?'}</span>
      <div>
        <div class="activity-text"><strong>${name}</strong> ${a.verb} <span class="activity-target">${a.target}</span></div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>`;
}
function renderActivityFeed() {
  const list = document.getElementById('activityList');
  if (!list) return;
  list.innerHTML = ACTIVITY_FEED.map(activityItemHTML).join('');
}

// ---------- Time tracker "what am I tracking" label ----------
function renderTimerTask() {
  const el = document.getElementById('timerTaskLabel');
  if (!el) return;
  const task = allTasks().find((t) => t.when === 'today');
  el.innerHTML = task ? `Tracking <strong>${task.title}</strong> — ${task.project}` : 'No task selected';
}

function renderTaskCount() {
  const n = allTasks().filter((t) => t.when === 'today').length;
  const el = document.getElementById('taskCountHeadline');
  if (el) el.innerHTML = `You've got <span class="accent">${n}</span> task${n === 1 ? '' : 's'} for today`;
}

function taskCardHTML(task, darken) {
  return `
    <article class="task-card ${darken ? 'is-dark' : ''}" data-id="${task.id}">
      <div class="task-top">
        <div>
          <span class="task-project">${task.project}</span>
          <h3 class="task-title">${task.title}</h3>
          <p class="task-desc">${task.description}</p>
        </div>
        <button class="menu-btn" data-demo-toast="Edit / duplicate / delete — demo only" aria-label="Task options">${ICONS.dots}</button>
      </div>
      <div class="task-bottom">
        ${avatarStackHTML(task.team, 30)}
        <div class="task-progress">
          <div class="progress-track"><div class="progress-fill" style="width:${task.progress}%"></div></div>
          <span class="progress-pct">${task.progress}%</span>
        </div>
      </div>
    </article>`;
}

function renderTaskList() {
  const list = document.getElementById('taskList');
  if (!list) return;
  const items = allTasks().filter((t) => t.when === activeWhen);
  if (!items.length) {
    list.innerHTML = `<div class="task-empty">No tasks in “${activeWhen.replace('-', ' ')}” yet. Click “+ Add Task” to create one.</div>`;
    return;
  }
  list.innerHTML = items.map((t, i) => taskCardHTML(t, i === 1)).join('');
  list.querySelectorAll('.menu-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(btn.dataset.demoToast);
    });
  });
}

function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeWhen = btn.dataset.when;
      renderTaskList();
    });
  });
}

// ---------- Add Task modal ----------
function initAddTaskModal() {
  const modal = document.getElementById('addTaskModal');
  const form = document.getElementById('addTaskForm');
  if (!modal || !form) return;
  const openers = [document.getElementById('addTaskBtnRail')].filter(Boolean);
  const closers = [document.getElementById('closeAddTaskModal'), document.getElementById('cancelAddTask')].filter(Boolean);

  const open = () => { modal.classList.remove('hidden'); document.getElementById('taskTitle').focus(); };
  const close = () => { modal.classList.add('hidden'); form.reset(); };

  openers.forEach((btn) => btn.addEventListener('click', open));
  closers.forEach((btn) => btn.addEventListener('click', close));
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const project = document.getElementById('taskProject').value;
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDesc').value.trim() || 'No additional details added.';
    if (!title) return;

    const custom = loadCustomTasks();
    const newTask = {
      id: 'custom-' + Date.now(),
      project,
      title,
      description,
      team: [teamMemberById && TEAM[Math.floor(Math.random() * TEAM.length)].id],
      progress: 0,
      when: 'today'
    };
    custom.push(newTask);
    saveCustomTasks(custom);

    // Switch to the Today tab so the new card is immediately visible
    document.querySelectorAll('.tab-btn').forEach((b) => {
      const isToday = b.dataset.when === 'today';
      b.classList.toggle('active', isToday);
      b.setAttribute('aria-selected', String(isToday));
    });
    activeWhen = 'today';

    renderTaskList();
    renderTaskCount();
    close();
    showToast(`“${title}” added to Today`);
  });
}

// ---------- Calendar strip + events ----------
let selectedOffset = 0;
const CAL_RANGE = [-3, -2, -1, 0, 1, 2, 3];

function dateForOffset(offset) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

function renderCalendarStrip() {
  const strip = document.getElementById('calendarStrip');
  if (!strip) return;
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  strip.innerHTML = CAL_RANGE.map((offset) => {
    const d = dateForOffset(offset);
    const hasEvents = EVENTS.some((e) => e.dayOffset === offset);
    const classes = ['calendar-day'];
    if (offset === 0) classes.push('is-today');
    if (offset === selectedOffset) classes.push('is-selected');
    if (hasEvents) classes.push('has-events');
    return `<button class="${classes.join(' ')}" data-offset="${offset}">
      <span class="dow">${dow[d.getDay()]}</span>
      <span class="dnum">${d.getDate()}</span>
    </button>`;
  }).join('');

  strip.querySelectorAll('.calendar-day').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedOffset = parseInt(btn.dataset.offset, 10);
      renderCalendarStrip();
      renderEventList();
      renderCalendarHeader();
    });
  });
}

function renderCalendarHeader() {
  const monthLabel = document.getElementById('calendarMonthLabel');
  const selectedLabel = document.getElementById('calendarSelectedLabel');
  if (!monthLabel || !selectedLabel) return;
  const d = dateForOffset(selectedOffset);
  monthLabel.textContent = d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  if (selectedOffset === 0) selectedLabel.textContent = 'Today';
  else if (selectedOffset === 1) selectedLabel.textContent = 'Tomorrow';
  else if (selectedOffset === -1) selectedLabel.textContent = 'Yesterday';
  else selectedLabel.textContent = d.toLocaleDateString(undefined, { weekday: 'long' });
}

function eventCardHTML(evt, isFirst) {
  return `
    <article class="event-card ${isFirst ? 'is-accent' : ''}" data-id="${evt.id}">
      <div class="event-top">
        <span class="event-title">${evt.title}</span>
        <span class="event-time">${evt.time}</span>
      </div>
      <p class="event-desc">${evt.description}</p>
      <div class="event-bottom">
        ${avatarStackHTML(evt.team, 28)}
        <button class="event-check ${evt.completed ? 'is-done' : ''}" data-id="${evt.id}" aria-label="Toggle complete">${ICONS.check}</button>
      </div>
    </article>`;
}

function renderEventList() {
  const list = document.getElementById('eventList');
  if (!list) return;
  const items = EVENTS.filter((e) => e.dayOffset === selectedOffset);
  if (!items.length) {
    list.innerHTML = `<div class="event-empty">No events scheduled for this day.</div>`;
    return;
  }
  list.innerHTML = items.map((e, i) => eventCardHTML(e, i === 0)).join('');
  list.querySelectorAll('.event-check').forEach((btn) => {
    btn.addEventListener('click', () => {
      const evt = EVENTS.find((e) => e.id === btn.dataset.id);
      if (!evt) return;
      evt.completed = !evt.completed;
      renderEventList();
      showToast(evt.completed ? 'Marked as complete' : 'Marked as incomplete');
    });
  });
}

// ---------- Circular time tracker ----------
const TIMER_TOTAL_SECONDS = 8 * 3600; // dial represents an 8-hour workday
let timerSeconds = 0;
let timerInterval = null;
let timerRunning = false;

function formatHMS(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

function updateTimerDisplay() {
  const readout = document.getElementById('timerReadout');
  const dial = document.getElementById('timerDialFg');
  const stateLabel = document.getElementById('timerStateLabel');
  if (readout) readout.textContent = formatHMS(timerSeconds);
  if (dial) {
    const circumference = 276.5; // 2 * PI * 44
    const pct = Math.min(timerSeconds / TIMER_TOTAL_SECONDS, 1);
    dial.style.strokeDashoffset = String(circumference * (1 - pct));
  }
  if (stateLabel) stateLabel.textContent = timerRunning ? 'Tracking' : (timerSeconds > 0 ? 'Paused' : 'Ready');

  const teaserSub = document.getElementById('trackerTeaserSub');
  if (teaserSub) teaserSub.textContent = timerRunning ? `Tracking — ${formatHMS(timerSeconds)}` : (timerSeconds > 0 ? `Paused at ${formatHMS(timerSeconds)}` : 'Commence Time Tracking');
}

function setPlayPauseIcon(running) {
  const icon = document.getElementById('timerPlayPauseIcon');
  const btn = document.getElementById('timerPlayPauseBtn');
  const teaserIcon = document.getElementById('trackerTeaserIcon');
  if (icon) icon.outerHTML = running
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" id="timerPlayPauseIcon"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" id="timerPlayPauseIcon"><path d="M8 5v14l11-7z"/></svg>';
  if (btn) btn.setAttribute('aria-label', running ? 'Pause timer' : 'Start timer');
  if (teaserIcon) teaserIcon.outerHTML = running
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" id="trackerTeaserIcon"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" id="trackerTeaserIcon"><path d="M8 5v14l11-7z"/></svg>';
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  setPlayPauseIcon(true);
  timerInterval = setInterval(() => {
    timerSeconds += 1;
    updateTimerDisplay();
  }, 1000);
  updateTimerDisplay();
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  setPlayPauseIcon(false);
  updateTimerDisplay();
}

function stopTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  timerSeconds = 0;
  setPlayPauseIcon(false);
  updateTimerDisplay();
}

function initTimer() {
  updateTimerDisplay();
  const playPauseBtn = document.getElementById('timerPlayPauseBtn');
  const stopBtn = document.getElementById('timerStopBtn');
  const teaserBtn = document.getElementById('trackerTeaserBtn');

  playPauseBtn?.addEventListener('click', () => (timerRunning ? pauseTimer() : startTimer()));
  stopBtn?.addEventListener('click', () => { stopTimer(); showToast('Timer reset'); });
  teaserBtn?.addEventListener('click', () => {
    if (!timerRunning) startTimer();
    document.querySelector('.timer-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ---------- New Project mini queue ----------
function queueItemHTML(task, status, dark) {
  const member = teamMemberById(task.team[0]);
  return `
    <div class="queue-item ${dark ? 'is-dark' : ''}">
      <span class="queue-status">${status}</span>
      <div class="queue-item-row">
        <span class="queue-avatar">${member ? `<img src="${member.avatar}" alt="${member.name}">` : '?'}</span>
        <div>
          <div class="queue-item-title">${task.project}</div>
          <div class="queue-item-sub">${task.title}</div>
        </div>
      </div>
      <div class="queue-item-progress">
        <div class="progress-track"><div class="progress-fill" style="width:${task.progress}%"></div></div>
      </div>
    </div>`;
}

function renderQueue() {
  const list = document.getElementById('queueList');
  if (!list) return;
  const upcoming = TASKS.find((t) => t.when === 'upcoming');
  const ongoing = TASKS.find((t) => t.when === 'this-week');
  const parts = [];
  if (upcoming) parts.push(queueItemHTML(upcoming, 'Upcoming', false));
  if (ongoing) parts.push(queueItemHTML(ongoing, 'Ongoing', true));
  list.innerHTML = parts.join('') || '<p style="font-size:12.5px;color:var(--ink-faint);">No projects queued.</p>';
}

// ---------- Upload widget (visual drag/drop shortcut, feeds documents.html) ----------
// loadCustomDocs / saveCustomDocs / guessDocType / humanFileSize / addFakeUpload
// now live in app.js (shared with documents.html's own upload dropzone).
function initUploadWidget() {
  const widget = document.getElementById('uploadWidget');
  const input = document.getElementById('uploadInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const browseLink = document.getElementById('browseFilesLink');
  if (!widget || !input) return;

  const open = (e) => { e.preventDefault(); input.click(); };
  uploadBtn.addEventListener('click', open);
  browseLink.addEventListener('click', open);
  input.addEventListener('change', () => { if (input.files.length) addFakeUpload(input.files); input.value = ''; });

  ['dragenter', 'dragover'].forEach((evt) => {
    widget.addEventListener(evt, (e) => { e.preventDefault(); widget.classList.add('is-dragover'); });
  });
  ['dragleave', 'drop'].forEach((evt) => {
    widget.addEventListener(evt, (e) => { e.preventDefault(); widget.classList.remove('is-dragover'); });
  });
  widget.addEventListener('drop', (e) => {
    if (e.dataTransfer?.files?.length) addFakeUpload(e.dataTransfer.files);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderDashStats();
  renderTaskCount();
  renderTaskList();
  initTabs();
  initAddTaskModal();

  renderCalendarStrip();
  renderCalendarHeader();
  renderEventList();
  renderActivityFeed();

  renderTimerTask();
  initTimer();
  renderQueue();
  initUploadWidget();
});
