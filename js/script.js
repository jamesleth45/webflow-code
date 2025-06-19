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