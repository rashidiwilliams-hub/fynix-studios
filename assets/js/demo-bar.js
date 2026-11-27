/* Fynix demo toolbar: marks a page as an interactive demonstration, links back to Fynix, and offers a quote. */
(function () {
  if (document.getElementById('fx-demo-bar')) return;
  var NAMES = { 'nomad': 'Nomad', 'nomad-skincare': 'Nomad Skincare', 'feastly': 'Feastly', 'flowspace': 'Flowspace', 'relentless-fitness': 'Relentless Fitness', 'guyana-bites': 'Guyana Bites', 'lux-rentals': 'Lux Rentals', 'regent': 'Regent' };
  var m = location.pathname.match(/\/portfolio\/([^\/]+)\//);
  var key = m ? m[1] : '';
  var name = NAMES[key] || 'this demo';
  var back = '../../index.html#portfolio';
  var wa = 'https://wa.me/5927135786?text=' + encodeURIComponent("Hi Fynix Studios, I saw the " + name + " demo and I'd like something like it for my business.");

  var css = '#fx-demo-bar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:6px;padding:6px 6px 6px 16px;max-width:calc(100vw - 20px);background:rgba(12,12,12,.94);color:#f3f1ec;border:1px solid rgba(255,255,255,.18);border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.4);font:600 13px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}' +
    '#fx-demo-bar *{box-sizing:border-box}' +
    '#fx-demo-bar .fxd-label{display:flex;align-items:center;gap:8px;white-space:nowrap;padding-right:8px}' +
    '#fx-demo-bar .fxd-dot{width:8px;height:8px;border-radius:50%;background:#ff5a26;flex:none}' +
    '#fx-demo-bar a,#fx-demo-bar button{font:inherit;color:inherit;text-decoration:none;cursor:pointer;border:0;background:transparent;border-radius:999px;padding:9px 12px;white-space:nowrap}' +
    '#fx-demo-bar a:hover,#fx-demo-bar button:hover{background:rgba(255,255,255,.1)}' +
    '#fx-demo-bar .fxd-cta{background:#ff5a26;color:#fff;padding:9px 14px}' +
    '#fx-demo-bar .fxd-cta:hover{background:#e64f1c}' +
    '#fx-demo-bar a:focus-visible,#fx-demo-bar button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '#fx-demo-note{position:fixed;left:50%;bottom:68px;transform:translateX(-50%);z-index:2147483000;width:min(380px,calc(100vw - 20px));padding:16px 18px;background:rgba(12,12,12,.96);color:#f3f1ec;border:1px solid rgba(255,255,255,.18);border-radius:18px;box-shadow:0 14px 40px rgba(0,0,0,.45);font:400 14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '#fx-demo-note[hidden]{display:none}' +
    '#fx-demo-note p{margin:0 0 10px}' +
    '#fx-demo-note a{display:inline-block;margin-top:4px;padding:9px 16px;border-radius:999px;background:#ff5a26;color:#fff;font-weight:700;text-decoration:none}' +
    '@media (max-width:560px){#fx-demo-bar .fxd-label span.fxd-long{display:none}#fx-demo-bar{padding-left:12px}}' +
    '@media print{#fx-demo-bar,#fx-demo-note{display:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var bar = document.createElement('div'); bar.id = 'fx-demo-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Fynix demonstration toolbar');
  bar.innerHTML = '<span class="fxd-label"><i class="fxd-dot" aria-hidden="true"></i><span>Interactive demo<span class="fxd-long">nstration</span></span></span>' +
    '<button type="button" id="fxd-info" aria-expanded="false" aria-controls="fx-demo-note" aria-label="About this demonstration">About</button>' +
    '<a href="' + back + '">Back to Fynix</a>' +
    '<a class="fxd-cta" href="' + wa + '" target="_blank" rel="noopener">Build mine</a>';
  var note = document.createElement('div'); note.id = 'fx-demo-note'; note.hidden = true;
  note.innerHTML = '<p><strong>Demonstration site.</strong> Products, figures, testimonials, accounts and checkout are simulated.</p>' +
    '<p>Want something like this for your business? Customized around your brand and requirements.</p>' +
    '<a href="' + wa + '" target="_blank" rel="noopener">Get a Quote</a>';
  document.body.appendChild(note); document.body.appendChild(bar);
  var btn = document.getElementById('fxd-info');
  btn.addEventListener('click', function () { var open = note.hidden; note.hidden = !open; btn.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !note.hidden) { note.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
})();
