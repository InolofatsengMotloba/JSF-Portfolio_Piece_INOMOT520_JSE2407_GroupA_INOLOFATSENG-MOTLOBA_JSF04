<template>
  <div>
    <div v-if="isLoggedIn">
      <h1>Add to Cart Page</h1>
    </div>
    <div v-else>
      <h1>Please log in to view items in cart</h1>
      <button><a href="/login">Login</a></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
