// #region Purge .css .search__submit Classes
document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = ['css', 'search__submit'];

  classesToRemove.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => el.remove());
  });
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

// #endregion

// #region Main Nav Toggle

// #endregion

// #region Panel Toggle

// #endregion
