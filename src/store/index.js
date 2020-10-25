import Vue from 'vue';
import Vuex from 'vuex';
import {
  allowedNominals,
  currenciesList,
  availableProducts,
} from '@/constants';
import { randomInt } from '@/utils.js';

Vue.use(Vuex);

const getRandomizedCoinsState = () => {
  return allowedNominals.reduce((acc, nominal) => {
    acc[nominal] = randomInt(1, 10);
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
      Object.assign(state, getInitialState());
    },
    contactlessPayment(state) {
      state.totalInput = 5;
      state.giveChange = false;
    },
    insertCoin(state, value) {
      // using toFixed() method to avoid cases such as
      // 0.1 + 0.2 = 3.00...004 and so on
      state.totalInput = (Number(state.totalInput) + Number(value)).toFixed(1);
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
        (acc, [nominal, numberOfCoins]) => {
          if (coinsToRemove[nominal]) {
            acc[nominal] = numberOfCoins - coinsToRemove[nominal];
          } else {
            acc[nominal] = numberOfCoins;
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
