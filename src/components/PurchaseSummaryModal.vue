<template>
  <div class="change-drawer">
    <div class="change-modal">
      <span class="control" @click="emitClose">×</span>
      <h1>Thank you for the purchase!</h1>
      <h3>Go ahead an take your product</h3>
      <div v-if="change && getChangeTotal()">
        <div class="total-change tc">
          Total change: {{ getChangeTotal() }} {{ selectCurrency.name }}
        </div>
        <table class="change-table tc">
          <tr>
            <th>Face value</th>
            <th>Number of coins</th>
          </tr>
          <tr v-for="(numberOfCoins, faceValue) in change" :key="faceValue">
            <td>{{ faceValue }} {{ selectCurrency.name }}</td>
            <td>{{ numberOfCoins }}</td>
          </tr>
        </table>
      </div>

      <h4 class="timestamp">
        It took <span>{{ computeTimeTaken() }}s </span> for you to complete this
        purchase
      </h4>
    </div>
  </div>
</template>

<script>
import { sumCoins } from '@/utils';
import { mapState } from 'vuex';
import { toSafeFloat } from '@/utils';

export default {
  name: 'PurchaseSummaryModal',
  props: {
    change: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      selectCurrency: 'currency',
    }),
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },
    getChangeTotal() {
      return sumCoins(this.change);
    },
    computeTimeTaken() {
      const startTime = this.$store.state.sessionStartTime;
      const timestampDif = new Date().getTime() - startTime.getTime();

      return toSafeFloat(timestampDif / 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.change-drawer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.change-modal {
  position: relative;
  padding: 38px;
  border-radius: 8px;
  background-image: linear-gradient(45deg, #252f8b, #004e92);
}

.control {
  position: absolute;
  right: 12px;
  top: 0px;
  cursor: pointer;
  font-size: 36px;
  user-select: none;
}

.change-table {
  margin: 8px auto 0 auto;
  border: 1px solid white;
  border-collapse: collapse;

  & td,
  & th {
    border: 1px solid white;
    padding: 8px;
  }
}

.total-change {
  margin-top: 32px;
  font-size: 16px;
}

.timestamp {
  margin-top: 24px;
  & > span {
    color: lightgreen;
    text-decoration: underline;
  }
}
</style>
