document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = ['w-inline-block', 'w--current', 'w-embed'];

  classesToRemove.forEach(cls => {
    document.querySelectorAll(`.${cls}`).forEach(el => {
      el.classList.remove(cls);
    });
  });
});