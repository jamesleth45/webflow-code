// #region Webflow Class Cleanup
document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = ['w-inline-block', 'w-embed'];

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