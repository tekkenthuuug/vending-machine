import Vue from 'vue';
import Vuex from 'vuex';
import {
  allowedFaceValues,
  currenciesList,
  availableProducts,
} from '@/constants';
import { randomInt, toSafeFloat } from '@/utils.js';

Vue.use(Vuex);

const getRandomizedCoinsState = () => {
  return allowedFaceValues.reduce((acc, faceValue) => {
    acc[faceValue] = randomInt(0, 8);
    return acc;
  }, {});
};

const getInitialState = () => {
  return {
    currency: currenciesList[1],
    totalInput: 0,
    coins: getRandomizedCoinsState(),
    giveChange: true,
    availableProducts: availableProducts,
    selectedProduct: null,
    sessionStartTime: null,
  };
};

export default new Vuex.Store({
  state: getInitialState(),
  mutations: {
    setCurrency(state, currency) {
      if (state.currency && state.currency.id === currency.id) {
        state.currency = undefined;
      } else {
        state.currency = currency;
      }
    },
    reset(state) {
      // reset all but save coins state
      Object.assign(state, getInitialState(), { coins: state.coins });
    },
    contactlessPayment(state) {
      state.totalInput = 5;
      state.giveChange = false;
    },
    insertCoin(state, value) {
      // using toFixed() method to avoid cases such as
      // 0.1 + 0.2 = 3.00...004 and so on
      state.totalInput = toSafeFloat(state.totalInput + value);
      state.coins[value] += 1;
    },
    resetTotal(state) {
      state.totalInput = getInitialState().totalInput;
      state.selectedProduct = getInitialState().selectedProduct;
    },
    randomizeCoins(state) {
      state.coins = getRandomizedCoinsState();
    },
    selectProduct(state, product) {
      state.selectedProduct = product;
    },
    removeCoins(state, coinsToRemove) {
      state.coins = Object.entries(state.coins).reduce(
        (acc, [faceValue, numberOfCoins]) => {
          if (coinsToRemove[faceValue]) {
            acc[faceValue] = numberOfCoins - coinsToRemove[faceValue];
          } else {
            acc[faceValue] = numberOfCoins;
          }

          return acc;
        },
        {}
      );
    },
    startSession(state) {
      state.sessionStartTime = new Date();
    },
  },
  actions: {},
  modules: {},
});
