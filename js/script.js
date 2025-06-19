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

/* || Nav Sub Toggle */
const navToggles = document.querySelectorAll('.header__nav-toggle');

navToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const item = toggle.closest('.header__nav-item');
    const nestedList = item?.querySelector('.header__nav-list--nested');
    const isActive = toggle.hasAttribute('data-active');

    // Close all other toggles and collapse their lists
    document.querySelectorAll('.header__nav-toggle[data-active]').forEach(t => {
      t.removeAttribute('data-active');
    });

    document.querySelectorAll('.header__nav-list--nested[data-open]').forEach(list => {
      list.style.height = `${list.scrollHeight}px`; // lock current height to allow transition
      requestAnimationFrame(() => {
        list.style.height = '0px';
      });
      list.removeAttribute('data-open');
    });

    // If this toggle was already active, we're done (closing)
    if (isActive) return;

    // Open this toggle
    toggle.setAttribute('data-active', 'true');
    nestedList?.setAttribute('data-open', 'true');
    nestedList?.style.setProperty('height', `${nestedList.scrollHeight}px`);
  });
});

// Optional: clear inline height after transition ends to re-enable auto responsiveness
document.querySelectorAll('.header__nav-list--nested').forEach(list => {
  list.addEventListener('transitionend', () => {
    if (list.hasAttribute('data-open')) {
      list.style.height = 'auto';
    }
  });
});