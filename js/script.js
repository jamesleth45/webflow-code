document.addEventListener('DOMContentLoaded', () => {
  /* || Webflow Cleanup */

  ['w-inline-block', 'w-embed', 'w-script', 'w-layout-grid'].forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.classList.remove(className);
    });
  });

  document.querySelectorAll('.css').forEach(el => {
    if (el.classList.length === 1) {
      el.remove();
    }
  });
});