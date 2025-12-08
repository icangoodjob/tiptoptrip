import { initSliders } from "./modules/sliders.js";

import { hiddenContent } from "./modules/hidden-content.js";

import { galleryReady } from "./modules/gallery.js";

import { initRangeSliders } from "./modules/range-slider.js";

import { DynamicAdapt } from "./modules/dynamic-adapt.js";

import { popups } from "./modules/popups.js";

import "./modules/custom-select.js";

import "./modules/document-actions.js";

import "./modules/calendar.js";

import "./modules/map.js";

import "./modules/sliders.js";

import "./modules/spollers.js";

import "./modules/custom-scrollbar.js";

import "./modules/forms.js";

import "./modules/quantity.js";

import "./modules/menu.js";

import "./modules/show-more.js";

document.addEventListener("DOMContentLoaded", () => {
  galleryReady();

  initSliders();

  initRangeSliders();

  hiddenContent();

  popups();

  // Модуль динамического адаптива
  const dynamicAdapt = new DynamicAdapt("max");
  dynamicAdapt.init();
});

// Смена плейсхолдера в поле поиска
const mediaQuery = window.matchMedia("(max-width: 767px)");

function handleMobileChange(e) {
  const inputElement = document.querySelector(".search-form__input");
  if (!inputElement) return;
  if (e.matches) {
    inputElement.placeholder = "Введите название...";
  } else {
    inputElement.placeholder = "Введите название курорта или отеля";
  }
}

handleMobileChange(mediaQuery);

mediaQuery.addEventListener("change", handleMobileChange);

// Проставление актуальной даты в подвале
let date = new Date().getFullYear();
document.getElementById("year").innerHTML = date;

// Перемещение активного пункта навигации в начало блока
const menuNavigation = document.querySelector(".menu-navigation");
if (menuNavigation) {
  const menuNavigationLinks = menuNavigation.querySelectorAll(".menu-navigation__link");
  if (menuNavigationLinks.length) {
    [...menuNavigationLinks].forEach((link) => {
      if (link.classList.contains("active")) {
        const offset = link.getBoundingClientRect().left - menuNavigation?.getBoundingClientRect().left;
        menuNavigation?.scrollTo(offset, 0);
      }
    });
  }
}

// Обернуть таблицы
// if (window.innerWidth < 768) {
//   let contentTable = document.querySelectorAll(".content table");
//   if (contentTable.length) {
//     contentTable.forEach(function (item) {
//       let tableWrap = document.createElement("div");
//       tableWrap.setAttribute("class", "table-wrap");
//       item.parentNode.insertBefore(tableWrap, item);
//       tableWrap.appendChild(item);
//     });
//   }
// }
