// TEST INTERACTION v2
document.addEventListener("DOMContentLoaded", () => {
  const toggleEl = document.querySelector(".test__toggle");

  if (toggleEl) {
    toggleEl.addEventListener("click", () => {
      toggleEl.style.backgroundColor = "#00cc66";
      toggleEl.innerText = "✅ You clicked me!";
    });
  }
});