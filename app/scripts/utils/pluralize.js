function pluralize(number, one, two, five) {
  number = Math.abs(number); // работаем с положительными числами
  number %= 100; // берем остаток от деления на 100

  if (number >= 5 && number <= 20) {
    return five;
  }

  number %= 10; // берем остаток от деления на 10

  if (number === 1) {
    return one;
  }

  if (number >= 2 && number <= 4) {
    return two;
  }

  return five;
}
export function getPluralForm(number, forms) {
  return pluralize(number, forms[0], forms[1], forms[2]);
}
