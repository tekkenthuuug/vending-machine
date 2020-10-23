import Vue from 'vue';
import Vuex from 'vuex';
import { allowedNominals, currenciesList } from '@/constants';
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
    currency: currenciesList[0],
    totalInput: 0,
    coins: getRandomizedCoinsState(),
    contactless: false,
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
      state.totalInput += 5;
      state.contactless = true;
    },
    insertCoin(state, value) {
      state.totalInput += value;
      state.coins[value] += 1;
    },
    resetTotal(state) {
      state.totalInput = getInitialState().totalInput;
    },
    randomizeCoins(state) {
      state.coins = getRandomizedCoinsState();
    },
  },
  actions: {},
  modules: {},
});
