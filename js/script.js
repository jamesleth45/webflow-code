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

// #region Header nested lists toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.header__nav-btn');

  toggles.forEach(toggle => {
    let isAnimating = false;

    toggle.addEventListener('click', () => {
      if (isAnimating) return;

      const panel = toggle.nextElementSibling;
      const isOpen = toggle.getAttribute('data-active') === 'true';

      if (!panel?.classList.contains('header__nav-list--nested')) return;

      isAnimating = true;

      if (isOpen) {
        toggle.removeAttribute('data-active');
        panel.style.height = `${panel.scrollHeight}px`;
        requestAnimationFrame(() => {
          panel.style.height = '0px';
        });
        panel.removeAttribute('data-open');
        panel.addEventListener(
          'transitionend',
          () => {
            panel.style.removeProperty('height');
            isAnimating = false;
          },
          { once: true }
        );
      } else {
        document.querySelectorAll('.header__nav-btn').forEach(t => {
          t.removeAttribute('data-active');
          const p = t.nextElementSibling;
          if (p?.classList.contains('header__nav-list--nested')) {
            p.removeAttribute('data-open');
            p.style.removeProperty('height');
          }
        });

        toggle.setAttribute('data-active', 'true');
        panel.setAttribute('data-open', 'true');
        panel.style.height = `${panel.scrollHeight}px`;
        panel.addEventListener(
          'transitionend',
          () => {
            panel.style.removeProperty('height');
            isAnimating = false;
          },
          { once: true }
        );
      }
    });
  });
});
// #endregion
