document.addEventListener('DOMContentLoaded', () => {
  /* || webflow cleanup */
  ['w-inline-block', 'w-embed', 'w-script', 'w-layout-grid', 'w--current'].forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.classList.remove(className);
    });
  });

  document.querySelectorAll('.css').forEach(el => {
    if (el.classList.length === 1) {
      el.remove();
    }
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.w--current').forEach(el => {
      el.classList.remove('w--current');
    });
  });

  document.querySelectorAll('[class*="list"][role="list"]').forEach(el => {
    el.removeAttribute('role');
  });

  /* || spacer cleanup */
  document.querySelectorAll('.i').forEach(el => {
    if (el.innerHTML.trim() === '') {
      const comment = document.createComment('');
      el.replaceWith(comment);
    }
  });
});

/* || Nav Toggle */
const navToggle = document.querySelector('.header__mobile-toggle--nav');
const nav = document.querySelector('.header__nav');
const bagToggle = document.querySelector('.header__mobile-toggle--bag');
const searchToggle = document.querySelector('.header__mobile-toggle--search');
const iconHam = document.querySelector('.header__mobile-icon--ham');
const iconX = document.querySelector('.header__mobile-icon--x');

const openNav = () => {
  nav.setAttribute('data-open', 'true');
  bagToggle?.setAttribute('data-visible', 'false');
  searchToggle?.setAttribute('data-visible', 'false');
  iconHam?.setAttribute('data-visible', 'false');
  iconX?.setAttribute('data-visible', 'true');
};

const closeNav = () => {
  nav.removeAttribute('data-open');
  bagToggle?.removeAttribute('data-visible');
  searchToggle?.removeAttribute('data-visible');
  iconX?.setAttribute('data-visible', 'false');
  iconHam?.removeAttribute('data-visible');
};

navToggle?.addEventListener('click', () => {
  const isOpen = nav.hasAttribute('data-open');
  isOpen ? closeNav() : openNav();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.hasAttribute('data-open')) {
    closeNav();
  }
});

/* || Nav Nested Toggle */
document.querySelectorAll('.header__nav-toggle').forEach(toggle => {
  let isAnimating = false;

  toggle.addEventListener('click', () => {
    if (isAnimating) return;            // lock spam-clicks
    const item   = toggle.closest('.header__nav-item');
    const nested = item.querySelector('.header__nav-list--nested');
    const isOpen = nested.getAttribute('data-open') === 'true';

    isAnimating = true;

    if (!isOpen) {
      // === OPEN ===
      // 1) measure height
      const fullH = nested.scrollHeight + 'px';
      // 2) apply attributes & inline height
      nested.style.height      = fullH;
      nested.setAttribute('data-open',   'true');
      toggle.setAttribute('data-active', 'true');

      // 3) when transition ends, clean up
      nested.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'height') return;
        nested.style.height = 'auto';      // remove fixed height
        isAnimating = false;
        nested.removeEventListener('transitionend', handler);
      });

    } else {
      // === CLOSE ===
      // 1) set height to current (needed for transition from px → 0)
      nested.style.height = nested.scrollHeight + 'px';
      // force reflow so the browser registers the start height
      nested.offsetHeight;
      // 2) collapse
      nested.style.height = '0';
      nested.removeAttribute('data-open');
      toggle.removeAttribute('data-active');

      nested.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'height') return;
        isAnimating = false;
        nested.removeEventListener('transitionend', handler);
      });
    }
  });
});