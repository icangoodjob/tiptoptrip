import { loadMap, isLoadedPopupMap } from "./popup-map.js";
import { lockScroll, unlockScroll } from "../utils/scroll-lock.js";

// Окна
export function popups(elem = document) {
  // Открыть
  let buttonOpenPopup = elem.querySelectorAll("[data-popup-button]");
  if (buttonOpenPopup.length) {
    //buttonOpenPopup = once("popups",buttonOpenPopup);

    buttonOpenPopup.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        let popup_id = item.getAttribute("data-popup-button");
        const currentPopup = elem.getElementById(popup_id);
        if (!currentPopup) return;
        currentPopup.classList.add("active");
        lockScroll();
        if (popup_id === "popup-map" && !isLoadedPopupMap) {
          loadMap();
        }
      });
    });
  }
  // Закрыть
  let popup = elem.querySelectorAll(".popup");
  if (popup.length < 1 && elem.classList.contains("popup")) {
    popup = [elem];
  }
  if (popup.length) {
    //once("popups",popup);

    popup.forEach(function (item) {
      item.addEventListener("click", function (e) {
        if (e.target.matches(".popup") || e.target.matches(".popup__close")) {
          item.classList.remove("active");
          unlockScroll();
        }
      });
    });
  }
}
