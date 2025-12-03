export const lockScroll = () => {
  document.documentElement.classList.add("lock");
};

export const unlockScroll = () => {
  document.documentElement.classList.remove("lock");
};
