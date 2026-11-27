/* Fynix demo toolbar: marks a page as an interactive demonstration, explains what is simulated,
   links back to Fynix and offers a quote. */
(function () {
  if (document.getElementById('fx-demo-bar')) return;
  var INFO = {
    'nomad': { name: 'Nomad', kind: 'Fashion e-commerce concept', text: 'Products, prices, checkout and customer accounts are simulated. This is not a real store.' },
    'nomad-skincare': { name: 'Nomad Skincare', kind: 'Skincare store concept', text: 'Product claims, offers and press mentions are sample content.' },
    'feastly': { name: 'Feastly', kind: 'Food ordering concept', text: 'This is a demonstration. Restaurants, menus, orders and payments are simulated, and no real orders are placed.' },
    'flowspace': { name: 'Flowspace', kind: 'Team productivity dashboard concept', text: 'Projects, tasks and team activity in one workspace. Businesses could adapt this for project tracking, internal task management or team reporting. All data shown is sample data.', modal: true },
    'relentless-fitness': { name: 'Relentless Fitness', kind: 'Fitness studio website concept', text: 'Testimonials, membership statistics and business details are sample content.' },
    'guyana-bites': { name: 'Guyana Bites', kind: 'Editorial website concept', text: 'A food, tourism and lifestyle publication. Articles and details are sample content.' },
    'lux-rentals': { name: 'Lux Rentals', kind: 'Fleet management dashboard concept', text: 'Manage vehicles, rentals, customers, maintenance, damage reports and finances in one place. All vehicles, customers and figures are sample data.', modal: true },
    'regent': { name: 'Regent', kind: 'Marketplace concept', text: 'Buying, selling, listings and payments are simulated. No real transactions take place.' }
  };
  var m = location.pathname.match(/\/portfolio\/([^\/]+)\//);
  var key = m ? m[1] : '';
  var info = INFO[key] || { name: 'this demo', kind: 'Demonstration site', text: 'Products, figures, testimonials, accounts and checkout are simulated.' };
  var back = '../../index.html#portfolio';
  var wa = 'https://wa.me/5927135786?text=' + encodeURIComponent("Hi Fynix Studios, I saw the " + info.name + " demo and I'd like something like it for my business.");
  var seenKey = 'fxd-seen-' + key;
  var seen = false;
  try { seen = sessionStorage.getItem(seenKey) === '1'; } catch (e) {}

  var css = '#fx-demo-bar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:6px;padding:6px 6px 6px 16px;max-width:calc(100vw - 20px);background:rgba(12,12,12,.94);color:#f3f1ec;border:1px solid rgba(255,255,255,.18);border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.4);font:600 13px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}' +
    '#fx-demo-bar *{box-sizing:border-box}' +
    '#fx-demo-bar .fxd-label{display:flex;align-items:center;gap:8px;white-space:nowrap;padding-right:8px}' +
    '#fx-demo-bar .fxd-dot{width:8px;height:8px;border-radius:50%;background:#ff5a26;flex:none}' +
    '#fx-demo-bar a,#fx-demo-bar button{font:inherit;color:inherit;text-decoration:none;cursor:pointer;border:0;background:transparent;border-radius:999px;padding:9px 12px;white-space:nowrap}' +
    '#fx-demo-bar a:hover,#fx-demo-bar button:hover{background:rgba(255,255,255,.1)}' +
    '#fx-demo-bar .fxd-cta{background:#ff5a26;color:#fff;padding:9px 14px}' +
    '#fx-demo-bar .fxd-cta:hover{background:#e64f1c}' +
    '#fx-demo-bar a:focus-visible,#fx-demo-bar button:focus-visible,#fx-demo-note a:focus-visible,#fx-demo-note button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '#fx-demo-note{position:fixed;left:50%;bottom:68px;transform:translateX(-50%);z-index:2147483000;width:min(400px,calc(100vw - 20px));padding:18px 20px;background:rgba(12,12,12,.97);color:#f3f1ec;border:1px solid rgba(255,255,255,.2);border-radius:18px;box-shadow:0 14px 40px rgba(0,0,0,.45);font:400 14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '#fx-demo-note[hidden]{display:none}' +
    '#fx-demo-note .fxd-kind{display:block;margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ff7a45}' +
    '#fx-demo-note p{margin:0 0 10px}' +
    '#fx-demo-note .fxd-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}' +
    '#fx-demo-note a,#fx-demo-note button{display:inline-block;padding:9px 16px;border-radius:999px;font:700 14px/1.2 system-ui,sans-serif;text-decoration:none;cursor:pointer;border:1px solid rgba(255,255,255,.3);background:transparent;color:#f3f1ec}' +
    '#fx-demo-note .fxd-primary{background:#ff5a26;border-color:#ff5a26;color:#fff}' +
    '#fx-demo-note.fxd-modal{top:50%;bottom:auto;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 32px));padding:26px 26px 22px}' +
    '#fx-demo-veil{position:fixed;inset:0;z-index:2147482999;background:rgba(0,0,0,.62)}' +
    '#fx-demo-veil[hidden]{display:none}' +
    '@media (max-width:560px){#fx-demo-bar .fxd-long{display:none}#fx-demo-bar{padding-left:12px}}' +
    '@media print{#fx-demo-bar,#fx-demo-note,#fx-demo-veil{display:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var bar = document.createElement('div'); bar.id = 'fx-demo-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Fynix demonstration toolbar');
  bar.innerHTML = '<span class="fxd-label"><i class="fxd-dot" aria-hidden="true"></i><span>Interactive demo<span class="fxd-long">nstration</span></span></span>' +
    '<button type="button" id="fxd-info" aria-expanded="false" aria-controls="fx-demo-note">About</button>' +
    '<a href="' + back + '">Back to Fynix</a>' +
    '<a class="fxd-cta" href="' + wa + '" target="_blank" rel="noopener">Build mine</a>';
  var note = document.createElement('div'); note.id = 'fx-demo-note'; note.hidden = true;
  note.setAttribute('role', info.modal ? 'dialog' : 'region');
  if (info.modal) { note.setAttribute('aria-modal', 'true'); note.classList.add('fxd-modal'); }
  note.setAttribute('aria-label', 'About this demonstration');
  note.innerHTML = '<span class="fxd-kind">' + info.kind + '</span>' +
    '<p><strong>Demonstration site.</strong> ' + info.text + '</p>' +
    '<p>Want something like this for your business? Customized around your brand and requirements.</p>' +
    '<div class="fxd-row"><a class="fxd-primary" href="' + wa + '" target="_blank" rel="noopener">Get a Quote</a><button type="button" id="fxd-close">' + (info.modal ? 'Enter the demo' : 'Got it') + '</button></div>';
  var veil = document.createElement('div'); veil.id = 'fx-demo-veil'; veil.hidden = true;
  document.body.appendChild(veil); document.body.appendChild(note); document.body.appendChild(bar);
  var btn = document.getElementById('fxd-info'), closeBtn = document.getElementById('fxd-close');
  function openNote(focus) {
    note.hidden = false; btn.setAttribute('aria-expanded', 'true');
    if (info.modal) veil.hidden = false;
    if (focus) closeBtn.focus();
  }
  function closeNote() {
    note.hidden = true; veil.hidden = true; btn.setAttribute('aria-expanded', 'false');
    try { sessionStorage.setItem(seenKey, '1'); } catch (e) {}
  }
  btn.addEventListener('click', function () { if (note.hidden) openNote(false); else closeNote(); });
  closeBtn.addEventListener('click', function () { closeNote(); btn.focus(); });
  veil.addEventListener('click', closeNote);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !note.hidden) { closeNote(); btn.focus(); } });
  // First visit in this browser session: explain what the demo is before visitors use it
  if (!seen) openNote(info.modal);
})();
