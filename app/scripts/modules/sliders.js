import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar, Thumbs } from "swiper/modules";

const sliderDefaultOptions = {
  watchOverflow: true,
  resizeObserver: true,
  updateOnWindowResize: true,
  // preventInteractionOnTransition: true,
};

export const initSliders = () => {
  const newsSlider = document.querySelector(".main-news__slider");
  if (newsSlider) {
    const sliderButtonPrev = newsSlider.closest(".main-news").querySelector(".slider-button-prev");
    const sliderButtonNext = newsSlider.closest(".main-news").querySelector(".slider-button-next");
    const newsSwiper = new Swiper(newsSlider, {
      ...sliderDefaultOptions,
      modules: [Navigation, Scrollbar],
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 800,
      preventInteractionOnTransition: true,
      navigation: {
        prevEl: sliderButtonPrev,
        nextEl: sliderButtonNext,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        hide: false,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
  const facitiesWidgetSliders = document.querySelectorAll(".facities-widget__slider .swiper");
  if (facitiesWidgetSliders.length > 0) {
    [...facitiesWidgetSliders].forEach((facitiesWidgetSlider) => {
      let countPreview = facitiesWidgetSlider?.closest(".facities-section") ? 4 : 3;
      const sliderButtonPrev = facitiesWidgetSlider.parentNode?.querySelector(".slider-button-prev");
      const sliderButtonNext = facitiesWidgetSlider.parentNode?.querySelector(".slider-button-next");
      const sliderSCrollbar = facitiesWidgetSlider.parentNode?.querySelector(".swiper-scrollbar");
      const facitiesWidgetSwiper = new Swiper(facitiesWidgetSlider, {
        ...sliderDefaultOptions,
        modules: [Scrollbar, Navigation],
        slidesPerView: Number(countPreview),
        spaceBetween: 30,
        speed: 800,
        scrollbar: {
          el: sliderSCrollbar,
          draggable: true,
          hide: false,
        },
        navigation: {
          prevEl: sliderButtonPrev,
          nextEl: sliderButtonNext,
        },
        breakpoints: {
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: countPreview,
            spaceBetween: 30,
          },
        },
      });
    });
  }
  const testimonialsSlider = document.querySelector(".testimonials-slider .swiper");
  if (testimonialsSlider) {
    const sliderButtonPrev = testimonialsSlider.parentNode.querySelector(".slider-button-prev");
    const sliderButtonNext = testimonialsSlider.parentNode.querySelector(".slider-button-next");
    const testimonialsSwiper = new Swiper(testimonialsSlider, {
      ...sliderDefaultOptions,
      modules: [Scrollbar, Navigation],
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 800,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        hide: false,
      },
      navigation: {
        prevEl: sliderButtonPrev,
        nextEl: sliderButtonNext,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  const hoverSliders = document.querySelectorAll(".hover-slider");
  [...hoverSliders].forEach((item) => {
    const slider = item.querySelector(".swiper");
    const sliderItems = item.querySelectorAll(".hover-slider__item");
    const swiperElem = new Swiper(slider, {
      // ...sliderDefaultOptions,
      modules: [Pagination],
      speed: 800,
      updateOnWindowResize: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          spaceBetween: 10,
        },
        1024: {
          spaceBetween: 0,
          allowTouchMove: false,
        },
      },
    });
    sliderItems.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        swiperElem?.slideTo(index);
      });
      item.addEventListener("mouseleave", () => {
        swiperElem?.slideTo(0);
      });
    });
  });

  const gallerySlider = document.querySelector(".main-card-gallery__slider");
  if (gallerySlider) {
    const gallerySwiper = new Swiper(gallerySlider, {
      ...sliderDefaultOptions,
      modules: [Pagination],
      spaceBetween: 10,
      slidesPerView: 1,
      speed: 800,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
  }
};

export let swiperThumbs;

export let swiperMain;

export const popupGallerySlider = () => {
  const apartmentMainSlider = document.querySelector(".slider-apartment__main");
  const apartmentThumbSlider = document.querySelector(".slider-apartment__thumbs");
  if (apartmentMainSlider && apartmentThumbSlider) {
    const buttonPrev = apartmentMainSlider.querySelector(".slider-button-prev");
    const buttonNext = apartmentMainSlider.querySelector(".slider-button-next");
    swiperThumbs = new Swiper(apartmentThumbSlider, {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      direction: "vertical",
    });
    swiperMain = new Swiper(apartmentMainSlider, {
      modules: [Thumbs, Navigation, Pagination],
      spaceBetween: 10,
      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }
};
