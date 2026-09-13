// ---------- Shared schedule cart (persisted across page loads via localStorage) ----------
const CART_KEY = 'relentless_cart';
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = cart.reduce((s, c) => s + c.qty, 0));
}
function addToCart(slug) {
  const cart = getCart();
  const existing = cart.find(c => c.slug === slug);
  if (existing) existing.qty += 1; else cart.push({ slug, qty: 1 });
  setCart(cart);
}
function formatMoney(n) { return `G$${Math.round(n).toLocaleString('en-US')}`; }

function starsHTML(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function programCardHTML(program) {
  return `
    <article class="program-card" data-slug="${program.slug}">
      <div class="card-img"><img src="${program.image}" alt="${program.alt}"><span class="card-category-tag">${program.category}</span></div>
      <div class="card-body">
        <h3>${program.name}</h3>
        <div class="card-rating"><span class="stars">${starsHTML(program.rating)}</span><span class="rating-count">(${program.reviews})</span></div>
        <p class="card-lead">${program.lead}</p>
        <div class="card-meta-row"><span>${program.level}</span><span>${program.duration}</span></div>
        <div class="card-bottom">
          <span class="card-price">${formatMoney(program.price)}<small>/class</small></span>
          <button class="add-btn" aria-label="Book class" data-qty-add="${program.slug}">Book Class</button>
        </div>
      </div>
    </article>`;
}

function wireProgramGrid(grid) {
  if (!grid) return;
  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      addToCart(this.dataset.qtyAdd);
      const original = this.innerHTML;
      this.textContent = 'Booked ✓';
      this.classList.add('added');
      setTimeout(() => { this.innerHTML = original; this.classList.remove('added'); }, 1200);
    });
  });
  grid.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-btn')) return;
      window.location.href = `program.html?id=${card.dataset.slug}`;
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(10px);background:#1a1a1a;color:#fff;font-family:inherit;font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.25);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:99999;white-space:nowrap;';
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
  setCart(getCart());
  initHomePage();
  initProgramsPage();
  initProgramDetailPage();
  initMobileNav();

  document.getElementById('cartBtn')?.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
  ['joinNowBtn', 'joinNowBtn2', 'joinCommunityBtn'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', (e) => {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'index.html#contact';
      }
    });
  });
  document.getElementById('watchVideoBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Video tour — demo only');
  });

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      newsletterForm.reset();
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      contactForm.reset();
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  }
});

// ---------- Mobile nav toggle ----------
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}

// ---------- Home page ----------
function initHomePage() {
  const grid = document.getElementById('homeProgramsGrid');
  if (!grid) return;
  grid.innerHTML = PROGRAMS.slice(0, 4).map(programCardHTML).join('');
  wireProgramGrid(grid);
}

// ---------- Programs listing page ----------
function initProgramsPage() {
  const grid = document.getElementById('programsGrid');
  if (!grid) return;
  const categories = ['All', ...Array.from(new Set(PROGRAMS.map(p => p.category)))];
  const tabs = document.getElementById('programTabs');
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') && categories.includes(params.get('category')) ? params.get('category') : 'All';

  function render() {
    const list = activeCategory === 'All' ? PROGRAMS : PROGRAMS.filter(p => p.category === activeCategory);
    grid.innerHTML = list.length ? list.map(programCardHTML).join('') : '<p class="no-results">No programs found.</p>';
    wireProgramGrid(grid);
    const countEl = document.getElementById('programsCount');
    if (countEl) countEl.textContent = `${list.length} ${list.length === 1 ? 'program' : 'programs'}`;
  }

  if (tabs) {
    tabs.innerHTML = categories.map(c => `<button class="program-tab${c === activeCategory ? ' active' : ''}" data-category="${c}">${c}</button>`).join('');
    tabs.querySelectorAll('.program-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeCategory = tab.dataset.category;
        tabs.querySelectorAll('.program-tab').forEach(t => t.classList.toggle('active', t === tab));
        render();
      });
    });
  }
  render();
}

// ---------- Program detail page ----------
function initProgramDetailPage() {
  const detail = document.getElementById('programDetail');
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const program = PROGRAMS.find(p => p.slug === params.get('id')) || PROGRAMS[0];

  document.title = `${program.name} — Relentless Fitness`;
  document.getElementById('crumbCategory').textContent = program.category;
  document.getElementById('crumbCategory').href = `programs.html?category=${encodeURIComponent(program.category)}`;
  document.getElementById('crumbName').textContent = program.name;
  document.getElementById('programCategoryTag').textContent = program.category;
  document.getElementById('programName').textContent = program.name;
  document.getElementById('programStars').textContent = starsHTML(program.rating);
  document.getElementById('programReviewCount').textContent = `(${program.reviews} reviews)`;
  document.getElementById('programLead').textContent = program.lead;
  document.getElementById('programDescription').textContent = program.description;
  document.getElementById('programLevel').textContent = program.level;
  document.getElementById('programDuration').textContent = program.duration;
  document.getElementById('programTrainer').textContent = program.trainer;
  document.getElementById('programSchedule').textContent = program.schedule;
  document.getElementById('programPrice').textContent = `${formatMoney(program.price)} / class`;

  const benefitsList = document.getElementById('programBenefits');
  benefitsList.innerHTML = program.benefits.map(b => `<li>${b}</li>`).join('');

  const mainImage = document.getElementById('mainImage');
  mainImage.src = program.image;
  mainImage.alt = program.alt;

  const bookBtn = document.getElementById('bookClassBtn');
  bookBtn.addEventListener('click', () => {
    addToCart(program.slug);
    const original = bookBtn.textContent;
    bookBtn.textContent = 'Booked ✓';
    bookBtn.classList.add('added');
    setTimeout(() => { bookBtn.textContent = original; bookBtn.classList.remove('added'); }, 1400);
  });

  const grid = document.getElementById('relatedGrid');
  const related = PROGRAMS.filter(p => p.slug !== program.slug).slice(0, 3);
  grid.innerHTML = related.map(programCardHTML).join('');
  wireProgramGrid(grid);
}

// ---------- Permanent link back to the Fynix Studios portfolio ----------
(function () {
  var style = document.createElement('style');
  style.textContent = '.fynix-back-link{position:fixed;bottom:18px;left:18px;z-index:9000;background:#14151a;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 16px;border-radius:8px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.3);opacity:0.85;transition:opacity .2s ease,transform .2s ease;display:inline-flex;align-items:center;gap:6px;}' +
    '@media (max-width:640px){.fynix-back-link{left:auto;right:14px;bottom:80px;padding:0;width:40px;height:40px;justify-content:center;border-radius:50%;}.fynix-back-link .fynix-back-label{display:none;}}';
  document.head.appendChild(style);
  var link = document.createElement('a');
  link.href = '../../index.html';
  link.className = 'fynix-back-link';
  link.setAttribute('aria-label', 'Back to Portfolio');
  link.innerHTML = '<span aria-hidden="true">←</span><span class="fynix-back-label">Back to Portfolio</span>';
  link.addEventListener('mouseenter', function () { link.style.opacity = '1'; link.style.transform = 'translateY(-2px)'; });
  link.addEventListener('mouseleave', function () { link.style.opacity = ''; link.style.transform = ''; });
  document.body.appendChild(link);
})();
