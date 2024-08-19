<template>
  <div>
    <div v-if="isLoggedIn">
      <h1>WishList Page</h1>
    </div>
    <div v-else>
      <p>Please log in to view items in Wishlist</p>
      <a href="/login"><button>Login</button></a>
    </div>
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
