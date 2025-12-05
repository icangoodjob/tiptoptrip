import { lockScroll, unlockScroll } from "../utils/scroll-lock.js";

const openFilter = () => {
  const filter = document.querySelector(".filter");
  if (filter) {
    filter.classList.add("active");
    lockScroll();
  }
};

const closeFilter = () => {
  const filter = document.querySelector(".filter");
  if (filter) {
    filter.classList.remove("active");
    unlockScroll();
  }
};

const openSorting = () => {
  const sortingBlock = document.querySelector(".sorting");
  if (sortingBlock) {
    sortingBlock.classList.toggle("active");
  }
};

const documentActions = (e) => {
  const target = e.target;
  //   Сортировка
  if (target.closest(".sorting__item")) {
    const sortingItems = document.querySelectorAll(".sorting__item.active");
    const sortingBlock = target.closest(".sorting");
    if (sortingItems) {
      sortingItems.forEach((item) => item.classList.remove("active"));
    }
    target.classList.add("active");
    sortingBlock?.classList.remove("active");
    // const dataSort = target.classList.contains("active") && target.dataset.sort === "ASC" ? "DESC" : "ASC";
    // target.dataset.sort = dataSort;
  }
  // Добаление класса кнопке "Добавить в избранное"
  if (target.classList.contains("favorite-button")) {
    e.stopPropagation();
    e.preventDefault();
    const favoriteButton = target.closest(".favorite-button");
    favoriteButton.classList.toggle("favorite-button--active");
  }
  if (target.closest(".btn-filter")) {
    openFilter();
  }
  if (target.closest(".filter__wrapper")) {
    e.stopPropagation();
  }
  if (target.matches(".filter__close") || target.matches(".filter")) {
    closeFilter();
  }
  if (target.closest(".jsObjectBoxClose")) {
    const parentBox = target.closest(".map-section__object-box ");
    parentBox && parentBox.remove();
  }
  if (target.closest(".sorting-button")) {
    openSorting();
  }
  if (target.closest(".main-card__favorite-btn") || target.closest(".main-card__share-btn")) {
    target.classList.toggle("active");
  }
};

document.addEventListener("click", documentActions);
