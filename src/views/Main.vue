<template>
  <div class="main">
    <div class="fsp-row">
      <div>
        <h2 class="tc">VQuick</h2>
        <span v-if="!selectTotal" @click="goBack" class="go-back">Go back</span>
      </div>
      <Signature />
    </div>
    <div class="fsp-row middle-row">
      <div>
        <CoinsCount />
        <ContactlessPayment />
      </div>
      <div>
        <ProductSelector />
        <ConfirmPurchase v-if="selectSelectedProduct" />
      </div>
      <CoinInput />
    </div>
  </div>
</template>

<script>
import Signature from '@/components/Signature';
import CoinInput from '@/components/CoinInput';
import CoinsCount from '@/components/CoinsCount';
import ContactlessPayment from '@/components/ContactlessPayment';
import ProductSelector from '@/components/ProductSelector';
import ConfirmPurchase from '@/components/ConfirmPurchase';
import { mapState } from 'vuex';

export default {
  name: 'Main',
  components: {
    Signature,
    CoinInput,
    CoinsCount,
    ContactlessPayment,
    ProductSelector,
    ConfirmPurchase,
  },
  computed: {
    ...mapState({
      selectTotal: 'totalInput',
      selectSelectedProduct: 'selectedProduct',
    }),
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.main {
  padding: 36px 36px 0 36px;
}

.fsp-row {
  display: flex;
  justify-content: space-between;
}

.middle-row {
  margin-top: 18px;
}

.go-back {
  cursor: pointer;
  opacity: 0.8;
}
</style>
