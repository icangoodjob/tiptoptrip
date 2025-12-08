// Показ/Скрытие кнопки "Показать ещё" в зависимости о тколичества элементов
const formGroups = document.querySelectorAll(".filter.extended-filter .form-group");
if (formGroups.length) {
  formGroups.forEach((group) => {
    const checkboxes = group.querySelectorAll(".base-checkbox");
    if (checkboxes.length) {
      const btnShow = group.querySelector(".btn-show-more");
      if (btnShow) {
        btnShow.style.display = checkboxes.length < 6 ? "none" : "flex";
        btnShow.addEventListener("click", () => {
          group.classList.toggle("active");
          btnShow.style.display = "none";
        });
      }
    }
  });
}
