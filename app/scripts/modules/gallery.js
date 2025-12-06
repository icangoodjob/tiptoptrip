import { Fancybox } from "@fancyapps/ui";

export const galleryReady = () => {
  // Fancybox
  Fancybox.bind("[data-fancybox]", {
    groupAll: true,
    placeFocusBack: false,
    Hash: false,
    Image: {
      wheel: "slide",
    },
  });
  Fancybox.bind("[data-fancybox='main-gallery']", {
    groupAll: true,
    placeFocusBack: false,
    Hash: false,
    Image: {
      wheel: "slide",
    },
  });
  // Исправить баг с дублированием изображений в фенсибоксе, если свипер бесконечный
  let fancyboxInSlider = document.querySelectorAll(".swiper-slide-duplicate [data-fancybox]");
  if (fancyboxInSlider.length > 0) {
    fancyboxInSlider.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        let href = item.getAttribute("href");
        item
          .closest(".swiper")
          .querySelector(".swiper-slide:not(.swiper-slide-duplicate) [data-fancybox][href='" + href + "']")
          .click();
      });
    });
  }
};
