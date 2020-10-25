export const randomInt = (min, max) => {
  if (min > max) {
    throw Error("Min can't be higher then max");
  }
  return Math.round(min + Math.random() * (max - min));
};

export const findChange = (coinsState, totalInput, product) => {
  // sorted entires by nominal DESC
  const coinsEntries = Object.entries(coinsState).sort((a, b) =>
    a < b ? 1 : -1
  );
  let left = totalInput - product.price;
  const change = {};

  for (let i = 0; i < coinsEntries.length; i++) {
    const [currentNominal, currentNumberOfCoins] = coinsEntries[i];
    if (currentNominal > left) {
      // if current nominal is higher then needed
      continue;
    } else {
      const maxCoinsForNominal = Math.min(
        Math.floor(left / currentNominal),
        currentNumberOfCoins
      );
      change[currentNominal] = maxCoinsForNominal;
      left = (left - currentNominal * maxCoinsForNominal).toFixed(1);
    }
  }

  if (left > 0) {
    throw null;
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
