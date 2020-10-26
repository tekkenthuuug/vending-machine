export const randomInt = (min, max) => {
  if (min > max) {
    throw Error("Min can't be higher then max");
  }
  return Math.round(min + Math.random() * (max - min));
};

export const toSafeFloat = value => {
  // prevent cases like 0.1 + 0.2 = 3.00...004
  return Number(value.toFixed(1));
};

export const findChange = (coinsState, neededChange) => {
  // Time complexity - techically O(1) since for loop depends
  // only on constant number of properties of coinsState
  // Object.entries(coinsState).length === allowedFaceValues.length

  // Space complexity - O(n)

  // sorted entires by face value DESC, to give less coins with higher face values
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
        toSafeFloat(left / currentFaceValue)
      );

      // number of coins that is actually available
      const numberOfAvailableCoins = Math.min(
        neededCurrentFaceValue,
        currentNumberOfCoins
      );

      // add coins to change
      change[currentFaceValue] = numberOfAvailableCoins;

      // substract value added to change from left
      left = toSafeFloat(left - currentFaceValue * numberOfAvailableCoins);
    }
  }

  if (left > 0) {
    // returns null when not able to give change for product
    return null;
  }

  return change;
};

export const sumCoins = coins => {
  const sum = Object.entries(coins).reduce((acc, [coinVal, coinCount]) => {
    acc += Number(coinVal) * coinCount;

    return acc;
  }, 0);

  return toSafeFloat(sum);
};
