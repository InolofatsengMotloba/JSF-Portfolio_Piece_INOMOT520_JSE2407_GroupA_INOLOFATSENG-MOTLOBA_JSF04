import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  }),
});
