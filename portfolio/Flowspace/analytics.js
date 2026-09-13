// ==========================================================================
// Flowspace — analytics.html behavior
// KPI strip, a dataset-switchable bar chart (hours vs revenue), a budget
// utilization list, an SVG line chart for team velocity, and per-project
// completion rates derived from the shared TASKS data.
// ==========================================================================

// kpiCardHTML now lives in app.js (shared with the dashboard's stat row).

function renderKPIs() {
  const grid = document.getElementById('kpiGrid');
  if (!grid) return;

  const totalHours = WEEKLY_HOURS.reduce((sum, d) => sum + d.hours, 0);
  const tasks = allTasks();
  const projectCount = allProjectNames().length;
  const avgCompletion = Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length);
  const lastWeek = VELOCITY_WEEKS[VELOCITY_WEEKS.length - 1].tasks;
  const prevWeek = VELOCITY_WEEKS[VELOCITY_WEEKS.length - 2].tasks;
  const velocityDeltaPct = Math.round(((lastWeek - prevWeek) / prevWeek) * 100);

  const cards = [
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
      iconColor: 'var(--accent-2)',
      label: 'Hours Logged This Week', value: `${totalHours}h`,
      deltaLabel: '+9% vs last week', deltaDir: 'up'
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
      iconColor: 'var(--info)',
      label: 'Active Projects', value: String(projectCount),
      deltaLabel: '+1 new this month', deltaDir: 'up'
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      iconColor: 'var(--success)',
      label: 'Avg. Task Completion', value: `${avgCompletion}%`,
      deltaLabel: '+6% vs last sprint', deltaDir: 'up'
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>',
      iconColor: 'var(--danger)',
      label: 'Team Velocity (Wk)', value: `${lastWeek} tasks`,
      deltaLabel: `${velocityDeltaPct >= 0 ? '+' : ''}${velocityDeltaPct}% vs prior week`, deltaDir: velocityDeltaPct >= 0 ? 'up' : 'down'
    }
  ];

  grid.innerHTML = cards.map(kpiCardHTML).join('');
}

// ---------- Bar chart (Hours <-> Revenue) ----------
let barMetric = 'hours';

function barChartData() {
  if (barMetric === 'revenue') {
    return { rows: MONTHLY_REVENUE.map((d) => ({ label: d.label, value: d.value })), prefix: '$', suffix: '', title: 'Monthly Revenue' };
  }
  return { rows: WEEKLY_HOURS.map((d) => ({ label: d.label, value: d.hours })), prefix: '', suffix: 'h', title: 'Hours Logged This Week' };
}

// Rounds a max value up to a "nice" number so axis ticks read cleanly (e.g. 39 -> 40).
function niceAxisMax(max) {
  if (!max) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
  const residual = max / magnitude;
  let niceResidual;
  if (residual > 5) niceResidual = 10;
  else if (residual > 2) niceResidual = 5;
  else if (residual > 1) niceResidual = 2;
  else niceResidual = 1;
  return niceResidual * magnitude;
}

function renderBarChartYAxis(axisMax, prefix, suffix) {
  const axisEl = document.getElementById('barChartYAxis');
  if (!axisEl) return;
  const steps = 4;
  const ticks = [];
  for (let i = steps; i >= 0; i--) {
    const v = (axisMax / steps) * i;
    ticks.push(prefix === '$' ? `$${Math.round(v / 1000)}k` : `${Math.round(v)}${suffix}`);
  }
  axisEl.innerHTML = ticks.map((label) => `<span>${label}</span>`).join('');
}

function renderBarChart() {
  const el = document.getElementById('barChart');
  const titleEl = document.getElementById('barChartTitle');
  if (!el) return;
  const { rows, prefix, suffix, title } = barChartData();
  if (titleEl) titleEl.textContent = title;
  const rawMax = Math.max(...rows.map((r) => r.value));
  const axisMax = niceAxisMax(rawMax);
  el.innerHTML = rows.map((r) => {
    const pct = Math.max((r.value / axisMax) * 100, 3);
    const displayValue = prefix === '$' ? `$${(r.value / 1000).toFixed(1)}k` : `${r.value}${suffix}`;
    return `
      <div class="bar-col" title="${r.label}: ${prefix}${r.value.toLocaleString()}${suffix}">
        <div class="bar-fill-wrap">
          <div class="bar-fill" style="height:${pct}%;">
            <span class="bar-value">${displayValue}</span>
          </div>
        </div>
        <span class="bar-label">${r.label}</span>
      </div>`;
  }).join('');
  renderBarChartYAxis(axisMax, prefix, suffix);
}

function initBarToggle() {
  document.querySelectorAll('.chart-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chart-toggle-btn').forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      barMetric = btn.dataset.metric;
      renderBarChart();
    });
  });
}

// ---------- Budget / spend ----------
function renderSpend() {
  const total = PROJECT_EXPENDITURE.reduce((sum, p) => sum + p.spent, 0);
  document.getElementById('spendTotal').textContent = `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('spendProjectCount').textContent = PROJECT_EXPENDITURE.length;

  const list = document.getElementById('expenditureList');
  list.innerHTML = PROJECT_EXPENDITURE.map((p) => {
    const pct = Math.min(Math.round((p.spent / p.budget) * 100), 100);
    return `
      <div class="expenditure-item">
        <div class="expenditure-top">
          <span class="expenditure-name">${p.project}</span>
          <span class="expenditure-amt">$${p.spent.toLocaleString(undefined, { maximumFractionDigits: 0 })} / $${p.budget.toLocaleString()}</span>
        </div>
        <div class="expenditure-track"><div class="expenditure-fill" style="width:${pct}%;"></div></div>
      </div>`;
  }).join('');
}

// ---------- Velocity line chart ----------
function renderVelocityChart() {
  const svg = document.getElementById('velocityChart');
  if (!svg) return;
  const W = 560, H = 220, padX = 16, padTop = 20, padBottom = 26;
  const values = VELOCITY_WEEKS.map((d) => d.tasks);
  const max = Math.max(...values);
  const min = 0;
  const usableW = W - padX * 2;
  const usableH = H - padTop - padBottom;
  const points = VELOCITY_WEEKS.map((d, i) => {
    const x = padX + (i / (VELOCITY_WEEKS.length - 1)) * usableW;
    const y = padTop + usableH - ((d.tasks - min) / (max - min)) * usableH;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${(H - padBottom).toFixed(1)} L${points[0].x.toFixed(1)},${(H - padBottom).toFixed(1)} Z`;

  const dots = points.map((p) => `
    <circle class="line-chart-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5">
      <title>${p.label}: ${p.tasks} tasks completed</title>
    </circle>`).join('');

  const labels = points.map((p) => `<text class="line-chart-label" x="${p.x.toFixed(1)}" y="${H - 6}" text-anchor="middle">${p.label}</text>`).join('');

  // Preserve <defs> (gradients) already declared in the HTML, replace everything after.
  const defs = svg.querySelector('defs').outerHTML;
  svg.innerHTML = `${defs}
    <path class="line-chart-area" d="${areaPath}"></path>
    <path class="line-chart-path" d="${linePath}"></path>
    ${dots}
    ${labels}`;
}

// ---------- Project completion rates (derived from TASKS) ----------
function renderCompletionRates() {
  const tasks = allTasks();
  const byProject = {};
  tasks.forEach((t) => {
    if (!byProject[t.project]) byProject[t.project] = [];
    byProject[t.project].push(t.progress);
  });
  const rows = Object.keys(byProject).sort().map((project) => {
    const values = byProject[project];
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    return { project, avg, count: values.length };
  }).sort((a, b) => b.avg - a.avg);

  const list = document.getElementById('completionList');
  list.innerHTML = rows.map((r) => `
    <div class="expenditure-item">
      <div class="expenditure-top">
        <span class="expenditure-name">${r.project}</span>
        <span class="expenditure-amt">${r.avg}% · ${r.count} task${r.count === 1 ? '' : 's'}</span>
      </div>
      <div class="expenditure-track"><div class="expenditure-fill" style="width:${r.avg}%; background: linear-gradient(90deg, var(--success), #59c793);"></div></div>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderKPIs();
  renderBarChart();
  initBarToggle();
  renderSpend();
  renderVelocityChart();
  renderCompletionRates();
});
