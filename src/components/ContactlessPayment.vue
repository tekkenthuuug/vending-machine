<template>
  <div class="contactless" :class="{ 'disabled-contactless': selectTotal }">
    <h4>Pay with product card</h4>
    <svg
      @click="contactlessPayment"
      id="Layer_1"
      enable-background="new 0 0 496 496"
      height="180"
      viewBox="0 0 496 496"
      width="180"
      xmlns="http://www.w3.org/2000/svg"
      class="svg"
    >
      <path
        d="m377.406 345.257c-6.849 5.587-16.926 4.562-22.512-2.285-5.585-6.848-4.562-16.927 2.285-22.512 49.624-40.473 49.247-116.049-.642-156.056-6.894-5.528-8-15.599-2.472-22.492 5.527-6.895 15.598-8 22.492-2.473 65.771 52.74 66.258 152.457.849 205.818zm-42.847-163.192c-6.248-6.248-16.379-6.248-22.627 0-6.249 6.248-6.249 16.379 0 22.627 20.952 20.953 20.952 55.046 0 75.999-6.248 6.248-6.248 16.379 0 22.627 6.246 6.248 16.378 6.249 22.627 0 33.429-33.429 33.429-87.824 0-121.253zm161.441-73.065v278c0 26.468-21.533 48-48 48h-400c-26.467 0-48-21.532-48-48v-278c0-26.468 21.533-48 48-48h400c26.467 0 48 21.532 48 48zm-32 0c0-8.822-7.178-16-16-16h-400c-8.822 0-16 7.178-16 16v278c0 8.822 7.178 16 16 16h400c8.822 0 16-7.178 16-16zm-394 93v-36c0-22.056 17.944-40 40-40h36c22.056 0 40 17.944 40 40v36c0 22.056-17.944 40-40 40h-36c-22.056 0-40-17.944-40-40zm32 0c0 4.411 3.589 8 8 8h36c4.411 0 8-3.589 8-8v-36c0-4.411-3.589-8-8-8h-36c-4.411 0-8 3.589-8 8zm137 77h-153c-8.836 0-16 7.163-16 16s7.164 16 16 16h153c8.836 0 16-7.163 16-16s-7.164-16-16-16zm-50 60h-103c-8.836 0-16 7.163-16 16s7.164 16 16 16h103c8.836 0 16-7.163 16-16s-7.164-16-16-16z"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ContactlessPayment',
  methods: {
    contactlessPayment() {
      if (this.$store.state.totalInput === 0) {
        this.$store.commit('contactlessPayment');
      }
    },
  },
  computed: {
    ...mapState({
      selectTotal: 'totalInput',
    }),
  },
};
</script>

<style lang="scss" scoped>
.svg {
  cursor: pointer;
  opacity: 0.9;
  fill: white;
}

.disabled-contactless {
  opacity: 0.5;
}
.contactless {
  margin-top: 102px;
}
</style>
