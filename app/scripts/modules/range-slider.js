import noUiSlider from "nouislider";

export const initRangeSliders = () => {
  const groupItems = document.querySelectorAll(".form-group");
  [...groupItems].forEach((elem) => {
    const slider = elem.querySelector(".range-slider");
    if (slider) {
      let inputMin = elem.querySelector(".range-min"); // Ищем input с меньшим значнием
      let inputMax = elem.querySelector(".range-max"); // Ищем input с большим значнием
      let minValue = parseInt(inputMin.dataset.min, 10);
      let maxValue = parseInt(inputMax.dataset.max, 10);
      let inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
      noUiSlider.create(slider, {
        start: [minValue, maxValue],
        step: 1,
        connect: true,
        range: {
          min: Number(minValue),
          max: Number(maxValue),
        },
      });
      slider.noUiSlider.on("update", function (e) {
        let min = Math.round(e[0]);
        let max = Math.round(e[1]);
        inputMin.value = min;
        inputMax.value = max;
      });
      let setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;
        slider.noUiSlider.set(arr);
      };
      inputs.forEach((el, index) => {
        el.addEventListener("change", (e) => {
          setRangeSlider(index, e.currentTarget.value);
        });
        el.addEventListener("blur", (e) => {
          setRangeSlider(index, e.currentTarget.value);
        });
      });
    }
  });
};
