const menuCategory = document.querySelector(".menu-category");
const headerMenu = document.querySelector(".menu");

function menuActions(e) {
  const target = e.target;
  if (target === menuCategory || menuCategory?.contains(target)) {
    return;
  }
  if (target.closest(".header__btn-select")) {
    target.classList.toggle("active");
    menuCategory?.classList.toggle("active");
  }
  if (!menuCategory || !target.closest(".header__btn-select")) {
    document.querySelector(".header__btn-select")?.classList.remove("active");
    menuCategory?.classList.remove("active");
  }
  if (target.closest(".header__burger")) {
    target.classList.toggle("active");
    headerMenu?.classList.toggle("active");
    document.body.classList.toggle("lock");
  }
}

document.addEventListener("click", menuActions);

// Динамические данные в меню
const removeActiveClassLinks = () => {
  const categoryLinksActive = document.querySelectorAll(".menu-group__link.active");
  categoryLinksActive.forEach((link) => link.classList.remove("active"));
};
const categoryLinks = document.querySelectorAll(".menu-group__link");
if (categoryLinks.length) {
  categoryLinks.forEach((link, index) => {
    const subList = link.nextElementSibling;
    if (subList) {
      link.classList.add("expanded");
    }
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (subList && window.innerWidth > 1024) {
        removeActiveClassLinks();
        link.classList.add("active");
        const dynamicBoxWrapper = menuCategory.querySelector(".dynamic-items");
        dynamicBoxWrapper.classList.add("fade-out");
        setTimeout(() => {
          // Заменяем содержимое
          dynamicBoxWrapper.innerHTML = subList !== null ? subList.innerHTML : "";

          dynamicBoxWrapper.classList.remove("fade-out");
          dynamicBoxWrapper.classList.add("fade-in");

          setTimeout(() => {
            dynamicBoxWrapper.classList.remove("fade-in");
          }, 300);
        }, 300);
      }
    });
  });
  if (window.innerWidth > 1024) {
    categoryLinks[0].click();
  }
}
