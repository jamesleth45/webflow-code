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

// #region form
document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.form#newsletterForm');
  if (!target) return;

  target.outerHTML = `
    <form class="form" id="newsletterForm" method="post" action="">
      <div class="form__group">
        <label for="email" class="form__label">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          class="form__input" 
          autocomplete="email"
          required
        >
      </div>

      <div class="form__group form__group--consent">
        <label class="form__checkbox-label">
          <input 
            type="checkbox" 
            name="marketingConsent" 
            value="Yes" 
            required 
            class="form__checkbox"
          >
          <span class="form__checkbox-text">
            Subscribe to receive information about James Carter shows, offers, news and events.
          </span>
        </label>
      </div>

      <button type="submit" class="form__submit" type="submit">Register</button>
    </form>

    <div class="form__done" hidden>
      <p>Thank you for signing up.</p>
    </div>
  `;

  const form = document.getElementById('newsletterForm');
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
// #endregion

// #region search
document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.search');
  if (!target) return;

  target.outerHTML = `
    <form action="/search" method="GET" class="search">
      <input 
        type="text" 
        name="q" 
        class="search__input" 
        placeholder="Search" 
        autocomplete="off" 
        required
      >
    </form>
  `;
});
// #endregion

// #region header
document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.header');
  if (!target) return;

  target.outerHTML = `
    <header class="header">
      <div class="header__logo">
        <a href="/" aria-current="page" class="header__logo-link">
          <span class="header__logo-text">James Carter</span>
        </a>
      </div>

      <nav class="header__nav">
        <ul class="header__nav-list header__nav-list--left">
          <li class="header__nav-item">
            <a href="#" class="header__nav-link"><span class="header__nav-text">Shop</span></a>
          </li>
          <li class="header__nav-item header__nav-item--preview">
            <a href="#" class="header__nav-link"><span class="header__nav-text">Spring/Summer 2025 Preview</span></a>
          </li>
          <li class="header__nav-item">
            <a href="#" class="header__nav-link"><span class="header__nav-text">Spring/Summer 2025 Lookbook</span></a>
          </li>
          <li class="header__nav-item header__nav-item--brand">
            <button type="button" class="header__nav-btn">
              <span class="header__nav-text">Brand</span>
            </button>
            <ul class="header__nav-list header__nav-list--nested">
              <li class="header__nav-item">
                <button type="button" class="header__nav-btn"><span class="header__nav-text">About The Brand</span></button>
              </li>
              <li class="header__nav-item">
                <button type="button" class="header__nav-btn"><span class="header__nav-text">Behind The Brand</span></button>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="header__nav-list header__nav-list--right">
          <li class="header__nav-item header__nav-item--search">
            <button type="button" data-target="panelSearch" class="header__nav-btn">
              <span class="header__nav-icon">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.99687 11.4469C9.00683 11.4469 11.4469 9.00683 11.4469 5.99687C11.4469 2.98692 9.00683 0.546875 5.99687 0.546875C2.98692 0.546875 0.546875 2.98692 0.546875 5.99687C0.546875 9.00683 2.98692 11.4469 5.99687 11.4469Z" stroke="currentcolor" stroke-width="1.1" />
                  <path d="M9.5 9.5L14 14" stroke="currentcolor" />
                </svg>
              </span>
            </button>
          </li>
          <li class="header__nav-item">
            <button type="button" data-target="panelCart" class="header__nav-btn">
              <span class="header__nav-text">Bag</span>
            </button>
          </li>
          <li class="header__nav-item">
            <a href="#" class="header__nav-link"><span class="header__nav-text">Log In / Register</span></a>
          </li>
          <li class="header__nav-item">
            <a href="#" class="header__nav-link"><span class="header__nav-text">Client service</span></a>
          </li>
        </ul>
      </nav>

      <div class="header__mobile">
        <button type="button" data-target="panelSearch" class="header__mobile-btn">
          <span class="header__mobile-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9969 16.4469C14.0068 16.4469 16.4469 14.0068 16.4469 10.9969C16.4469 7.98692 14.0068 5.54688 10.9969 5.54688C7.98692 5.54688 5.54688 7.98692 5.54688 10.9969C5.54688 14.0068 7.98692 16.4469 10.9969 16.4469Z" stroke="black" stroke-width="1.1" />
              <path d="M14.5 14.5L19 19" stroke="black" />
            </svg>
          </span>
        </button>

        <button type="button" data-target="panelCart" class="header__mobile-btn">
          <span class="header__mobile-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 7.5H18.5V18.5H5.5V7.5Z" stroke="black" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8V7C14 6.46957 13.7893 5.96086 13.4142 5.58579C13.0391 5.21071 12.5304 5 12 5C11.4696 5 10.9609 5.21071 10.5858 5.58579C10.2107 5.96086 10 6.46957 10 7V8H9V7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7V8H14Z" fill="black" />
            </svg>
          </span>
        </button>

        <button type="button" data-target="panelNav" class="header__mobile-btn header__mobile-btn--nav">
          <span class="header__mobile-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7.5H20M4 16.5H20" stroke="black" />
            </svg>
          </span>
        </button>
      </div>
    </header>
  `;
});
// #endregion