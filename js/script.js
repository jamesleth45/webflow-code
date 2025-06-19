document.addEventListener('DOMContentLoaded', () => {
  /* || Webflow Cleanup */

  ['w-embed', 'w-script'].forEach(className => {
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