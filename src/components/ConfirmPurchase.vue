<template>
  <div class="confirm-purchase-container">
    <button class="cyan-glow" @click="emitClick">
      Confirm purchase of {{ selectSelectedProduct.name }} for
      {{ selectSelectedProduct.price }} {{ selectCurrency.name }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ConfirmPurchase',
  computed: {
    ...mapState({
      selectSelectedProduct: 'selectedProduct',
      selectCurrency: 'currency',
    }),
  },
  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-purchase-container {
  margin-top: 16px;
  display: flex;

  button {
    font-size: 20px;
    padding: 8px 12px;
    color: white;
    border-radius: 8px;
  }
}
</style>
