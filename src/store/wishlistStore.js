import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  }),
  getters: {
    wishlistCount: (state) => state.wishlist.length,
    isInWishlist: (state) => (product) => {
      return state.wishlist.some((item) => item.id === product.id);
    },
  },
});
