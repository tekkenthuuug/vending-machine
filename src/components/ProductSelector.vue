<template>
  <div class="products_container">
    <ProductItem
      v-for="product in selectProducts"
      :key="product.id"
      :imageName="product.imageName"
      :name="product.name"
      :price="
        `${Number(product.price * selectCurrency.toUSD).toFixed(1)} ${
          selectCurrency.name
        }`
      "
      :disabled="
        selectTotalInput <
          Number(product.price * selectCurrency.toUSD).toFixed(1)
      "
      :noChange="!haveChangeForProduct(product)"
      :selected="
        selectSelectedProduct && selectSelectedProduct.id === product.id
      "
      @select="selectProduct(product)"
    />
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem';
import { findChange } from '@/utils';
import { mapState } from 'vuex';

export default {
  name: 'ProductSelector',
  components: {
    ProductItem,
  },
  computed: {
    ...mapState({
      selectProducts: 'availableProducts',
      selectCurrency: 'currency',
      selectSelectedProduct: 'selectedProduct',
      selectTotalInput: 'totalInput',
    }),
  },
  methods: {
    selectProduct(product) {
      const { currency, totalInput } = this.$store.state;

      const productWithCurrency = { ...product };
      productWithCurrency.price = Number(
        (productWithCurrency.price * currency.toUSD).toFixed(1)
      );

      if (!this.haveChangeForProduct(product)) {
        return;
      }

      if (totalInput >= productWithCurrency.price) {
        this.$store.commit('selectProduct', productWithCurrency);
      }
    },
    haveChangeForProduct(product) {
      const { giveChange, currency, totalInput, coins } = this.$store.state;

      if (!giveChange) {
        return true;
      }

      const realPrice = Number((product.price * currency.toUSD).toFixed(1));

      if (totalInput === realPrice) {
        return true;
      }

      const change = findChange(coins, totalInput - realPrice);

      return change !== null;
    },
  },
};
</script>

<style lang="scss">
.products_container {
  display: grid;
  grid-template-columns: repeat(3, 140px);
  grid-template-rows: repeat(2, 218px);
  grid-gap: 8px;
}
</style>
