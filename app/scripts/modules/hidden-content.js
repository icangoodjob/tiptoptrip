export const hiddenContent = () => {
  const hiddenContentBlocks = document.querySelectorAll(".hidden-content");
  if (hiddenContentBlocks.length === 0) return;
  [...hiddenContentBlocks].forEach((block) => {
    const hiddenContentBlockWrap = block.querySelector(".hidden-content__wrap");
    const content = block.querySelector(".content");
    const button = block.querySelector(".btn");
    const contentHeight = content.clientHeight;
    const wrapHeight = hiddenContentBlockWrap.clientHeight;
    const hiddenContentBlockGradient = block.querySelector(".hidden-content__gradient");
    button.style = contentHeight > wrapHeight ? "block" : "none";
    let buttonText = button.textContent;
    const toggleHiddenText = () => {
      block.classList.toggle("is-active");
      if (block.classList.contains("is-active")) {
        hiddenContentBlockWrap.style.maxHeight = `${contentHeight}px`;
        button.textContent = "Свернуть";
      } else {
        hiddenContentBlockWrap.style.maxHeight = `${wrapHeight}px`;
        button.textContent = buttonText;
      }
    };
    button.addEventListener("click", toggleHiddenText);
    hiddenContentBlockGradient.addEventListener("click", toggleHiddenText);
  });
};
