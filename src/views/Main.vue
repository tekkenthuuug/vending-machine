<template>
  <div class="main">
    <div class="fsp-row">
      <h2 class="tc">VQuick</h2>
      <Signature />
    </div>
    <div class="fsp-row middle-row">
      <CoinsCount />
      <CoinInput />
    </div>
  </div>
</template>

<script>
import Signature from '@/components/Signature';
import CoinInput from '@/components/CoinInput';
import CoinsCount from '@/components/CoinsCount';

export default {
  name: 'Main',
  components: {
    Signature,
    CoinInput,
    CoinsCount,
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
</style>
