document.addEventListener('DOMContentLoaded', () => {
  /* || Remove w-embed & w-script */

  const classesToRemove = ['w-embed', 'w-script'];

  classesToRemove.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.remove();
    });
  });
});