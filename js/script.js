document.addEventListener('DOMContentLoaded', () => {
  /* || webflow cleanup */
  ['w-inline-block', 'w-embed', 'w-script', 'w-layout-grid', 'w--current', 'w-inline-block'].forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.classList.remove(className);
    });
  });

  document.querySelectorAll('.css').forEach(el => {
    if (el.classList.length === 1) {
      el.remove();
    }
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.w--current').forEach(el => {
      el.classList.remove('w--current');
    });
  });

  document.querySelectorAll('[class*="list"][role="list"]').forEach(el => {
    el.removeAttribute('role');
  });

  /* || spacer cleanup */
  document.querySelectorAll('.i').forEach(el => {
    if (el.innerHTML.trim() === '') {
      const comment = document.createComment('');
      el.replaceWith(comment);
    }
  });
});

/* || Nav Toggle */
const navToggle = document.querySelector('.header__mobile-toggle--nav');
const nav = document.querySelector('.header__nav');
const bagToggle = document.querySelector('.header__mobile-toggle--bag');
const searchToggle = document.querySelector('.header__mobile-toggle--search');
const iconHam = document.querySelector('.header__mobile-icon--ham');
const iconX = document.querySelector('.header__mobile-icon--x');

function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.width = '';
}

const openNav = () => {
  nav.setAttribute('data-open', 'true');
  bagToggle?.setAttribute('data-visible', 'false');
  searchToggle?.setAttribute('data-visible', 'false');
  iconHam?.setAttribute('data-visible', 'false');
  iconX?.setAttribute('data-visible', 'true');

  document.body.style.overflow = 'hidden';
  document.body.style.width = '100%';
};

const closeNav = () => {
  nav.removeAttribute('data-open');
  bagToggle?.removeAttribute('data-visible');
  searchToggle?.removeAttribute('data-visible');
  iconX?.setAttribute('data-visible', 'false');
  iconHam?.removeAttribute('data-visible');

  unlockScroll();
};

navToggle?.addEventListener('click', () => {
  const isOpen = nav.hasAttribute('data-open');
  isOpen ? closeNav() : openNav();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.hasAttribute('data-open')) {
    closeNav();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1280) {
    unlockScroll();
  }
});

/* || Nav Nested Toggle */
document.querySelectorAll('.header__nav-toggle').forEach(toggle => {
  let isAnimating = false;
  const nested = toggle
    .closest('.header__nav-item')
    .querySelector('.header__nav-list--nested');

  const closeNested = (el, relatedToggle) => {
    el.style.height = el.scrollHeight + 'px'; // Set full height first
    void el.offsetHeight; // Force reflow
    requestAnimationFrame(() => {
      el.style.height = '0px';
    });
    el.addEventListener('transitionend', e => {
      if (e.target === el && e.propertyName === 'height') {
        el.removeAttribute('data-open');
      }
    }, { once: true });
    if (relatedToggle) relatedToggle.removeAttribute('data-active');
  };

  const makeHandler = closing => {
    const handler = e => {
      if (e.target !== nested || e.propertyName !== 'height') return;
      if (closing) {
        nested.removeAttribute('data-open');
      } else {
        nested.style.height = 'auto';
      }
      isAnimating = false;
    };
    return handler;
  };

  toggle.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isOpen = nested.getAttribute('data-open') === 'true';
    const isTabletOrBelow = window.matchMedia('(max-width: 1279px)').matches;

    if (!isOpen) {
      if (isTabletOrBelow) {
        document.querySelectorAll('.header__nav-list--nested[data-open="true"]').forEach(openEl => {
          if (openEl !== nested) {
            const otherToggle = openEl
              .closest('.header__nav-item')
              .querySelector('.header__nav-toggle');
            closeNested(openEl, otherToggle);
          }
        });
      }

      nested.style.height = '0px';
      nested.setAttribute('data-open', 'true');
      toggle.setAttribute('data-active', 'true');

      void nested.offsetHeight; // Force reflow before animating
      requestAnimationFrame(() => {
        nested.style.height = nested.scrollHeight + 'px';
      });

      nested.addEventListener('transitionend', makeHandler(false), { once: true });
    } else {
      nested.style.height = nested.scrollHeight + 'px';
      toggle.removeAttribute('data-active');

      void nested.offsetHeight; // Force reflow
      requestAnimationFrame(() => {
        nested.style.height = '0px';
      });

      nested.addEventListener('transitionend', makeHandler(true), { once: true });
    }
  });
});

/* || Panel Toggle */
const openers = document.querySelectorAll('[data-toggle]');
const panels = document.querySelectorAll('.panel');
const searchInput = document.querySelector('.panel__search-input');
const clearBtn = document.querySelector('.panel__search-clear');
const formInputs = document.querySelectorAll('.panel__form-input');

function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.width = '';
}

function closeAllPanels() {
  panels.forEach(panel => {
    if (!panel.hasAttribute('data-open')) return;

    panel.removeAttribute('data-open');

    const searchField = panel.querySelector('.panel__search-input');
    const searchClear = panel.querySelector('.panel__search-clear');
    if (searchField) searchField.value = '';
    if (searchClear) searchClear.removeAttribute('data-visible');

    setTimeout(() => {
      panel.style.display = 'none';
    }, 500);
  });

  unlockScroll();
}

openers.forEach(opener => {
  opener.addEventListener('click', () => {
    const targetId = opener.getAttribute('data-toggle');
    const targetPanel = document.querySelector(`.panel[data-panel="${targetId}"]`);
    if (!targetPanel) return;

    closeAllPanels();
    targetPanel.style.display = 'block';

    const searchField = targetPanel.querySelector('.panel__search-input');
    if (searchField) searchField.focus();

    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targetPanel.setAttribute('data-open', 'true');
      });
    });
  });
});

document.addEventListener('click', e => {
  const openPanel = document.querySelector('.panel[data-open="true"]');
  if (!openPanel) return;

  const inner = openPanel.querySelector('.panel__inner');
  if (!inner.contains(e.target) && !e.target.closest('[data-toggle]')) {
    closeAllPanels();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAllPanels();
  }
});

panels.forEach(panel => {
  const closeBtn = panel.querySelector('.panel__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeAllPanels();
    });
  }
});

if (searchInput && clearBtn) {
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() !== '') {
      clearBtn.setAttribute('data-visible', 'true');
    } else {
      clearBtn.removeAttribute('data-visible');
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.removeAttribute('data-visible');
    searchInput.focus();
  });
}

formInputs.forEach(input => {
  const label = input.previousElementSibling;
  if (!label || !label.classList.contains('panel__form-label')) return;

  const updateLabel = () => {
    if (input === document.activeElement || input.value.trim() !== '') {
      label.setAttribute('data-active', 'true');
    } else {
      label.removeAttribute('data-active');
    }
  };

  input.addEventListener('focus', updateLabel);
  input.addEventListener('blur', updateLabel);
  input.addEventListener('input', updateLabel);
  updateLabel();
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1280) {
    unlockScroll();
  }
});

/* || Product Accordion Toggle */
document.querySelectorAll('.product__accordion-toggle').forEach(toggle => {
  let isAnimating = false;
  const body = toggle
    .closest('.product__accordion')
    .querySelector('.product__accordion-body');

  const closeBody = (el, relatedToggle) => {
    el.style.height = el.scrollHeight + 'px';
    void el.offsetHeight;
    requestAnimationFrame(() => {
      el.style.height = '0px';
    });
    el.addEventListener('transitionend', e => {
      if (e.target === el && e.propertyName === 'height') {
        el.removeAttribute('data-open');
      }
    }, { once: true });
    if (relatedToggle) relatedToggle.removeAttribute('data-active');
  };

  const makeHandler = closing => {
    return e => {
      if (e.target !== body || e.propertyName !== 'height') return;
      if (closing) {
        body.removeAttribute('data-open');
      } else {
        body.style.height = 'auto';
      }
      isAnimating = false;
    };
  };

  toggle.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isOpen = body.getAttribute('data-open') === 'true';

    if (!isOpen) {
      document.querySelectorAll('.product__accordion-body[data-open="true"]').forEach(openEl => {
        if (openEl !== body) {
          const otherToggle = openEl
            .closest('.product__accordion')
            .querySelector('.product__accordion-toggle');
          closeBody(openEl, otherToggle);
        }
      });

      body.style.height = '0px';
      body.setAttribute('data-open', 'true');
      toggle.setAttribute('data-active', 'true');

      void body.offsetHeight;
      requestAnimationFrame(() => {
        body.style.height = body.scrollHeight + 'px';
      });

      body.addEventListener('transitionend', makeHandler(false), { once: true });
    } else {
      body.style.height = body.scrollHeight + 'px';
      toggle.removeAttribute('data-active');

      void body.offsetHeight;
      requestAnimationFrame(() => {
        body.style.height = '0px';
      });

      body.addEventListener('transitionend', makeHandler(true), { once: true });
    }
  });
});

/* || Force open any accordion marked as open on load */
document.querySelectorAll('.product__accordion-body[data-open="true"]').forEach(body => {
  const toggle = body
    .closest('.product__accordion')
    .querySelector('.product__accordion-toggle');

  body.style.height = body.scrollHeight + 'px';
  toggle.setAttribute('data-active', 'true');
});

document.querySelector('.w-commerce-commercecartcontainerwrapper--cartType-rightSidebar')?.removeAttribute('style');