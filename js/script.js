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


document.addEventListener('DOMContentLoaded', () => {
  const isInlineOnly = (element) => {
    return Array.from(element.childNodes).every(node => {
      if (node.nodeType === Node.TEXT_NODE) return true;
      if (node.nodeType === Node.ELEMENT_NODE) {
        const display = window.getComputedStyle(node).display;
        return display === 'inline' || display === 'inline-block';
      }
      return false;
    });
  };

  document.querySelectorAll('div').forEach(div => {
    if (isInlineOnly(div)) {
      const span = document.createElement('span');

      // Copy attributes
      Array.from(div.attributes).forEach(attr => {
        span.setAttribute(attr.name, attr.value);
      });

      // Move children
      while (div.firstChild) {
        span.appendChild(div.firstChild);
      }

      div.replaceWith(span);
    }
  });
});