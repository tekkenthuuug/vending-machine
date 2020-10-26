<template>
  <div class="products_container">
    <ProductItem
      v-for="product in selectProducts"
      :key="product.id"
      :imageName="product.imageName"
      :name="product.name"
      :price="
        `${toSafeFloat(product.price * selectCurrency.toUSD)} ${
          selectCurrency.name
        }`
      "
      :disabled="
        selectTotalInput < toSafeFloat(product.price * selectCurrency.toUSD)
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
import { toSafeFloat } from '@/utils';

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
    toSafeFloat,
    selectProduct(product) {
      const { currency, totalInput } = this.$store.state;

      const productWithCurrency = { ...product };
      productWithCurrency.price = toSafeFloat(
        productWithCurrency.price * currency.toUSD
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

      const realPrice = toSafeFloat(product.price * currency.toUSD);

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
