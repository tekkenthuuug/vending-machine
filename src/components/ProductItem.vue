<template>
  <div
    :class="{ 'cyan-glow': selected, 'product-item_disabled': disabled }"
    @click="select"
    class="product-item cyan-glow-onhover"
  >
    <div class="product-item_name">
      {{ name }}
    </div>
    <img
      class="product-item_image"
      :src="require(`@/assets/img/products/${imageName}.png`)"
    />
    <div class="product-item_price">
      {{ price }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    select() {
      this.$emit('select');
    },
  },
};
</script>

<style lang="scss">
@import url('../_shared-styles.scss');

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px 18px;
  cursor: pointer;
  width: 140px;
  height: 218px;

  &_disabled {
    opacity: 0.5;
  }

  &_image {
    margin: 12px 0;
    height: 124px;
  }

  &_selected {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &_name,
  &_price {
    font-size: 20px;
  }
}
</style>
