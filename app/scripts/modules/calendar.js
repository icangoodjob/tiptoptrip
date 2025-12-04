import { Calendar } from "vanilla-calendar-pro";

const device = window.innerWidth >= 1024 ? "desktop" : "mobile";

const calendarOptions = (device) => {
  if (device === "desktop") {
    return {
      layouts: {
        multiple: `
          <div class="vc-container">
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
            <div class="vc-body">
              <div class="vc-grid" data-vc="grid">
                <#Multiple>
                  <div class="vc-column" data-vc="column" role="region">
                    <div class="vc-header" data-vc="header">
                      <div class="vc-controls" data-vc="controls" role="toolbar" aria-label="Навигация">
                        <#ArrowPrev [month] />
                        <#ArrowNext [month] />
                      </div>
                      <div class="vc-header-content" data-vc-header="content">
                        <#Month />
                        <#Year />
                      </div>
                    </div>
                    <div class="vc-wrapper" data-vc="wrapper">
                      <#WeekNumbers />
                      <div class="vc-content" data-vc="content">
                        <#Week />
                        <#Dates />
                      </div>
                    </div>
                  </div>
                <#/Multiple>
                <#DateRangeTooltip />
              </div>
            </div>
            <div class="vc-footer">
              <div class="vc-footer__buttons">
                <button class="vc-button vc-button-reset btn btn--border" id="vc-button-reset" type="button">Сбросить</button>
                <button class="vc-button vc-button-apply btn btn--primary" id="vc-button-apply" type="button">Применить</button>
              </div>
            </div>
          </div>
        <#ControlTime />
      `,
      },
    };
  } else {
    return {
      layouts: {
        multiple: `
          <div class="vc-container">
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
            <div class="vc-body">
              <div class="vc-header" data-vc="header">
                <div class="vc-controls" data-vc="controls" role="toolbar" aria-label="Навигация">
                  <#ArrowPrev [month] />
                  <#ArrowNext [month] />
                </div>
                <div class="vc-header-content" data-vc-header="content">
                  <#Month />
                  <#Year />
                </div>
              </div>
              <div class="vc-grid" data-vc="grid">
                <div class="vc-wrapper" data-vc="wrapper">
                  <#WeekNumbers />
                  <div class="vc-content" data-vc="content">
                    <#Week />
                    <#Dates />
                  </div>
                </div>
                <#DateRangeTooltip />
              </div>
            </div>
            <div class="vc-footer">
              <div class="vc-footer__buttons">
                <button class="vc-button vc-button-reset btn btn--border" id="vc-button-reset" type="button">Сбросить</button>
                <button class="vc-button vc-button-apply btn btn--primary" id="vc-button-apply" type="button">Применить</button>
              </div>
            </div>
          </div>
          <#ControlTime />
        `,
      },
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
}

function transformationChoices(arrDates) {
  const calendarChoices = document.querySelector("[data-vc-choices]");
  if (calendarChoices) {
    arrDates.length > 0 ? calendarChoices.classList.add("active") : calendarChoices.classList.remove("active");
    console.log("calendarChoices", calendarChoices);
  }
}

const options = {
  locale: "ru",
  type: "multiple",
  displayMonthsCount: 2,
  monthsToSwitch: 2,
  displayDatesOutside: false,
  disableDatesPast: true,
  enableEdgeDatesOnly: true,
  selectionDatesMode: "multiple-ranged",
  ...opts,
  onClickDate(self) {
    const selectedDates = self.context.selectedDates;
    console.log(selectedDates);
    setDateValues(selectedDates);
    transformationChoices(selectedDates);
  },
};

// Переменная для хранения экземпляра календаря
let currentCalendar = null;

let currentButton = null;

// Контейнер для календаря
const calendarPopup = document.getElementById("calendar-popup");

// Функция для показа календаря
function showCalendar(button) {
  // Вызываем функцию закрытия календаря
  hideCalendar();

  // Запоминаем текущую кнопку
  currentButton = button;

  if (!currentCalendar) {
    currentCalendar = new Calendar(calendarPopup, options);
    currentCalendar.init();
  } else {
    // Не обновляем, если нужно сохранить выделение у выбранного диапазона дат
    // currentCalendar.update();
  }

  // Позиционируем относительно кнопки
  const rect = button.getBoundingClientRect();

  calendarPopup.style.top = `${rect.bottom + window.scrollY + 5}px`;
  calendarPopup.style.left = `${rect.left + window.scrollX}px`;

  calendarPopup.style.display = "block";

  const vcButtonReset = document.getElementById("vc-button-reset");

  const vcButtonApply = document.getElementById("vc-button-apply");

  if (vcButtonReset) {
    vcButtonReset.addEventListener("click", () => {
      currentCalendar.context.selectedDates = [];
      resetValues();
    });
  }

  if (vcButtonApply) {
    vcButtonApply.addEventListener("click", () => {
      hideCalendar();
    });
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

  // Удаляем обработчик клика вне календаря
  document.removeEventListener("click", handleClickOutside);
}

const buttons = document.querySelectorAll(".date-picker-button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // e.stopPropagation();

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
  if (calendarPopup && !calendarPopup.contains(target) && currentButton !== target && !currentButton?.contains(target)) {
    hideCalendar();
  }
}
