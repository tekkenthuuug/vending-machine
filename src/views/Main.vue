<template>
  <div class="main">
    <div class="fsp-row">
      <div>
        <h2 class="tc">VQuick</h2>
        <span @click="goBack" class="go-back">Go back</span>
      </div>
      <Signature />
    </div>
    <div class="fsp-row middle-row">
      <CoinsCount />
      <CoinInput />
    </div>
    <div class="fsp-row">
      <div :class="{ 'disabled-contactless': selectTotal }">
        <h4>Pay with product card</h4>
        <ContactlessPayment />
      </div>
    </div>
  </div>
</template>

<script>
import Signature from '@/components/Signature';
import CoinInput from '@/components/CoinInput';
import CoinsCount from '@/components/CoinsCount';
import ContactlessPayment from '@/components/ContactlessPayment';
import { mapState } from 'vuex';

export default {
  name: 'Main',
  components: {
    Signature,
    CoinInput,
    CoinsCount,
    ContactlessPayment,
  },
  computed: {
    ...mapState({
      selectTotal: 'totalInput',
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
  padding: 36px 36px;
}

.fsp-row {
  display: flex;
  justify-content: space-between;
}

.middle-row {
  margin-top: 48px;
}

.disabled-contactless {
  opacity: 0.5;
}

.go-back {
  cursor: pointer;
  opacity: 0.8;
}
</style>
