(function () {
  var sheets = document.querySelectorAll('.bp-sheet');
  if (!sheets.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  // pathLength=1 lets one dash value draw every line at its own length
  document.querySelectorAll('.bp-svg .draw, .bp-svg .draw *').forEach(function (el) {
    if (el.setAttribute) el.setAttribute('pathLength', '1');
  });
  document.documentElement.classList.add('bp-js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { var t = e.target; t.classList.add('is-drawn'); io.unobserve(t); setTimeout(function () { t.classList.add('is-done'); }, 1700); }
    });
  }, { threshold: 0.2 });
  sheets.forEach(function (s) { io.observe(s); });
})();
