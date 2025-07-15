// #region Remove unwanted Webflow classes
document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = ['w-inline-block', 'w--current', 'w-embed', 'w-layout-grid', 'w--redirected-focus', 'w-script'];

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
    'panel__close-text',
    'panel__close-icon',
    'header__mobile-icon',
    'header__nav-icon',
    'footer__nav-icon',
    'search__clear-text'
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
  document.querySelectorAll('div.i').forEach(el => {
    const comment = document.createComment('');
    el.replaceWith(comment);
  });
});
// #endregion

// #region Remove elements with class .css
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.css').forEach(el => el.remove());
});
// #endregion


// #region Nav Nested Open + Close (separate logic, same listener)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav__btn, .header__nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nested = btn.nextElementSibling;
      if (!nested) return;

      const isOpen = nested.getAttribute('data-state') === 'open';

      if (!isOpen) {
        nested.setAttribute('data-state', 'open');
        nested.style.height = nested.scrollHeight + 'px';
        return;
      }

      nested.style.height = nested.scrollHeight + 'px';
      requestAnimationFrame(() => {
        nested.style.height = '0px';
        nested.removeAttribute('data-state');
      });

      nested.addEventListener('transitionend', () => {
        nested.removeAttribute('style');
      }, { once: true });
    });
  });
});
// #endregion

// #region panel open
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      if (!panel) return;

      panel.setAttribute('data-state', 'open');
    });
  });
});
// #endregion

// #region Panel close
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const panel = e.target.closest('.panel');
    if (!panel) return;

    const inner = panel.querySelector('.panel__inner');
    const isCloseBtn = e.target.matches('.panel__close');
    const clickedOutsideInner = !inner.contains(e.target);

    if (isCloseBtn || clickedOutsideInner) {
      panel.setAttribute('data-state', 'closed');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.panel[data-state="open"]').forEach((panel) => {
        panel.setAttribute('data-state', 'closed');
      });
    }
  });
});
// #endregion

// #region panel scroll lock
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    const isAnyPanelOpen = document.querySelector('.panel[data-state="open"]');
    if (isAnyPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['data-state'],
  });
});
// #endregion

// #region search clear
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.search__input');
  const clearBtn = document.querySelector('.search__clear');

  if (!input || !clearBtn) return;

  input.addEventListener('input', () => {
    clearBtn.hidden = input.value.trim() === '';
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.hidden = true;
    input.focus();
  });

  // optional: initialize state on load
  clearBtn.hidden = input.value.trim() === '';
});
// #endregion

// #region search panel autofocus
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const panel = mutation.target;
      if (
        panel.matches('.panel') &&
        panel.getAttribute('data-state') === 'open'
      ) {
        const input = panel.querySelector('.search__input');
        if (input) input.focus();
      }
    }
  });

  document.querySelectorAll('.panel').forEach((panel) => {
    observer.observe(panel, {
      attributes: true,
      attributeFilter: ['data-state'],
    });
  });
});
// #endregion

// #region adds placeholder to form label
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.form__input').forEach(input => {
    if (input.placeholder === '') {
      input.placeholder = ' ';
    }
  });
});
// #endregion



  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const done = document.querySelector('.form__done');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const res = await fetch('https://formspree.io/f/xpwlzqvw', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (res.ok) {
        form.hidden = true;
        done.hidden = false;
      } else {
        alert('Something went wrong. Try again later.');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('div').forEach((div) => {
    const isEmpty = !div.innerHTML.trim();
    const hasNoAttributes = div.attributes.length === 0;

    if (isEmpty && hasNoAttributes) {
      div.remove();
    }
  });
});

