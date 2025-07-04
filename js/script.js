// #region Remove All .css Elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.css').forEach(el => el.remove());
});
// #endregion

// #region Webflow Class Cleanup
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const classesToRemove = ['w-inline-block', 'w-embed', 'w--current'];

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

// #region Remove role="list" from all lists
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[role="list"]').forEach(el => {
    el.removeAttribute('role');
  });
});
// #endregion

// #region Replace spacer divs with clean HTML comments
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.i').forEach(el => {
    if (el.innerHTML.trim() === '') {
      const comment = document.createComment('');
      el.replaceWith(comment);
    }
  });
});
// #endregion

// #region Opens nested lists
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.header__nav-btn');

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

// #region Opens nav
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-toggle="nav"]');
  const nav = document.querySelector('.header__nav');
  const btnSearch = document.querySelector('.header__mobile-btn--search');
  const btnBag = document.querySelector('.header__mobile-btn--cart');
  const iconHam = document.querySelector('.header__mobile-icon--ham');
  const iconX = document.querySelector('.header__mobile-icon--x');

  iconX?.setAttribute('data-visible', 'false'); // Ensure X is hidden on load

  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';

    if (!isOpen) {
      nav.setAttribute('data-open', 'true');
      btnSearch?.setAttribute('data-visible', 'false');
      btnBag?.setAttribute('data-visible', 'false');
      iconHam?.setAttribute('data-visible', 'false');
      iconX?.removeAttribute('data-visible');
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    } else {
      nav.removeAttribute('data-open');
      btnSearch?.removeAttribute('data-visible');
      btnBag?.removeAttribute('data-visible');
      iconHam?.removeAttribute('data-visible');
      iconX?.setAttribute('data-visible', 'false');
      document.body.style.overflow = '';
      document.body.style.width = '';
    }
  });
});
// #endregion
