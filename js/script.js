document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = ['w-inline-block', 'w--current', 'w-embed'];

  function removeClasses() {
    classesToRemove.forEach(cls => {
      document.querySelectorAll(`.${cls}`).forEach(el => {
        el.classList.remove(cls);
      });
    });

    // Keep removing `w--current` for a short time in case Webflow re-adds it
    requestAnimationFrame(() => requestAnimationFrame(removeClasses));
  }

  removeClasses();
});