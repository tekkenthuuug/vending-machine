export const randomInt = (min, max) => {
  if (min > max) {
    throw Error("Min can't be higher then max");
  }
  return Math.round(min + Math.random() * (max - min));
};

export const findChange = (coinsState, neededChange) => {
  // sorted entires by face value DESC
  const coinsEntries = Object.entries(coinsState).sort((a, b) =>
    a < b ? 1 : -1
  );
  let left = neededChange;
  const change = {};

  for (let i = 0; i < coinsEntries.length; i++) {
    const [currentFaceValue, currentNumberOfCoins] = coinsEntries[i];
    if (currentFaceValue > left || currentNumberOfCoins <= 0) {
      // if current face value is higher then needed or no coins
      continue;
    } else {
      // number of coins needed for left to become 0
      const neededCurrentFaceValue = Math.floor(
        (left / currentFaceValue).toFixed(1)
      );

      // number of coins that is actually available
      const numberOfAvailableCoins = Math.min(
        neededCurrentFaceValue,
        currentNumberOfCoins
      );

      // add coins to change
      change[currentFaceValue] = numberOfAvailableCoins;

      // substract value added to change from left
      left = (left - currentFaceValue * numberOfAvailableCoins).toFixed(1);
    }
  }

  if (left > 0) {
    return null;
  }

  return change;
};

export const sumCoins = coins => {
  const sum = Object.entries(coins).reduce((acc, [coinVal, coinCount]) => {
    acc += Number(coinVal) * coinCount;

    return acc;
  }, 0);

  return Number(sum.toFixed(1));
};
