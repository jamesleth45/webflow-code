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

// #region Replace text-only divs with spans
document.addEventListener('DOMContentLoaded', () => {
  const targetClasses = [
    'header__nav-text',
    'footer__nav-text',
    'header__logo-text',
    'panel__close-text'
  ];

  const selector = targetClasses.map(cls => `div.${cls}`).join(', ');
  const divsToReplace = document.querySelectorAll(selector);

  divsToReplace.forEach(div => {
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

// #region Replace icon-only divs with spans
document.addEventListener('DOMContentLoaded', () => {
  const targetClasses = [
    'header__nav-icon',
    'header__mobile-icon',
    'panel__close-icon',
    'footer__nav-icon'
  ];

  const selector = targetClasses.map(cls => `div.${cls}`).join(', ');
  const divsToReplace = document.querySelectorAll(selector);

  divsToReplace.forEach(div => {
    const children = Array.from(div.children);
    const onlyHasSVG = children.length === 1 && children[0].tagName === 'SVG';
    const hasNoChildrenAndNoText = children.length === 0 && div.textContent.trim() === '';
    const isInlineOrInlineBlock = ['inline', 'inline-block'].includes(window.getComputedStyle(div).display);

    if ((onlyHasSVG || hasNoChildrenAndNoText) && isInlineOrInlineBlock) {
      const span = document.createElement('span');

      Array.from(div.attributes).forEach(attr => {
        span.setAttribute(attr.name, attr.value);
      });

      while (div.firstChild) {
        span.appendChild(div.firstChild);
      }

      div.replaceWith(span);
    }
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