<template>
  <div class="main">
    <GivenChangeModal
      v-if="givenChange"
      :change="givenChange"
      @close="handleReset"
    />
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
        <ConfirmPurchase
          v-if="selectSelectedProduct"
          @click="handleConfirmPurchase"
        />
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
import GivenChangeModal from '@/components/GivenChangeModal';
import { mapState } from 'vuex';
import { findChange } from '@/utils';

export default {
  name: 'Main',
  components: {
    Signature,
    CoinInput,
    CoinsCount,
    ContactlessPayment,
    ProductSelector,
    ConfirmPurchase,
    GivenChangeModal,
  },
  data: function() {
    return {
      givenChange: null,
    };
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
    handleConfirmPurchase() {
      const change = findChange(
        this.$store.state.coins,
        this.$store.state.totalInput,
        this.$store.state.selectedProduct
      );

      this.givenChange = change;

      this.$store.commit('takeChangeFromCoins', change);
    },
    handleReset() {
      // reset to initial app state
      this.givenChange = null;
      this.$store.commit('reset');
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
