<template>
  <div>
    <div v-if="isLoggedIn">
      <h1>Compare List Page</h1>
    </div>
    <div v-else>
      <h1>Please log in to view Compare List</h1>
      <a href="/login"><button>Login</button></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompareList",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
