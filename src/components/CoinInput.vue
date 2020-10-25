<template>
  <div class="coin-input">
    <div class="nominals-grid">
      <button
        v-for="nominal in allowedNominals"
        :key="nominal"
        class="keypad-button cyan-glow-onhover"
        @click="insertCoin(nominal)"
        :disabled="selectTotal >= 5"
      >
        {{ nominal }}
      </button>
    </div>
    <button
      class="keypad-button cyan-glow-onhover keypad-reset"
      @click="cancel"
    >
      Cancel
    </button>
    <div class="keypad-total tc">
      Total: {{ selectTotal }} {{ selectCurrency.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { allowedNominals } from '@/constants';
import { findChange } from '@/utils';

export default {
  name: 'CoinInput',
  data: function() {
    return {
      allowedNominals: allowedNominals,
    };
  },
  methods: {
    insertCoin(nominal) {
      this.$store.commit('insertCoin', nominal);
    },
    cancel() {
      if (this.$store.state.giveChange) {
        const change = findChange(
          this.$store.state.coins,
          this.$store.state.totalInput
        );
        this.$store.commit('removeCoins', change);
      }
      this.$store.commit('resetTotal');
    },
  },
  computed: {
    ...mapState({
      selectCurrency: 'currency',
      selectTotal: 'totalInput',
    }),
  },
};
</script>

<style style="scss">
.coin-input {
  width: 156px;
}

.nominals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  grid-gap: 8px;
}

.keypad-button {
  background-color: rgba(0, 0, 0, 0.2);
  height: 74px;
  font-size: 22px;
  color: white;
  border-radius: 8px;
}

.keypad-reset {
  margin-top: 8px;
  height: 44px;
  width: 100%;
}

.keypad-total {
  margin-top: 8px;
  font-size: 22px;
}
</style>
