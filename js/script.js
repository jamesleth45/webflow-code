// #region Remove unwanted Webflow classes
document.addEventListener('DOMContentLoaded', () => {
  const classesToRemove = ['w-inline-block', 'w--current', 'w-embed', 'w-layout-grid', 'w--redirected-focus'];

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

// #region Toggle nested nav
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.header__nav-btn');
  let animating = false;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (animating) return;

      const currentList = button.closest('.header__nav-item')?.querySelector('.header__nav-list--nested');
      const isOpen = currentList?.dataset.open === 'true';

      const openList = document.querySelector('.header__nav-list--nested[data-open="true"]');
      const openBtn = document.querySelector('.header__nav-btn[data-active="true"]');

      const close = (list, btn) => {
        if (!list || !btn) return;
        animating = true;
        const fullHeight = list.scrollHeight;
        list.style.height = `${fullHeight}px`;
        requestAnimationFrame(() => {
          list.style.height = '0px';
        });
        list.addEventListener('transitionend', function handler() {
          list.removeAttribute('data-open');
          list.style.removeProperty('height');
          if (!list.getAttribute('style')) list.removeAttribute('style');
          list.removeEventListener('transitionend', handler);
          animating = false;
        });
        btn.removeAttribute('data-active');
      };

      const open = (list, btn) => {
        if (!list || !btn) return;
        animating = true;
        const fullHeight = list.scrollHeight;
        list.style.height = '0px';
        requestAnimationFrame(() => {
          list.setAttribute('data-open', 'true');
          list.style.height = `${fullHeight}px`;
        });
        list.addEventListener('transitionend', function handler() {
          list.style.height = 'auto';
          list.removeEventListener('transitionend', handler);
          animating = false;
        });
        btn.setAttribute('data-active', 'true');
      };

      if (isOpen) {
        close(currentList, button);
      } else {
        if (openList && openList !== currentList) close(openList, openBtn);
        open(currentList, button);
      }
    });
  });
});
// #endregion

// #region Toggle menu nav
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.header__mobile-btn--menu');
  const nav = document.querySelector('.header__nav');
  const searchBtn = document.querySelector('.header__mobile-btn--search');
  const cartBtn = document.querySelector('.header__mobile-btn--cart');
  const iconOpen = document.querySelector('.header__mobile-icon--open');
  const iconClose = document.querySelector('.header__mobile-icon--close');

  let userOpenedMenu = false;

  const openMenu = () => {
    nav.setAttribute('data-open', 'true');
    searchBtn?.setAttribute('data-visible', 'false');
    cartBtn?.setAttribute('data-visible', 'false');
    iconOpen?.setAttribute('data-visible', 'false');
    iconClose?.setAttribute('data-visible', 'true');
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
    userOpenedMenu = true;
  };

  const closeMenu = () => {
    nav.removeAttribute('data-open');
    searchBtn?.removeAttribute('data-visible');
    cartBtn?.removeAttribute('data-visible');
    iconOpen?.removeAttribute('data-visible');
    iconClose?.setAttribute('data-visible', 'false');
    document.body.style.overflow = '';
    document.body.style.width = '';
    if (!document.body.getAttribute('style')) {
      document.body.removeAttribute('style');
    }
    userOpenedMenu = false;
  };

  menuBtn?.addEventListener('click', () => {
    const isOpen = nav.hasAttribute('data-open');
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.hasAttribute('data-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 1280;

    if (isMobile && userOpenedMenu) {
      nav.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    }

    if (!isMobile) {
      nav.removeAttribute('data-open');
      document.body.style.overflow = '';
      document.body.style.width = '';
      if (!document.body.getAttribute('style')) {
        document.body.removeAttribute('style');
      }
    }
  });
});
// #endregion

// #region Toggle panel
document.addEventListener('DOMContentLoaded', () => {
  const openButtons = document.querySelectorAll('[data-toggle]');
  const panels = document.querySelectorAll('[data-panel]');

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-toggle');
      const panel = document.querySelector(`[data-panel="${id}"]`);
      const inner = panel.querySelector('.panel__inner');
      const content = panel.querySelector('.panel__content');
      const closeBtn = panel.querySelector('.panel__close');
      const input = panel.querySelector('.search__input');

      if (!panel || !inner || !content || !closeBtn) return;

      panel.setAttribute('data-open', 'true');
      inner.setAttribute('data-slide', 'in');
      content.setAttribute('data-visible', 'true');
      closeBtn.setAttribute('data-visible', 'true');
      input?.focus();
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    });
  });

  const closePanel = panel => {
    const inner = panel.querySelector('.panel__inner');
    const content = panel.querySelector('.panel__content');
    const closeBtn = panel.querySelector('.panel__close');
    const input = panel.querySelector('.search__input');
    const clearBtn = panel.querySelector('.search__clear');

    if (!inner || !content || !closeBtn) return;

    inner.removeAttribute('data-slide');
    content.removeAttribute('data-visible');
    closeBtn.removeAttribute('data-visible');

    if (input) input.value = '';
    if (clearBtn) clearBtn.removeAttribute('data-visible');

    setTimeout(() => {
      panel.removeAttribute('data-open');
      document.body.style.overflow = '';
      document.body.style.width = '';
      if (!document.body.getAttribute('style')?.trim()) {
        document.body.removeAttribute('style');
      }
    }, 500);
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      panels.forEach(panel => {
        if (panel.hasAttribute('data-open')) closePanel(panel);
      });
    }
  });

  panels.forEach(panel => {
    panel.addEventListener('click', e => {
      const inner = panel.querySelector('.panel__inner');
      const closeBtn = e.target.closest('.panel__close');
      const clickedOutside = inner && !inner.contains(e.target);

      if (clickedOutside || closeBtn) {
        closePanel(panel);
      }
    });
  });
});
// #endregion

// #region Search clear
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.search__input');
  const clearBtn = document.querySelector('.search__clear');

  if (!input || !clearBtn) return;

  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      clearBtn.setAttribute('data-visible', 'true');
    } else {
      clearBtn.removeAttribute('data-visible');
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.removeAttribute('data-visible');
    input.focus();
  });
});
// #endregion

// #region Search clear
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.form__input').forEach(input => {
    const label = input.closest('form')?.querySelector('.form__label');
    if (!label) return;
    input.addEventListener('focus', () => {
      label.setAttribute('data-active', 'true');
    });
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        label.removeAttribute('data-active');
      }
    });
    if (input.value.trim() !== '') {
      label.setAttribute('data-active', 'true');
    }
  });
});

// #endregion