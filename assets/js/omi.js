(function () {
  var buttons = document.querySelectorAll('.omi-filter');
  var tiles = document.querySelectorAll('.omi-tile');
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      tiles.forEach(function (t) {
        t.hidden = !(f === 'all' || t.getAttribute('data-cat') === f);
      });
    });
  });
})();
