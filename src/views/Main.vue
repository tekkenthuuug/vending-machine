<template>
  <div class="main">
    <PurchaseSummaryModal
      v-if="showFinalModal"
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
import PurchaseSummaryModal from '@/components/PurchaseSummaryModal';
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
    PurchaseSummaryModal,
  },
  data: function() {
    return {
      givenChange: null,
      showFinalModal: false,
    };
  },
  computed: {
    ...mapState({
      selectTotal: 'totalInput',
      selectSelectedProduct: 'selectedProduct',
    }),
  },
  mounted: function() {
    this.$store.commit('startSession');
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    handleConfirmPurchase() {
      const {
        giveChange,
        coins,
        totalInput,
        selectedProduct,
      } = this.$store.state;

      if (giveChange) {
        const change = findChange(coins, totalInput - selectedProduct.price);
        this.givenChange = change;

        this.$store.commit('removeCoins', change);
      }

      this.showFinalModal = true;
    },
    handleReset() {
      // reset to initial app state
      this.givenChange = null;
      this.showFinalModal = false;
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
