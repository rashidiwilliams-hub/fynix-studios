// ---------- Article feed (paged one-at-a-time, with prev/next arrows) ----------
let feedItems = [];
let feedIndex = 0;
let feedEmptyHTML = '';

function renderFeedItem() {
  const feed = document.getElementById('articleFeed');
  if (!feed) return;

  if (feedItems.length === 0) {
    feed.innerHTML = feedEmptyHTML;
  } else {
    const a = feedItems[feedIndex];
    feed.innerHTML = `
      <h2>${a.title}</h2>
      <div class="article-image">
        <img src="${a.image}" alt="${a.alt}">
      </div>
      <p>${a.excerpt}</p>
      <div class="article-footer">
        <a href="article.html?id=${a.slug}" class="btn btn-dark">Read more</a>
      </div>
    `;
  }

  const nav = document.getElementById('feedNav');
  const counter = document.getElementById('feedCounter');
  if (counter) counter.textContent = feedItems.length ? `${feedIndex + 1} / ${feedItems.length}` : '';
  if (nav) nav.classList.toggle('single', feedItems.length <= 1);
}

function renderArticleFeed(category) {
  const feed = document.getElementById('articleFeed');
  if (!feed || typeof ARTICLES === 'undefined') return;
  feedItems = ARTICLES.filter(a => a.category === category);
  feedIndex = 0;
  feedEmptyHTML = `<h2>${category}</h2><p class="feed-empty">No posts in this category yet — check back soon.</p>`;
  renderFeedItem();
}

function renderSearchFeed(query) {
  const feed = document.getElementById('articleFeed');
  if (!feed || typeof ARTICLES === 'undefined') return;
  const q = query.trim().toLowerCase();
  feedItems = ARTICLES.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
  feedIndex = 0;
  feedEmptyHTML = `<h2>Search: "${query}"</h2><p class="feed-empty">No posts match your search — try another term.</p>`;
  renderFeedItem();
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.offsetHeight : 0;
  const targetY = el.getBoundingClientRect().top + window.scrollY - headerOffset - 20;
  window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
}

function showToast(message) {
  let toast = document.getElementById('demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
    toast.style.cssText = 'position:fixed;bottom:70px;left:50%;transform:translateX(-50%) translateY(10px);background:#1a1a1a;color:#fff;font-family:inherit;font-size:13px;font-weight:600;padding:10px 18px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,0.25);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:99999;white-space:nowrap;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2200);
}

document.addEventListener('DOMContentLoaded', () => {
  // Share / social icons — demo only, no live network to share to
  document.querySelectorAll('.share a, .social-icons a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const label = link.getAttribute('aria-label') || 'Social';
      showToast(`${label} — demo only, not a live link`);
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  const searchIcon = document.querySelector('.search-icon');
  const articleFeed = document.getElementById('articleFeed');
  if (articleFeed && searchInput) {
    // Live filter, in place (index.html has a feed to filter)
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      if (query.trim() === '') {
        const activeCategory = document.querySelector('.categories-list li.active a');
        if (activeCategory) renderArticleFeed(activeCategory.dataset.category);
      } else {
        renderSearchFeed(query);
      }
    });
  } else if (searchInput) {
    // No feed on this page (e.g. article.html) — hand off to the index page's search on submit
    const goSearch = () => {
      const query = searchInput.value.trim();
      window.location.href = `index.html${query ? '?q=' + encodeURIComponent(query) : ''}`;
    };
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); goSearch(); } });
    if (searchIcon) searchIcon.addEventListener('click', goSearch);
  }
  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery && searchInput && articleFeed) {
    searchInput.value = initialQuery;
    document.querySelectorAll('.categories-list li').forEach(li => li.classList.remove('active'));
    renderSearchFeed(initialQuery);
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth-scroll nav links
  document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSection(id);
      }
      document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
      if (link.closest('.main-nav')) link.classList.add('active');
      if (mainNav) mainNav.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Category filter (index.html sidebar)
  const categoriesList = document.getElementById('categoriesList');
  if (categoriesList) {
    categoriesList.querySelectorAll('a[data-category]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        categoriesList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        link.closest('li').classList.add('active');
        renderArticleFeed(link.dataset.category);
        scrollToSection('categories');
      });
    });
  }

  // Article feed paging (categories/search section)
  const feedPrev = document.getElementById('feedPrev');
  const feedNext = document.getElementById('feedNext');
  if (feedPrev) {
    feedPrev.addEventListener('click', () => {
      if (feedItems.length === 0) return;
      feedIndex = feedIndex <= 0 ? feedItems.length - 1 : feedIndex - 1;
      renderFeedItem();
    });
  }
  if (feedNext) {
    feedNext.addEventListener('click', () => {
      if (feedItems.length === 0) return;
      feedIndex = feedIndex >= feedItems.length - 1 ? 0 : feedIndex + 1;
      renderFeedItem();
    });
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
  var style = document.createElement('style');
  style.textContent = '.fynix-back-link{position:fixed;bottom:18px;left:18px;z-index:9000;background:#111;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.85;transition:opacity .2s ease,transform .2s ease;display:inline-flex;align-items:center;gap:6px;}' +
    '@media (max-width:640px){.fynix-back-link{left:auto;right:14px;bottom:80px;padding:0;width:40px;height:40px;justify-content:center;border-radius:50%;}.fynix-back-link .fynix-back-label{display:none;}}';
  document.head.appendChild(style);
  var link = document.createElement('a');
  link.href = '../../index.html';
  link.className = 'fynix-back-link';
  link.setAttribute('aria-label', 'Back to Portfolio');
  link.innerHTML = '<span aria-hidden="true">\u2190</span><span class="fynix-back-label">Back to Portfolio</span>';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = ''; link.style.transform = ''; });
  document.body.appendChild(link);
})();
