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
      :selected="
        selectSelectedProduct && selectSelectedProduct.id === product.id
      "
      @select="selectProduct(product)"
    />
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem';
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
      const productWithCurrency = { ...product };
      productWithCurrency.price = Number(
        (productWithCurrency.price * this.$store.state.currency.toUSD).toFixed(
          1
        )
      );

      if (this.$store.state.totalInput >= productWithCurrency.price) {
        this.$store.commit('selectProduct', productWithCurrency);
      }
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
