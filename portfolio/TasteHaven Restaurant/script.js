// TasteHaven — local proof-of-concept data & interactivity.
// Everything below runs entirely in the browser; there is no backend.
// This file is shared across every page, so each feature block is guarded
// to only run when its elements are actually present on the current page.

const MENU = [
  // ---------- Starters ----------
  {
    id: 1, category: 'Starters', name: 'Garlic Bread Bruschetta', price: 1400,
    desc: 'Toasted bread topped with fresh tomatoes, basil, and garlic.',
    img: 'assets/images/image-10.jpg',
    alt: 'Garlic bread bruschetta with tomato and basil'
  },
  {
    id: 2, category: 'Starters', name: 'Caesar Salad', price: 1800,
    desc: 'Crisp romaine, parmesan, croutons, and classic Caesar dressing.',
    img: 'assets/images/image-11.jpg',
    alt: 'Caesar salad with parmesan and croutons'
  },
  {
    id: 3, category: 'Starters', name: 'Pholourie with Tamarind Dip', price: 1200, badge: 'Popular',
    desc: 'Golden split-pea fritters, spiced and fried to order, served with tangy tamarind sauce.',
    img: 'assets/images/pholourie.jpg',
    alt: 'Golden fried pholourie in a bowl'
  },

  // ---------- Mains ----------
  {
    id: 4, category: 'Mains', name: 'Pepperpot with Homemade Bread', price: 4200, badge: "Chef's Pick",
    desc: 'Our take on Guyana\'s national dish — beef slow-simmered for hours in cassareep until dark and deeply spiced.',
    img: 'assets/images/pepperpot.jpg',
    alt: 'Bowl of Guyanese pepperpot stew'
  },
  {
    id: 5, category: 'Mains', name: 'Curry Chicken with Rice', price: 3400, badge: 'Popular',
    desc: 'Bone-in chicken and potato simmered in a rich curry, served with steamed rice.',
    img: 'assets/images/curry-chicken.jpg',
    alt: 'Guyanese curry chicken with potato'
  },
  {
    id: 6, category: 'Mains', name: 'Guyanese Chowmein', price: 3000,
    desc: 'Stir-fried noodles with chicken, carrot, and cabbage in our house sauce — a Georgetown favorite.',
    img: 'assets/images/chowmein.jpg',
    alt: 'Guyanese-style chowmein noodles with vegetables'
  },
  {
    id: 7, category: 'Mains', name: 'Pan-Seared Snapper in Garlic Butter', price: 4200,
    desc: 'Fresh local snapper pan-seared and finished with garlic butter and roasted veggies.',
    img: 'assets/images/image-13.jpg',
    alt: 'Pan-seared snapper with vegetables'
  },
  {
    id: 8, category: 'Mains', name: 'Margherita Pizza', price: 3400,
    desc: 'Classic pizza with San Marzano tomato, fresh mozzarella, and basil.',
    img: 'assets/images/image-14.jpg',
    alt: 'Margherita pizza'
  },
  {
    id: 9, category: 'Mains', name: 'Classic Cheeseburger', price: 2800,
    desc: 'Juicy beef patty, cheddar, lettuce, tomato, and house sauce.',
    img: 'assets/images/image-15.jpg',
    alt: 'Classic cheeseburger'
  },
  {
    id: 10, category: 'Mains', name: 'Creamy Alfredo Pasta', price: 3200,
    desc: 'Rich and creamy pasta with parmesan and grilled chicken.',
    img: 'assets/images/image-12.jpg',
    alt: 'Creamy Alfredo pasta'
  },

  // ---------- Bowls ----------
  {
    id: 11, category: 'Bowls', name: 'Cook-Up Rice Bowl', price: 3000,
    desc: 'Rice cooked down with pigeon peas, coconut milk, and glazed chicken — comfort food, one-pot style.',
    img: 'assets/images/image-17.jpg',
    alt: 'Cook-up rice bowl with glazed chicken'
  },
  {
    id: 12, category: 'Bowls', name: 'Avocado Power Bowl', price: 2800,
    desc: 'Healthy bowl with quinoa, avocado, veggies & lemon dressing.',
    img: 'assets/images/image-16.jpg',
    alt: 'Avocado power bowl'
  },

  // ---------- Desserts ----------
  {
    id: 13, category: 'Desserts', name: 'Guyanese Pine Tart', price: 1600,
    desc: 'Flaky pastry filled with sweet, tangy stewed pineapple — a local favorite.',
    img: 'assets/images/pine-tart-new.jpg',
    alt: 'Glazed pineapple pine tart pastries'
  },
  {
    id: 14, category: 'Desserts', name: 'Black Cake', price: 1800, badge: 'Popular',
    desc: 'Dense, dark fruit cake soaked in rum and cherry brandy for months — a Guyanese Christmas tradition, year-round.',
    img: 'assets/images/black-cake.jpg',
    alt: 'Freshly baked Guyanese black cake'
  },
  {
    id: 15, category: 'Desserts', name: 'Choco Lava Cake', price: 1800,
    desc: 'Warm chocolate cake with a rich, gooey center.',
    img: 'assets/images/image-18.jpg',
    alt: 'Chocolate lava cake'
  },

  // ---------- Drinks ----------
  {
    id: 16, category: 'Drinks', name: 'Sorrel', price: 900,
    desc: 'House-steeped sorrel (hibiscus) with ginger and warm spice, served over ice.',
    img: 'assets/images/sorrel.jpg',
    alt: 'Glass of iced sorrel drink'
  },
  {
    id: 17, category: 'Drinks', name: 'Ginger Beer', price: 900,
    desc: 'Sharp, homemade ginger beer with a squeeze of lime — not for the faint of heart.',
    img: 'assets/images/ginger-beer.jpg',
    alt: 'Glass of homemade ginger beer with fresh ginger'
  },
  {
    id: 18, category: 'Drinks', name: 'Peanut Punch', price: 1100,
    desc: 'Creamy blended peanut, milk, and a touch of nutmeg — a Guyanese classic.',
    img: 'assets/images/peanut-punch.jpg',
    alt: 'Creamy peanut punch drink'
  },
  {
    id: 19, category: 'Drinks', name: 'Fresh Lemonade', price: 900,
    desc: 'House-made lemonade with a hint of mint.',
    img: 'assets/images/image-20.jpg',
    alt: 'Fresh lemonade'
  },
  {
    id: 20, category: 'Drinks', name: 'Iced Berry Smoothie', price: 1200,
    desc: 'Blended mixed berries with yogurt and honey.',
    img: 'assets/images/image-21.jpg',
    alt: 'Iced berry smoothie'
  }
];

const HOME_FEATURED_IDS = [4, 5, 3, 14];
const CART_KEY = 'tastehaven_cart';
const DELIVERY_FEE = 800;
const TAX_RATE = 0.14;

function formatMoney(n) {
  return 'G$' + Math.round(n).toLocaleString('en-US');
}

// ---------- Cart storage ----------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function getQty(id) {
  const entry = getCart().find(c => c.id === id);
  return entry ? entry.qty : 0;
}

function addToCart(id) {
  const cart = getCart();
  const entry = cart.find(c => c.id === id);
  if (entry) entry.qty += 1; else cart.push({ id, qty: 1 });
  setCart(cart);
}

function setQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  } else {
    const entry = cart.find(c => c.id === id);
    if (entry) entry.qty = qty; else cart.push({ id, qty });
  }
  setCart(cart);
}

function removeFromCart(id) {
  setCart(getCart().filter(c => c.id !== id));
}

function cartCount() {
  return getCart().reduce((sum, c) => sum + c.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, c) => {
    const item = MENU.find(m => m.id === c.id);
    return item ? sum + item.price * c.qty : sum;
  }, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cartCount();
}

// ---------- Dish card rendering (home + menu pages) ----------
function dishCardHTML(item) {
  const qty = getQty(item.id);
  const footerHTML = `<div class="qty-stepper" data-id="${item.id}">
         <button class="qty-minus" aria-label="Decrease quantity"${qty === 0 ? ' disabled' : ''}>−</button>
         <span class="qty-num">${qty}</span>
         <button class="qty-plus" aria-label="Increase quantity">+</button>
       </div>`;
  const badgeHTML = item.badge ? `<span class="dish-badge">${item.badge}</span>` : '';
  return `
    <article class="dish-card" data-id="${item.id}">
      <div class="dish-img">
        ${badgeHTML}
        <img src="${item.img}" alt="${item.alt}">
        <button class="fav-btn" aria-label="Favorite">♡</button>
      </div>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="dish-footer"><span>${formatMoney(item.price)}</span>${footerHTML}</div>
    </article>`;
}

function renderDishGrid(container, items) {
  container.innerHTML = items.map(dishCardHTML).join('');
}

function wireDishGrid(container) {
  container.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.fav-btn');
    if (favBtn) {
      favBtn.classList.toggle('active');
      favBtn.textContent = favBtn.classList.contains('active') ? '♥' : '♡';
      return;
    }
    const plusBtn = e.target.closest('.qty-plus');
    if (plusBtn) {
      const id = Number(plusBtn.closest('.qty-stepper').dataset.id);
      setQty(id, getQty(id) + 1);
      rerenderCard(container, id);
      return;
    }
    const minusBtn = e.target.closest('.qty-minus');
    if (minusBtn) {
      const id = Number(minusBtn.closest('.qty-stepper').dataset.id);
      setQty(id, getQty(id) - 1);
      rerenderCard(container, id);
      return;
    }
    const card = e.target.closest('.dish-card');
    if (card) {
      window.location.href = `dish.html?id=${card.dataset.id}`;
    }
  });
}

function rerenderCard(container, id) {
  const item = MENU.find(m => m.id === id);
  const card = container.querySelector(`.dish-card[data-id="${id}"]`);
  if (item && card) card.outerHTML = dishCardHTML(item);
}

// ---------- Cart drawer ----------
function renderCartDrawer() {
  const cart = getCart();
  const list = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmpty');
  const foot = document.getElementById('cartFoot');
  if (!list) return;
  if (cart.length === 0) {
    list.innerHTML = '';
    empty.hidden = false;
    foot.hidden = true;
    return;
  }
  empty.hidden = true;
  foot.hidden = false;
  list.innerHTML = cart.map(c => {
    const item = MENU.find(m => m.id === c.id);
    if (!item) return '';
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.img}" alt="${item.alt}">
        <div class="cart-item-body">
          <strong>${item.name}</strong>
          <div class="cart-item-price">${formatMoney(item.price)} × ${c.qty}</div>
          <div class="qty-stepper" data-id="${item.id}">
            <button class="qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-remove="${item.id}">Remove</button>
      </div>`;
  }).join('');
  document.getElementById('cartSubtotal').textContent = formatMoney(cartSubtotal());
}

function showOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = false;
  void el.offsetWidth; // force reflow so the open transition plays
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openCart() {
  renderCartDrawer();
  showOverlay('cartOverlay');
}

function closeAllOverlays() {
  const open = document.querySelectorAll('.cart-overlay.open, .modal-overlay.open');
  open.forEach(o => o.classList.remove('open'));
  document.body.style.overflow = '';
  setTimeout(() => {
    // Guard against a rapid close-then-reopen: only hide overlays that are still closed.
    open.forEach(o => { if (!o.classList.contains('open')) o.hidden = true; });
  }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Nav toggle (every page) ----------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ---------- Cart badge + drawer (every page) ----------
  updateCartBadge();
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  const cartClose = document.getElementById('cartClose');
  if (cartClose) cartClose.addEventListener('click', closeAllOverlays);
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) closeAllOverlays(); });
    document.getElementById('cartItems').addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) { removeFromCart(Number(removeBtn.dataset.remove)); renderCartDrawer(); return; }
      const plusBtn = e.target.closest('.qty-plus');
      if (plusBtn) {
        const id = Number(plusBtn.closest('.qty-stepper').dataset.id);
        setQty(id, getQty(id) + 1);
        renderCartDrawer();
        return;
      }
      const minusBtn = e.target.closest('.qty-minus');
      if (minusBtn) {
        const id = Number(minusBtn.closest('.qty-stepper').dataset.id);
        setQty(id, getQty(id) - 1);
        renderCartDrawer();
        return;
      }
    });
  }

  // ---------- Sign in modal (every page) ----------
  const accountBtn = document.getElementById('accountBtn');
  if (accountBtn) {
    accountBtn.addEventListener('click', () => showOverlay('signInModal'));
  }
  const signInClose = document.getElementById('signInClose');
  if (signInClose) signInClose.addEventListener('click', closeAllOverlays);
  const signInModal = document.getElementById('signInModal');
  if (signInModal) signInModal.addEventListener('click', (e) => { if (e.target === signInModal) closeAllOverlays(); });
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('signInSuccess').hidden = false;
      signInForm.hidden = true;
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllOverlays(); });

  // ---------- Social links (every page) ----------
  const SOCIAL_NAMES = { facebook: 'Facebook', instagram: 'Instagram', twitter: 'Twitter', pinterest: 'Pinterest' };
  document.querySelectorAll('[data-social]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const name = SOCIAL_NAMES[link.dataset.social] || 'social';
      const title = document.getElementById('socialTitle');
      const body = document.getElementById('socialBody');
      if (title) title.textContent = name;
      if (body) body.textContent = `This is a demo link — in a live site this would open our ${name} profile in a new tab.`;
      showOverlay('socialModal');
    });
  });
  const socialClose = document.getElementById('socialClose');
  if (socialClose) socialClose.addEventListener('click', closeAllOverlays);
  const socialModal = document.getElementById('socialModal');
  if (socialModal) socialModal.addEventListener('click', (e) => { if (e.target === socialModal) closeAllOverlays(); });

  // ---------- Home dish grid (index.html) ----------
  const homeDishGrid = document.getElementById('homeDishGrid');
  if (homeDishGrid) {
    renderDishGrid(homeDishGrid, MENU.filter(m => HOME_FEATURED_IDS.includes(m.id)));
    wireDishGrid(homeDishGrid);
  }

  // ---------- Full menu page (menu.html) ----------
  const menuGrid = document.getElementById('menuGrid');
  if (menuGrid) {
    let activeCategory = 'All';
    const render = () => {
      const items = activeCategory === 'All' ? MENU : MENU.filter(m => m.category === activeCategory);
      renderDishGrid(menuGrid, items);
    };
    render();
    wireDishGrid(menuGrid);
    document.querySelectorAll('.menu-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeCategory = tab.dataset.category;
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t === tab));
        render();
      });
    });
  }

  // ---------- Favorite toggles on any static dish cards ----------
  document.querySelectorAll('.dish-card .fav-btn').forEach(btn => {
    if (btn.closest('#homeDishGrid') || btn.closest('#menuGrid')) return; // handled by delegation above
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      this.textContent = this.classList.contains('active') ? '♥' : '♡';
    });
  });

  // ---------- Reviews carousel (index.html) ----------
  const track = document.getElementById('reviewTrack');
  if (track) {
    document.getElementById('revNext').addEventListener('click', () => track.scrollBy({ left: 320, behavior: 'smooth' }));
    document.getElementById('revPrev').addEventListener('click', () => track.scrollBy({ left: -320, behavior: 'smooth' }));
  }

  // ---------- Newsletter form (index.html) ----------
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      e.target.reset();
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  }

  // ---------- Watch video placeholder (index.html) ----------
  const watchVideoBtn = document.getElementById('watchVideoBtn');
  if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', () => {
      const original = watchVideoBtn.innerHTML;
      watchVideoBtn.innerHTML = 'Video coming soon!';
      setTimeout(() => { watchVideoBtn.innerHTML = original; }, 2000);
    });
  }

  // ---------- FAQ accordions (faq.html, other pages) ----------
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });

  // ---------- Blog read-more (blog.html) ----------
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.blog-card');
      const expanded = card.classList.toggle('expanded');
      btn.textContent = expanded ? 'Show Less ↑' : 'Read More →';
    });
  });

  // ---------- Generic local-only forms (catering, franchise) ----------
  const cateringForm = document.getElementById('cateringForm');
  if (cateringForm) {
    cateringForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('cateringFormSuccess').hidden = false;
      cateringForm.hidden = true;
    });
  }
  const franchiseForm = document.getElementById('franchiseForm');
  if (franchiseForm) {
    franchiseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('franchiseFormSuccess').hidden = false;
      franchiseForm.hidden = true;
    });
  }

  // ---------- Checkout page (checkout.html) ----------
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    const cart = getCart();
    const summaryItems = document.getElementById('summaryItems');
    const checkoutEmpty = document.getElementById('checkoutEmpty');
    const checkoutContent = document.getElementById('checkoutContent');

    if (cart.length === 0) {
      checkoutContent.hidden = true;
      checkoutEmpty.hidden = false;
    } else {
      checkoutContent.hidden = false;
      checkoutEmpty.hidden = true;

      const renderSummary = () => {
        const items = getCart();
        summaryItems.innerHTML = items.map(c => {
          const item = MENU.find(m => m.id === c.id);
          if (!item) return '';
          return `<div class="summary-item"><span>${item.name} × ${c.qty}</span><strong>${formatMoney(item.price * c.qty)}</strong></div>`;
        }).join('');
        const subtotal = cartSubtotal();
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + DELIVERY_FEE;
        document.getElementById('summarySubtotal').textContent = formatMoney(subtotal);
        document.getElementById('summaryDelivery').textContent = formatMoney(DELIVERY_FEE);
        document.getElementById('summaryTax').textContent = formatMoney(tax);
        document.getElementById('summaryTotal').textContent = formatMoney(total);
      };
      renderSummary();

      const paymentRadios = document.querySelectorAll('input[name="payment"]');
      const cardFields = document.getElementById('cardFields');
      paymentRadios.forEach(r => {
        r.addEventListener('change', () => {
          cardFields.hidden = document.querySelector('input[name="payment"]:checked').value !== 'card';
        });
      });

      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('checkoutName').value || 'there';
        const orderNumber = 'TH' + Date.now().toString().slice(-6);
        const subtotal = cartSubtotal();
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + DELIVERY_FEE;

        document.getElementById('confirmName').textContent = name.split(' ')[0];
        document.getElementById('confirmOrderNumber').textContent = '#' + orderNumber;
        document.getElementById('confirmTotal').textContent = formatMoney(total);

        checkoutForm.closest('.checkout-form-col').hidden = true;
        document.querySelector('.order-summary').hidden = true;
        document.getElementById('checkoutConfirmation').hidden = false;

        setCart([]);
      });
    }
  }

  // ---------- Header shadow on scroll (every page) ----------
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const updateHeaderShadow = () => siteHeader.classList.toggle('scrolled', window.scrollY > 8);
    updateHeaderShadow();
    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  }

  // ---------- Back to top button (every page, injected) ----------
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
  document.body.appendChild(backToTop);
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  // ---------- Scroll-reveal animations (every page) ----------
  const revealTargets = document.querySelectorAll(
    '.dishes .section-head, .dish-grid, .offer-banner, .reviews .section-head, .review-card, ' +
    '.blog .section-head, .blog-card, .newsletter, .page-section > h2, .page-section .steps-row, ' +
    '.page-section .team-grid, .page-section .job-list, .page-section .press-grid, .page-section .faq-list, ' +
    '.page-section .blog-grid, .form-card, .calc-card, .checkout-grid, .menu-grid'
  );
  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    revealTargets.forEach(el => io.observe(el));

    // Safety net: never let an element stay invisible indefinitely, no matter the viewport/content edge case.
    setTimeout(() => {
      revealTargets.forEach(el => el.classList.add('visible'));
    }, 2500);
  }

  // ---------- Dish detail page (dish.html) ----------
  initDishPage();
});

function initDishPage() {
  const detail = document.getElementById('dishDetail');
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const item = MENU.find(m => m.id === id) || MENU[0];

  document.title = `${item.name} — TasteHaven`;
  document.getElementById('crumbName').textContent = item.name;
  document.getElementById('dishName').textContent = item.name;
  document.getElementById('dishCategory').textContent = item.category;
  document.getElementById('dishPrice').textContent = formatMoney(item.price);
  document.getElementById('dishDesc').textContent = item.desc;
  const img = document.getElementById('dishImage');
  img.src = item.img;
  img.alt = item.alt;
  const badge = document.getElementById('dishBadge');
  if (item.badge) { badge.textContent = item.badge; badge.hidden = false; } else { badge.hidden = true; }

  const qtyValue = document.getElementById('dishQty');
  document.querySelector('#dishQtyStepper .qty-minus').addEventListener('click', () => {
    qtyValue.textContent = Math.max(1, Number(qtyValue.textContent) - 1);
  });
  document.querySelector('#dishQtyStepper .qty-plus').addEventListener('click', () => {
    qtyValue.textContent = Number(qtyValue.textContent) + 1;
  });

  const addBtn = document.getElementById('dishAddBtn');
  addBtn.addEventListener('click', () => {
    const qty = Number(qtyValue.textContent);
    const cart = getCart();
    const entry = cart.find(c => c.id === item.id);
    if (entry) entry.qty += qty; else cart.push({ id: item.id, qty });
    setCart(cart);
    const original = addBtn.textContent;
    addBtn.textContent = 'Added ✓';
    setTimeout(() => { addBtn.textContent = original; }, 1400);
  });

  const favBtn = document.querySelector('.pdp-fav');
  favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('active');
    favBtn.textContent = favBtn.classList.contains('active') ? '♥' : '♡';
  });

  document.querySelectorAll('.pdp-tab-head').forEach(head => {
    head.addEventListener('click', () => {
      document.querySelectorAll('.pdp-tab-head').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.pdp-tab-panel').forEach(p => p.classList.remove('active'));
      head.classList.add('active');
      document.querySelector(`.pdp-tab-panel[data-tab-panel="${head.dataset.tab}"]`).classList.add('active');
    });
  });

  const relatedGrid = document.getElementById('relatedDishGrid');
  const sameCategory = MENU.filter(m => m.category === item.category && m.id !== item.id);
  const others = MENU.filter(m => m.category !== item.category && m.id !== item.id);
  const related = sameCategory.concat(others).slice(0, 3);
  renderDishGrid(relatedGrid, related);
  wireDishGrid(relatedGrid);
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
