import { Calendar } from "vanilla-calendar-pro";

import { lockScroll, unlockScroll } from "../utils/scroll-lock.js";

const device = window.innerWidth >= 1024 ? "desktop" : "mobile";

const calendarOptions = (device) => {
  if (device === "desktop") {
    return {
      layouts: {
        multiple: `
          <div class="vc-choices" data-vc-choices>
            <div class="vc-choices__item">
              <div class="vc-choices__caption">Заезд</div>
              <div class="vc-choices__value" id="vc-value-from"></div>
            </div>
            <div class="vc-choices__item">
              <div class="vc-choices__caption">Выезд</div>
              <div class="vc-choices__value" id="vc-value-to"></div>
            </div>
          </div>
          <div class="vc-grid" data-vc="grid">
            <#Multiple>
              <div class="vc-column" data-vc="column" role="region">
                <div class="vc-header" data-vc="header">
                  <#ArrowPrev [month] />
                  <div class="vc-header-content" data-vc-header="content">
                    <#Month />
                    <#Year />
                  </div>
                  <#ArrowNext [month] />
                </div>
                <div class="vc-wrapper" data-vc="wrapper">
                  <#WeekNumbers />
                  <div class="" data-vc="content">
                    <#Week />
                    <#Dates />
                  </div>
                </div>
              </div>
            <#/Multiple>
            <#DateRangeTooltip />
          </div>
          <div class="vc-footer">
            <div class="vc-footer__buttons">
              <button class="vc-button vc-button-reset btn btn--border" id="vc-button-reset" data-vc-btn-reset type="button">Сбросить</button>
              <button class="vc-button vc-button-apply btn btn--primary" id="vc-button-apply" type="button">Применить</button>
            </div>
          </div>
          <#ControlTime />
        `,
      },
      type: "multiple",
      displayMonthsCount: 2,
    };
  } else {
    return {
      layouts: {
        default: `
            <div class="vc-choices" data-vc-choices>
              <div class="vc-choices__item">
                <div class="vc-choices__caption">Заезд</div>
                <div class="vc-choices__value" id="vc-value-from"></div>
              </div>
              <div class="vc-choices__item">
                <div class="vc-choices__caption">Выезд</div>
                <div class="vc-choices__value" id="vc-value-to"></div>
              </div>
            </div>
            <div class="vc-header" data-vc="header" role="toolbar" aria-label="Навигация">
              <#ArrowPrev [month] />
              <div class="vc-header-content" data-vc-header="content">
                <#Month />
                <#Year />
              </div>
              <#ArrowNext [month] />
            </div>
            <div class="vc-wrapper" data-vc="wrapper">
              <#WeekNumbers />
              <div class="vc-content" data-vc="content">
                <#Week />
                <#Dates />
                <#DateRangeTooltip />
              </div>
            </div>
            <div class="vc-footer">
              <div class="vc-footer__buttons">
                <button class="vc-button vc-button-reset btn btn--border" id="vc-button-reset" data-vc-btn-reset type="button">Сбросить</button>
                <button class="vc-button vc-button-apply btn btn--primary" id="vc-button-apply" type="button">Применить</button>
              </div>
            </div>
            <#ControlTime />
          `,
      },
      type: "default",
      displayMonthsCount: 1,
    };
  }
};

const opts = calendarOptions(device);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function setDateValues(arrDates) {
  if (arrDates.length === 0) return;
  // Скрытие инпуты для пробрасывания значений
  const inputDateFrom = document.getElementById("input-date-from");
  const inputDateTo = document.getElementById("input-date-to");
  // Триггеры для вызова экземпляра календаря
  const buttonDateFrom = document.getElementById("button-calendar-date-from");
  const buttonDateTo = document.getElementById("button-calendar-date-to");
  // Поля внутри календаря
  const calendarValueFrom = document.getElementById("vc-value-from");
  const calendarValueTo = document.getElementById("vc-value-to");
  if (buttonDateFrom && calendarValueFrom) {
    buttonDateFrom.textContent = calendarValueFrom.textContent = formatDate(arrDates[0]);
  }
  if (buttonDateTo && calendarValueTo) {
    buttonDateTo.textContent = calendarValueTo.textContent = arrDates.length > 1 ? formatDate(arrDates[1]) : "";
  }
  if (inputDateFrom && inputDateTo) {
    inputDateFrom.value = arrDates[0];
    inputDateTo.value = arrDates.length > 1 ? arrDates[1] : "";
  }
}

function resetValues() {
  // Скрытие инпуты для пробрасывания значений
  const inputDateFrom = document.getElementById("input-date-from");
  const inputDateTo = document.getElementById("input-date-to");
  // Триггеры для вызова экземпляра календаря
  const buttonDateFrom = document.getElementById("button-calendar-date-from");
  const buttonDateTo = document.getElementById("button-calendar-date-to");
  // Поля внутри календаря
  const calendarValueFrom = document.getElementById("vc-value-from");
  const calendarValueTo = document.getElementById("vc-value-to");

  if (inputDateFrom && inputDateTo) {
    inputDateFrom.value = inputDateTo.value = "";
  }
  if (buttonDateFrom && buttonDateTo) {
    buttonDateFrom.textContent = buttonDateTo.textContent = "";
  }
  if (calendarValueFrom && calendarValueTo) {
    calendarValueFrom.textContent = calendarValueTo.textContent = "";
  }
  transformationChoices([]);
  stateActionsButtons([]);
}

const buttons = document.querySelectorAll(".date-picker-button");

function transformationChoices(arrDates) {
  const calendarChoices = document.querySelector("[data-vc-choices]");
  if (calendarChoices) {
    arrDates.length > 0 ? calendarChoices.classList.add("active") : calendarChoices.classList.remove("active");
  }
}

function stateActionsButtons(arrDates) {
  const vcButtonReset = document.getElementById("vc-button-reset");

  const vcButtonApply = document.getElementById("vc-button-apply");

  if (vcButtonApply && vcButtonReset) {
    arrDates.length > 0 ? vcButtonReset.removeAttribute("disabled") : vcButtonReset.setAttribute("disabled", true);
    arrDates.length > 0 ? vcButtonApply.removeAttribute("disabled") : vcButtonApply.setAttribute("disabled", true);
  }
}

const options = {
  // selectedTheme: "dark",
  locale: "ru",
  displayDatesOutside: false,
  disableDatesPast: true,
  enableEdgeDatesOnly: true,
  selectionDatesMode: "multiple-ranged",
  // monthsToSwitch: 2,
  ...opts,
  onClickDate(self) {
    const selectedDates = self.context.selectedDates;
    setDateValues(selectedDates);
    transformationChoices(selectedDates);
    stateActionsButtons(selectedDates);
  },
};

// Переменная для хранения экземпляра календаря
let currentCalendar = null;

let currentButton = null;

// Контейнер для календаря
const calendarPopup = document.getElementById("calendar-popup");

function removeActiveButtons() {
  const activeButtons = document.querySelectorAll(".date-picker-button.active");
  if (activeButtons.length > 0) {
    activeButtons.forEach((btn) => btn.classList.remove("active"));
  }
}

function removeActiveCalendarContainer() {
  const activeCalendarContainer = document.querySelectorAll(".calendar-container.active");
  if (activeCalendarContainer.length > 0) {
    activeCalendarContainer.forEach((elem) => elem.classList.remove("active"));
  }
}

// Функция для показа календаря
function showCalendar(button) {
  // Вызываем функцию закрытия календаря
  hideCalendar();

  // Запоминаем текущую кнопку
  currentButton = button;

  [...buttons].forEach((btn) => btn.classList.remove("active"));

  button.classList.add("active");

  // Находим родительский .custom-select
  const customSelect = button.closest(".custom-select");
  if (!customSelect) return;

  // Проверяем, есть ли уже контейнер
  let calendarContainer = customSelect.querySelector(".calendar-container");

  if (calendarContainer) {
    calendarContainer.classList.add("active");
    calendarContainer.appendChild(calendarPopup);
  }

  if (!currentCalendar) {
    currentCalendar = new Calendar(calendarPopup, options);
    currentCalendar.init();

    stateActionsButtons(currentCalendar.context.selectedDates);
  } else {
    // Не обновляем, если нужно сохранить выделение у выбранного диапазона дат
    // currentCalendar.update();
  }

  calendarPopup.style.display = "block";

  if (window.innerWidth <= 767) {
    lockScroll();
  }

  // Добавляем обработчик клика вне календаря с небольшой задержкой
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
}

// Функция для скрытия календаря
function hideCalendar() {
  if (calendarPopup) {
    calendarPopup.style.display = "none";
  }

  currentButton = null;

  removeActiveCalendarContainer();

  if (window.innerWidth <= 767) {
    unlockScroll();
  }

  // Удаляем обработчик клика вне календаря
  document.removeEventListener("click", handleClickOutside);
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    // Если календарь уже открыт для этой кнопки - закрываем
    if (currentButton === button && calendarPopup?.style.display === "block") {
      hideCalendar();
    } else {
      showCalendar(button);
    }
  });
});

// Обработчик клика вне календаря
function handleClickOutside(event) {
  const target = event.target;
  // Проверяем, является ли клик частью календаря
  const isCalendarClick = !target.closest(".vc-month") && !target.closest(".vc-year") && !target.closest(".vc-grid") && !target.closest(".vc-header");
  if (calendarPopup && !calendarPopup.contains(target) && currentButton !== target && !currentButton?.contains(target) && isCalendarClick) {
    hideCalendar();
  }
}

document.addEventListener("click", calendarActions);

function calendarActions(e) {
  const target = e.target;
  if (target.closest("#vc-button-reset")) {
    e.stopPropagation();
    const vcDates = e.target.closest("#calendar-popup").querySelectorAll("[data-vc-date]");
    if (vcDates.length > 0) {
      vcDates.forEach((date) => date.removeAttribute("data-vc-date-selected"));
    }
    if (currentCalendar) currentCalendar.context.selectedDates = [];
    resetValues();
  }
  if (target.closest("#vc-button-apply")) {
    e.stopPropagation();
    hideCalendar();
    removeActiveButtons();
  }
  if (target.closest(".btn-save")) {
    target.classList.add("active");
    target.textContent = "Сохранено";
    setTimeout(() => {
      target.classList.remove("active");
      target.textContent = "Сохранить";
    }, 3000);
  }
}
