// TEST TOGGLE FUNCTION
document.addEventListener("DOMContentLoaded", () => {
  const testEl = document.querySelector(".test");
  const toggleEl = document.querySelector(".test__toggle");

  if (testEl && toggleEl) {
    testEl.addEventListener("click", () => {
      toggleEl.style.display = toggleEl.style.display === "none" ? "block" : "none";
    });
  }
});