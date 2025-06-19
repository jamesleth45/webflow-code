document.addEventListener('DOMContentLoaded', () => {
  /* || Webflow Cleanup */

  const classesToRemove = ['w-embed', 'w-script'];

  classesToRemove.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.remove();
    });
  });
});