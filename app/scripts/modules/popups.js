import { loadMap, initMap, isLoadedPopupMap } from "./popup-map.js";
import { lockScroll, unlockScroll } from "../utils/scroll-lock.js";
import { isLoaded } from "./map.js";

import { Fancybox } from "@fancyapps/ui";

import { popupGallerySlider, swiperThumbs, swiperMain } from "./sliders.js";

export let isOpenMapPopup = false;

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
        if (popup_id === "popup-map") {
          !isLoadedPopupMap && !isLoaded ? loadMap() : initMap();
          isOpenMapPopup = true;
        }
        if (popup_id === "popup-apartment") {
          generateSlides(popup_id, item);
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
          isOpenMapPopup = false;
          if (item.id === "popup-apartment") {
            setTimeout(() => {
              swiperThumbs?.destroy();
              swiperMain?.destroy();
            }, 300);
          }
        }
      });
    });
  }
}

function generateSlides(id, btn) {
  const popupSliderThumbs = document.querySelector(".popup-apartment .slider-apartment__thumbs .swiper-wrapper");
  popupSliderThumbs.innerHTML = "";
  const popupSliderMain = document.querySelector(".popup-apartment .slider-apartment__main .swiper-wrapper");
  popupSliderMain.innerHTML = "";
  const apartmentsCard = btn.closest(".apartments-card");
  document.querySelector(`#${id}`).querySelector(".content").innerHTML = apartmentsCard.querySelector(".apartments-card__title").innerHTML;
  const images = apartmentsCard.querySelectorAll(".apartments-card__slider img");
  if (images.length > 0) {
    [...images].forEach((img) => {
      document.querySelector(`#${id} .slider-apartment__thumbs .swiper-wrapper`).insertAdjacentHTML(
        "beforeend",
        `
          <div class="swiper-slide">
            <div class="slider-apartment__image image-ibg">
                <img src="${img.src}" alt="${img.alt}" />
            </div>
          </div>
        `
      );
      document.querySelector(`#${id} .slider-apartment__main .swiper-wrapper`).insertAdjacentHTML(
        "beforeend",
        `
          <div class="swiper-slide">
            <a href="${img.src}" class="slider-apartment__image image-ibg" data-fancybox="apartment-gallery">
              <img src="${img.src}" alt="${img.alt}" />
            </a>
          </div>
        `
      );
    });
  }
  Fancybox.bind("[data-fancybox='apartment-gallery']", {
    Hash: false,
    Image: {
      wheel: "slide",
    },
  });
  // Инициализируем слайдер
  popupGallerySlider();
}
