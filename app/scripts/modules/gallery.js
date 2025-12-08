import { Fancybox } from "@fancyapps/ui";

export const galleryReady = () => {
  // Fancybox
  Fancybox.bind("[data-fancybox]", {
    // groupAll: true,
    // placeFocusBack: false,
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

  // const buttonsGallery = document.querySelectorAll("[data-button-gallery]");
  // if (buttonsGallery.length > 0) {
  //   buttonsGallery.forEach((btn) => {
  //     const galleryContainer = document.querySelector(".gallery-container");
  //     if (galleryContainer) {
  //       const images = galleryContainer.querySelectorAll("img");
  //       btn.addEventListener("click", () => {
  //         const galleryItems = Array.from(images).map((img) => ({
  //           src: img.src,
  //           thumbSrc: img.src,
  //           // caption: img.alt,
  //         }));
  //         Fancybox.show(galleryItems, {
  //           Hash: true,
  //           placeFocusBack: true,
  //         });
  //       });
  //     }
  //   });
  // }
};
