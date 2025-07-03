// #region Remove All .css Elements
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".css").forEach((el) => el.remove());
});
// #endregion

// #region Webflow Class Cleanup
document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const classesToRemove = ["w-inline-block", "w-embed", "w--current"];

      classesToRemove.forEach((className) => {
        document.querySelectorAll(`.${className}`).forEach((el) => {
          el.classList.remove(className);
        });
      });
    });
  });
});
// #endregion

// #region Replace Divs with Spans
document.addEventListener("DOMContentLoaded", () => {
  const classNames = [
    "header__logo-text",
    "header__nav-text",
    "footer__nav-text",
  ];

  classNames.forEach((className) => {
    document.querySelectorAll(`.${className}`).forEach((el) => {
      if (el.tagName === "DIV") {
        const span = document.createElement("span");
        span.className = el.className;
        span.innerHTML = el.innerHTML;
        el.replaceWith(span);
      }
    });
  });
});
// #endregion

// #region Remove role="list" from all lists
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[role="list"]').forEach((el) => {
    el.removeAttribute("role");
  });
});
// #endregion

// #region Replace spacer divs with clean HTML comments
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".i").forEach((el) => {
    if (el.innerHTML.trim() === "") {
      const comment = document.createComment("");
      el.replaceWith(comment);
    }
  });
});
// #endregion