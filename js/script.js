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
  const nested = toggle
    .closest('.header__nav-item')
    .querySelector('.header__nav-list--nested');

  const makeHandler = closing => {
    const handler = e => {
      if (e.target !== nested || e.propertyName !== 'height') return;
      nested.removeEventListener('transitionend', handler);
      if (!closing) {
        nested.style.height = 'auto';
      } else {
        nested.removeAttribute('data-open');
      }
      isAnimating = false;
    };
    return handler;
  };

  toggle.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isOpen = nested.getAttribute('data-open') === 'true';
    const isTabletOrBelow = window.matchMedia('(max-width: 1279px)').matches;

    if (!isOpen) {
      if (isTabletOrBelow) {
        document.querySelectorAll('.header__nav-list--nested[data-open="true"]').forEach(openEl => {
          if (openEl !== nested) {
            const otherToggle = openEl
              .closest('.header__nav-item')
              .querySelector('.header__nav-toggle');
            openEl.style.height = openEl.scrollHeight + 'px';
            requestAnimationFrame(() => {
              openEl.style.height = '0px';
            });
            openEl.addEventListener('transitionend', e => {
              if (e.target === openEl && e.propertyName === 'height') {
                openEl.removeAttribute('data-open');
              }
            }, { once: true });
            if (otherToggle) {
              otherToggle.removeAttribute('data-active');
            }
          }
        });
      }

      nested.style.height = '0px';
      nested.setAttribute('data-open', 'true');
      toggle.setAttribute('data-active', 'true');
      requestAnimationFrame(() => {
        nested.style.height = nested.scrollHeight + 'px';
      });
      nested.addEventListener('transitionend', makeHandler(false));
    } else {
      nested.style.height = nested.scrollHeight + 'px';
      toggle.removeAttribute('data-active');
      requestAnimationFrame(() => {
        nested.style.height = '0px';
      });
      nested.addEventListener('transitionend', makeHandler(true));
    }
  });
});