import { maskPhone } from "../utils/mask-phone.js";

maskPhone();

// Показ / скрытие пароля
const fieldPassword = document.querySelectorAll(".field-password");
if (fieldPassword) {
  fieldPassword.forEach((field) => {
    const input = field.querySelector(".form-input");
    const btnPassword = field.querySelector(".btn-password");
    if (btnPassword) {
      btnPassword.addEventListener("click", () => {
        input?.setAttribute("type", `${input.type === "password" ? "text" : "password"}`);
        input.type === "password" ? input.blur() : input.focus();
      });
    }
  });
}

const inputsNumber = document.querySelectorAll(".form-input-number");
if (inputsNumber) {
  inputsNumber.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
      const currentInput = input,
        nextInput = input.nextElementSibling,
        prevInput = input.previousElementSibling;
      if (currentInput.value.length > 1) {
        currentInput.value = "";
        return;
      }
      if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }
      if (e.key === "Backspace") {
        inputsNumber.forEach((input2, index2) => {
          if (index1 <= index2 && prevInput) {
            input2.setAttribute("disabled", true);
            currentInput.value = "";
            prevInput.focus();
          }
        });
      }
    });
  });
}

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // display.textContent = minutes + ':' + seconds;
    display.textContent = seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.addEventListener("load", () => {
  inputsNumber[0]?.focus();
  let oneMinutes = 59,
    display = document.querySelector(".code-auth__time span");
  if (display) {
    startTimer(oneMinutes, display);
  }
});
