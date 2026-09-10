document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Feature carousel (index.html only)
  const track = document.getElementById('carouselTrack');
  if (track) {
    const cards = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let index = 0;

    function cardsPerView() {
      const w = window.innerWidth;
      if (w <= 760) return 1;
      if (w <= 980) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, cards.length - cardsPerView());
    }

    function update() {
      index = Math.min(index, maxIndex());
      const percent = (100 / cardsPerView()) * index;
      track.style.transform = `translateX(-${percent}%)`;
    }

    nextBtn.addEventListener('click', () => {
      index = index >= maxIndex() ? 0 : index + 1;
      update();
    });

    prevBtn.addEventListener('click', () => {
      index = index <= 0 ? maxIndex() : index - 1;
      update();
    });

    window.addEventListener('resize', update);
    update();
  }

  initArticlePage();
});

function initArticlePage() {
  const detail = document.getElementById('articleDetail');
  if (!detail || typeof ARTICLES === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const article = ARTICLES.find(a => a.slug === id) || ARTICLES[0];

  document.title = `${article.title} — Guyana Bites`;
  document.getElementById('crumbTitle').textContent = article.title;
  document.getElementById('articleCategory').textContent = article.category;
  document.getElementById('articleTag').textContent = article.category;
  document.getElementById('articleTitle').textContent = article.title;
  document.getElementById('articleExcerpt').textContent = article.excerpt;
  const img = document.getElementById('articleImage');
  img.src = article.image;
  img.alt = article.alt;

  const relatedList = document.getElementById('relatedList');
  const related = ARTICLES.filter(a => a.slug !== article.slug).slice(0, 4);
  relatedList.innerHTML = related.map(a => `<li><a href="article.html?id=${a.slug}">${a.title}</a></li>`).join('');
}

// ---------- Permanent link back to the Fynix Studios portfolio ----------
(function () {
  var link = document.createElement('a');
  link.href = '../../index.html';
  link.textContent = '← Back to Portfolio';
  link.style.cssText = 'position:fixed;bottom:18px;left:18px;z-index:99999;background:#111;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.9;transition:opacity .2s ease,transform .2s ease;';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = '0.9'; link.style.transform = 'translateY(0)'; });
  document.body.appendChild(link);
})();
