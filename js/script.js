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
  const item   = toggle.closest('.header__nav-item');
  const nested = item.querySelector('.header__nav-list--nested');

  // single named handler factory
  function makeEndHandler(onClose) {
    return function onTransitionEnd(e) {
      if (e.target !== nested || e.propertyName !== 'height') return;
      nested.removeEventListener('transitionend', onTransitionEnd);
      if (!onClose) {
        // after OPEN
        nested.style.height = 'auto';
      } else {
        // after CLOSE
        nested.removeAttribute('data-open');
        toggle.removeAttribute('data-active');
      }
      isAnimating = false;
    };
  }

  toggle.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isOpen = nested.getAttribute('data-open') === 'true';

    if (!isOpen) {
      // ==== OPEN ====
      // 1) prep start-state & attributes
      nested.style.height = '0px';
      nested.setAttribute('data-open', 'true');
      toggle.setAttribute('data-active', 'true');

      // 2) force a reflow (so the next height change actually animates)
      requestAnimationFrame(() => {
        nested.style.height = nested.scrollHeight + 'px';
      });

      // 3) listen once for end
      nested.addEventListener('transitionend', makeEndHandler(false));

    } else {
      // ==== CLOSE ====
      // 1) fix start height, force reflow
      nested.style.height = nested.scrollHeight + 'px';
      requestAnimationFrame(() => {
        // 2) then collapse
        nested.style.height = '0px';
      });

      nested.addEventListener('transitionend', makeEndHandler(true));
    }
  });
});