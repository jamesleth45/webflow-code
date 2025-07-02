// #region Webflow Class Cleanup
document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = [
    'w-inline-block',
    'w-embed'
  ];

  classesToRemove.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.classList.remove(className);
    });
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.w--current').forEach(el => {
      el.classList.remove('w--current');
    });
  });
});
// #endregion

// #region Replace Divs with Spans
document.addEventListener('DOMContentLoaded', () => {
  const classNames = [
    'header__logo-text',
    'header__nav-text',
    'footer__nav-text'
  ];

  classNames.forEach(className => {
    const el = document.querySelector(`.${className}`);
    if (el?.tagName === 'DIV') {
      const span = document.createElement('span');
      span.className = el.className;
      span.innerHTML = el.innerHTML;
      el.replaceWith(span);
    }
  });
});
// #endregion