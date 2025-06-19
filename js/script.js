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
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.header__nav-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const nested = toggle.closest('.header__nav-item')?.querySelector('.header__nav-list--nested');
      if (!nested) return;

      if (nested.dataset.animating === 'true') return;

      const isOpen = nested.hasAttribute('data-open');

      nested.dataset.animating = 'true';

      if (isOpen) {
        // Close
        nested.style.height = `${nested.scrollHeight}px`; // set current height to trigger transition
        requestAnimationFrame(() => {
          nested.style.height = '0px';
        });

        nested.addEventListener('transitionend', function handler() {
          nested.removeAttribute('data-open');
          toggle.removeAttribute('data-active');
          nested.removeAttribute('data-animating');
          nested.removeEventListener('transitionend', handler);
        });
      } else {
        // Open
        nested.setAttribute('data-open', 'true');
        toggle.setAttribute('data-active', 'true');

        nested.style.height = 'auto';
        const fullHeight = nested.scrollHeight;
        nested.style.height = '0px';

        requestAnimationFrame(() => {
          nested.style.height = `${fullHeight}px`;
        });

        nested.addEventListener('transitionend', function handler() {
          nested.style.height = 'auto';
          nested.removeAttribute('data-animating');
          nested.removeEventListener('transitionend', handler);
        });
      }
    });
  });
});