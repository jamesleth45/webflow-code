
const el = document.querySelector('.w-commerce-commercecartopenlinkcount');

if (el) {
  const wrapCount = () => {
    const raw = el.textContent.trim();

    if (!raw.startsWith('(') && !raw.startsWith(' (') && !raw.startsWith('\u00a0(')) {
      el.innerHTML = `&nbsp;(${raw})`;
    }
  };

  const observer = new MutationObserver(wrapCount);
  observer.observe(el, { childList: true, subtree: true });

  wrapCount(); // run once on load
}
// #endregion