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
  const isTextOnlyDiv = (el) => {
    return Array.from(el.childNodes).every(node => {
      return (
        node.nodeType === Node.TEXT_NODE ||
        (node.nodeType === Node.ELEMENT_NODE &&
         ['inline', 'inline-block'].includes(window.getComputedStyle(node).display))
      );
    });
  };

  document.querySelectorAll('div').forEach(div => {
    if (isTextOnlyDiv(div)) {
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

// #region Replace icon-only divs with spans
document.addEventListener('DOMContentLoaded', () => {
  const isIconDiv = (el) => {
    const children = Array.from(el.children);
    const onlyHasSVG = children.length === 1 && children[0].tagName === 'SVG';
    const hasNoChildrenAndNoText = children.length === 0 && el.textContent.trim() === '';
    const isInlineOrInlineBlock = ['inline', 'inline-block'].includes(window.getComputedStyle(el).display);
    
    return (onlyHasSVG || hasNoChildrenAndNoText) && isInlineOrInlineBlock;
  };

  document.querySelectorAll('div').forEach(div => {
    if (isIconDiv(div)) {
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

// #region Replace class="i"> with HTML comment
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('span.i').forEach(el => {
    const comment = document.createComment(' spacer ');
    el.replaceWith(comment);
  });
});
// #endregion