<template>
  <div>
    <div v-if="isLoggedIn">
      <h1>WishList Page</h1>
    </div>
    <div v-else class="grid m-10 space-y-5">
      <div
        class="flex flex-col items-center bg-white border-2 border-gray-500 p-4"
      >
        <img
          class="object-contain h-48 mt-3 mb-3"
          src="/public/images/NotLogIn.png"
          alt="Empty Cart"
        />
        <p
          class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600"
        >
          Please log in to view items in wishlist
        </p>
        <a href="/login"
          ><button
            class="flex rounded justify-center mt-3 bg-[#381257] px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
          >
            Login
          </button></a
        >
      </div>
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
