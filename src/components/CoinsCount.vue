<template>
  <div>
    <div
      class="coins-number"
      v-for="[nominal, numberOfCoins] in selectCoinsTuples"
      :key="nominal"
    >
      {{ nominal }} {{ selectCurrency.name }}: {{ numberOfCoins }} coins
    </div>
    <button
      class="randomize-button"
      @click="randomizeCoins"
      :disabled="selectTotal >= 5"
    >
      Randomize coins
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CoinsCount',
  computed: {
    selectCoinsTuples() {
      return Object.entries(this.$store.state.coins);
    },
    ...mapState({
      selectCurrency: 'currency',
      selectTotal: 'totalInput',
    }),
  },
  methods: {
    randomizeCoins() {
      this.$store.commit('randomizeCoins');
    },
  },
};
</script>

<style lang="scss" scoped>
.randomize-button {
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: white;
  border-radius: 4px;
  padding: 8px;
}
.coins-number {
  margin: 0 0 8px 6px;
}
</style>
