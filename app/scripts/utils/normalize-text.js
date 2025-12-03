export const normalizeText = (str) => {
  if (!str) return;
  return str
    .toLowerCase()
    .replace(/[\s.,%,(.+\)]/g, "")
    .trim();
};
