<template>
  <div>
    <h1 v-if="isLoggedIn">WishList Page</h1>
    <p v-else>Please log in to view items in Wishlist</p>
  </div>
</template>

<script>
export default {
  name: "WishList",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
