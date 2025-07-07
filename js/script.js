// #region Remove unwanted Webflow classes
document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = ['w-inline-block', 'w--current', 'w-embed'];

  const cleanClasses = () => {
    classesToRemove.forEach(cls => {
      document.querySelectorAll(`.${cls}`).forEach(el => {
        el.classList.remove(cls);
      });
    });
  };

  cleanClasses();

  new MutationObserver(cleanClasses).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
});
// #endregion

// #region Replace divs with spans
document.addEventListener('DOMContentLoaded', () => {
  const classList = [
    'header__nav-text',
    'footer__nav-text',
    'header__logo-text',
    'panel__close-text'
  ];

  const selector = classList.map(cls => `div.${cls}`).join(', ');
  
  document.querySelectorAll(selector).forEach(div => {
    const span = document.createElement('span');

    Array.from(div.attributes).forEach(attr => {
      span.setAttribute(attr.name, attr.value);
    });

    while (div.firstChild) {
      span.appendChild(div.firstChild);
    }

    div.replaceWith(span);
  });
});
// #endregion

// #region Remove redundant role="list" from native lists
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('ul[role="list"], ol[role="list"]').forEach(el => {
    el.removeAttribute('role');
  });
});
// #endregion

// #region Replace <span class="i"> with <!---->
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('span.i').forEach(el => {
    const comment = document.createComment('');
    el.replaceWith(comment);
  });
});
// #endregion