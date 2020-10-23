export const randomInt = (min, max) => {
  if (min > max) {
    throw Error("Min can't be higher then max");
  }
  return Math.round(min + Math.random() * (max - min));
};
