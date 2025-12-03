import { Calendar } from "vanilla-calendar-pro";

const calendarTriggerMonth = document.querySelector("#calendar-month");

const calendarTriggerYear = document.querySelector("#calendar-year");

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const options = {
  inputMode: false,
  locale: "ru",
  settings: {
    visibility: {
      weekend: false,
      daysOutside: false,
      theme: "light",
    },
  },
};

if (calendarTriggerMonth) {
  const calendarMonth = new Calendar(calendarTriggerMonth, {
    type: "month",
    ...options,
    onClickMonth(self) {
      console.log(self);

      let currentMonth = months[self.context.selectedMonth];
      const selectButton = document.getElementById("button-calendar-month");
      const input = document.getElementById("input-calendar-month");
      if (input && selectButton) {
        selectButton.textContent = currentMonth;
        input.value = currentMonth;
      }
    },
  });
  calendarMonth.init();
}

if (calendarTriggerYear) {
  const calendarYear = new Calendar(calendarTriggerYear, {
    type: "year",
    ...options,
    onClickYear(self) {
      console.log(self);
      let currentYear = self.context.selectedYear;
      const selectButton = document.getElementById("button-calendar-year");
      const input = document.getElementById("input-calendar-year");
      if (input && selectButton) {
        selectButton.textContent = currentYear;
        input.value = currentYear;
      }
    },
  });
  calendarYear.init();
}
