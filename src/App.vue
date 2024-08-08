<script>
import NavBarVue from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBarVue,
  },
};
</script>

<template>
  <div id="app">
    <NavBarVue />
    <router-view />
  </div>
</template>

<style scoped></style>
