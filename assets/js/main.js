document.addEventListener('DOMContentLoaded', function () {
  // Preloader
  var loading = document.getElementById('loading');
  window.addEventListener('load', function () {
    setTimeout(function () { loading && loading.classList.add('loaded'); }, 300);
  });

  // Sticky header + back-to-top visibility
  var header = document.getElementById('header-sticky');
  var backToTop = document.getElementById('back_to_top');
  window.addEventListener('scroll', function () {
    header.classList.toggle('header-sticky', window.scrollY > 150);
    backToTop.classList.toggle('show', window.scrollY > 400);
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
