// #region Purge <style>.css Tags
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.css').forEach(el => el.remove());
});
// #endregion

// #region Strip Webflow Utility Classes
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const classesToRemove = ['w-inline-block', 'w-embed', 'w--current', 'w-layout-grid'];

      classesToRemove.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(el => {
          el.classList.remove(className);
        });
      });
    });
  });
});
// #endregion

// #region Replace Divs with Spans
document.addEventListener('DOMContentLoaded', () => {
  const classNames = [
    'header__logo-text',
    'header__nav-text',
    'footer__nav-text',
    'header__nav-icon',
    'footer__nav-icon',
    'panel__close-icon',
    'panel__close-text',
    'search__clear-text',
    'header__mobile-icon'
  ];

  classNames.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      if (el.tagName === 'DIV') {
        const span = document.createElement('span');
        span.className = el.className;
        span.innerHTML = el.innerHTML;
        el.replaceWith(span);
      }
    });
  });
});
// #endregion

// #region Remove role="list" from <ul>/<ol>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[role="list"]').forEach(el => {
    el.removeAttribute('role');
  });
});
// #endregion

// #region Replace Spacer Divs with <!----> Comments
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.i').forEach(el => {
    if (el.innerHTML.trim() === '') {
      const comment = document.createComment('');
      el.replaceWith(comment);
    }
  });
});
// #endregion

// #region Nested List Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.header__nav-button');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const nested = toggle.nextElementSibling;
      const isOpen = nested.getAttribute('data-open') === 'true';

      document.querySelectorAll('.header__nav-list--nested[data-open="true"]').forEach(openList => {
        if (openList !== nested) {
          openList.style.height = `${openList.scrollHeight}px`;
          requestAnimationFrame(() => {
            openList.style.height = '0';
            openList.addEventListener(
              'transitionend',
              () => {
                openList.removeAttribute('style');
                openList.removeAttribute('data-open');
                openList.previousElementSibling?.removeAttribute('data-active');
              },
              { once: true }
            );
          });
        }
      });

      if (!isOpen) {
        nested.style.height = 'auto';
        const height = nested.scrollHeight;
        nested.style.height = '0';

        requestAnimationFrame(() => {
          nested.style.height = `${height}px`;
          nested.setAttribute('data-open', 'true');
          toggle.setAttribute('data-active', 'true');
        });

        nested.addEventListener(
          'transitionend',
          () => {
            nested.style.height = 'auto';
          },
          { once: true }
        );
      } else {
        nested.style.height = `${nested.scrollHeight}px`;

        requestAnimationFrame(() => {
          nested.style.height = '0';
          nested.addEventListener(
            'transitionend',
            () => {
              nested.removeAttribute('style');
              nested.removeAttribute('data-open');
              toggle.removeAttribute('data-active');
            },
            { once: true }
          );
        });
      }
    });

    toggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });
});
// #endregion

// #region Main Nav Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-toggle="nav"]');
  const nav = document.querySelector('.header__nav');
  const btnSearch = document.querySelector('.header__mobile-button--search');
  const btnBag = document.querySelector('.header__mobile-button--cart');
  const iconHam = document.querySelector('.header__mobile-icon--ham');
  const iconX = document.querySelector('.header__mobile-icon--x');

  let navWasOpen = false;

  const isOpen = () => nav.getAttribute('data-open') === 'true';

  const setVisible = (el, visible) => {
    if (!el) return;
    visible ? el.removeAttribute('data-visible') : el.setAttribute('data-visible', 'false');
  };

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    if (!document.body.getAttribute('style')?.trim()) {
      document.body.removeAttribute('style');
    }
  };

  setVisible(iconX, false);

  const openNav = () => {
    nav.setAttribute('data-open', 'true');
    setVisible(btnSearch, false);
    setVisible(btnBag, false);
    setVisible(iconHam, false);
    setVisible(iconX, true);
    lockScroll();
  };

  const closeNav = () => {
    nav.removeAttribute('data-open');
    setVisible(btnSearch, true);
    setVisible(btnBag, true);
    setVisible(iconHam, true);
    setVisible(iconX, false);
    unlockScroll();
  };

  toggle.addEventListener('click', () => {
    isOpen() ? closeNav() : openNav();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
      if (isOpen()) navWasOpen = true;
      nav.removeAttribute('data-open');
      unlockScroll();
    } else {
      if (navWasOpen) {
        nav.setAttribute('data-open', 'true');
        lockScroll();
        navWasOpen = false;
      }
    }
  });
});
// #endregion
