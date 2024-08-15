<template>
  <div>
    <h1 v-if="isLoggedIn">Add to Cart Page</h1>
    <p v-else>Please log in to view items in cart</p>
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
