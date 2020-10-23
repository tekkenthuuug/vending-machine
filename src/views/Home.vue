<template>
  <div class="home tc">
    <div>
      <h1>Be quick. VQuick. Vending machines.</h1>
      <div>
        <p>Choose your currency to begin</p>
        <CurrencySelector />
        <button
          @click="redirectToApp"
          v-if="selectCurrency"
          class="cyan-glow continue"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CurrencySelector from '@/components/CurrencySelector';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    CurrencySelector,
  },
  computed: {
    ...mapState({
      selectCurrency: 'currency',
    }),
  },
  methods: {
    redirectToApp: function() {
      if (this.$store.state.currency) {
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('../_shared-styles.scss');
.home {
  display: flex;
  justify-content: center;

  & > div {
    margin-top: 240px;
  }
}

.continue {
  margin-top: 24px;
  height: 32px;
  width: 88px;
  color: white;
  border-radius: 4px;
}
</style>
