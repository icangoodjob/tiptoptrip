// select
const overlay = document.querySelector(".overlay");

import { normalizeText } from "../utils/normalize-text.js";

const checkSelectValue = () => {
  const selects = document.querySelectorAll(".custom-select");
  [...selects].forEach((elem) => {
    const selectButton = elem.querySelector(".custom-select__btn");
    const selectListItems = elem.querySelectorAll(".select-list__item");
    [...selectListItems].forEach((listItem) => {
      const dataValue = listItem.dataset.value;
      const selectButtonStr = normalizeText(selectButton.textContent);
      const dataValueStr = normalizeText(dataValue);
      if (selectButtonStr !== dataValueStr) return;
      listItem.classList.add("current");
    });
  });
};

checkSelectValue();

const deactivateAllSelects = () => {
  const activeSelectButtons = document.querySelectorAll(".custom-select__btn.active");
  if (activeSelectButtons.length) {
    [...activeSelectButtons].forEach((elem) => {
      elem.classList.remove("active");
    });
  }
};
const handleSelect = (event) => {
  const target = event.target;
  if (target.matches(".custom-select__btn")) {
    if (target.classList.contains("active")) {
      target.classList.remove("active");
    } else {
      deactivateAllSelects();
      target.classList.add("active");
    }
  } else {
    const calendarContainer = document.querySelector(".calendar-container");
    const calendarSelectList = calendarContainer && target.closest(".calendar-container") && !target.matches(".calendar-container > *");
    // if (!calendarSelectList) {
    deactivateAllSelects();
    // }
  }
  if (target.closest(".select-list__item")) {
    const parent = target.closest(".custom-select");
    const selectButton = parent.querySelector(".custom-select__btn");
    const selectInput = parent.querySelector(".custom-select__input");
    if (selectInput) {
      selectInput.value = target.dataset.value;
    }
    if (selectButton) {
      selectButton.textContent = target.dataset.value;
    }
    const currentItems = parent.querySelectorAll(".select-list__item.current");
    currentItems.forEach((item) => item.classList.remove("current"));
    target.classList.add("current");
  }
};

document.addEventListener("click", handleSelect, false);
