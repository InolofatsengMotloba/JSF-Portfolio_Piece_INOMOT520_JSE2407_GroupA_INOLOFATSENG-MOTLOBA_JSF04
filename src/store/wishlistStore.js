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
  actions: {
    addToWishlist(product) {
      if (!this.isInWishlist(product)) {
        this.wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
      }
    },
    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter((item) => item.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },
    clearWishlist() {
      this.wishlist = [];
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },
  },
});
