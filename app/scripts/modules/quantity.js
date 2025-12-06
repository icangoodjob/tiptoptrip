import { getPluralForm } from "../utils/pluralize.js";

const childrenWords = ["ребенок", "детей", "детей"];

const adultsWords = ["взрослый", "взрослых", "взрослых"];

const quantityBlocks = document.querySelectorAll(".form-quantity");

for (const elem of quantityBlocks) {
  const buttonPlus = elem.querySelector(".form-quantity-btn__plus");
  const buttonMinus = elem.querySelector(".form-quantity-btn__minus");
  const input = elem.querySelector(".form-quantity__input");
  parseInt(input.value, 10) === 0 && buttonMinus.setAttribute("disabled", true);
  if (buttonPlus) {
    buttonPlus.addEventListener("click", () => {
      increaseValue(input);
    });
  }
  if (buttonMinus) {
    buttonMinus.addEventListener("click", () => {
      decreaseValue(input);
    });
  }
}

function increaseValue(input) {
  let value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.previousElementSibling.removeAttribute("disabled");
  if (input.name === "quantity_adults") {
    input.value = `${value} ${getPluralForm(value, adultsWords)}`;
  }
  if (input.name === "quantity_children") {
    input.value = `${value} ${getPluralForm(value, childrenWords)}`;
  }
}
function decreaseValue(input) {
  let value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  value === 0 ? input.previousElementSibling.setAttribute("disabled", true) : null;
  if (input.name === "quantity_adults") {
    input.value = `${value} ${getPluralForm(value, adultsWords)}`;
  }
  if (input.name === "quantity_children") {
    input.value = `${value} ${getPluralForm(value, childrenWords)}`;
  }
}
