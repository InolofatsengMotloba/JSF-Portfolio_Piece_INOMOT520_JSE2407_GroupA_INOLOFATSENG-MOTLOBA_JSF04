<template>
  <div>
    <div v-if="isLoggedIn">
      <h1>WishList Page</h1>
      <button @click="clearWishlist">Clear All</button>
      <div v-if="wishlist.length === 0">Your wishlist is empty.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in wishlist" :key="item.id" class="p-4 border">
          <img :src="item.image" alt="item.title" />
          <h2>{{ item.title }}</h2>
          <p>{{ item.price }}</p>
          <button @click="removeFromWishlist(item.id)">Remove</button>
          <button @click="addToCart(item)">Add to Cart</button>
        </div>
      </div>
      
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
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";
import { storeToRefs } from "pinia";

export default {
  name: "WishList",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  setup() {
    const wishlistStore = useWishlistStore();
    const cartStore = useCartStore();
    const { wishlist } = storeToRefs(wishlistStore);

    function addToCart(item) {
      cartStore.addToCart(item);
      // wishlistStore.removeFromWishlist(item.id);
    }

    return {
      wishlist,
      removeFromWishlist: wishlistStore.removeFromWishlist,
      clearWishlist: wishlistStore.clearWishlist,
      addToCart,
    };
  },
};
</script>
