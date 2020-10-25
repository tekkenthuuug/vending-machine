<template>
  <div class="change-drawer">
    <div class="change-modal">
      <span class="control" @click="emitClose">×</span>
      <h2>Here is your change</h2>
      <div class="total-change">
        Total: {{ changeTotal() }} {{ selectCurrency.name }}
      </div>
      <table class="change-table tc">
        <tr>
          <th>Nominal</th>
          <th>Number of coins</th>
        </tr>
        <tr v-for="(numberOfCoins, nominal) in change" :key="nominal">
          <td>{{ nominal }} {{ selectCurrency.name }}</td>
          <td>{{ numberOfCoins }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { sumCoins } from '@/utils';
import { mapState } from 'vuex';

export default {
  name: 'GivenChangeModal',
  props: {
    change: {
      type: Object,
      required: true,
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
    changeTotal() {
      return sumCoins(this.change);
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
  margin: 12px auto 0 auto;
  border: 1px solid white;
  border-collapse: collapse;

  & td,
  & th {
    border: 1px solid white;
    padding: 8px;
  }
}

.total-change {
  margin-top: 8px;
  font-size: 16px;
}
</style>
