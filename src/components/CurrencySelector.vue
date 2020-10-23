<template>
  <div class="grid">
    <div
      v-for="currency in currenciesList"
      :key="currency.id"
      class="currency-button cyan-glow-onhover"
      :class="{
        'cyan-glow': selectCurrency && selectCurrency.id === currency.id,
      }"
      @click="chooseCurrency(currency)"
    >
      {{ currency.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { currenciesList } from '@/constants';

export default {
  name: 'CurrencySelector',
  data: function() {
    return {
      currenciesList,
    };
  },
  methods: {
    chooseCurrency(currency) {
      this.$store.commit('setCurrency', currency);
    },
  },
  computed: {
    ...mapState({
      selectCurrency: 'currency',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import url('../_shared-styles.scss');
.currency-button {
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  cursor: pointer;
  align-self: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;
  width: 80%;
  margin: 8px auto 0 auto;
}
</style>
