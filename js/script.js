document.addEventListener("DOMContentLoaded", function () {
  const box = document.querySelector(".test");
  const button = document.querySelector(".test__button");

  if (box && button) {
    button.addEventListener("click", function () {
      box.classList.toggle("active");
    });
  }
});
