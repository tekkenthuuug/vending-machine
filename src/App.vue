<template>
  <div id="app">
    <TabControls />
    <router-view />
  </div>
</template>

<script>
import TabControls from "@/components/TabControls.vue";
export default {
  name: "Home",
  components: {
    TabControls
  }
};
</script>

<style lang="scss">
@import "./_shared-styles.scss";
#app {
  position: relative;
  color: rgb(240, 240, 240);
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
