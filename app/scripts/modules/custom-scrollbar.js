import SimpleBar from "simplebar";

let simpleBar;

const tablePrice = document.querySelector(".table-price-wrap");
if (tablePrice) {
  if (window.innerWidth >= 767.98) {
    // simpleBar = new SimpleBar(tablePrice, {
    //   autoHide: false,
    // });
  }
}

export { simpleBar };
