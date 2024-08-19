import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  const userId = ref(null);

  const setUserId = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      userId.value = decoded.userId;
    }
  };

  return {
    cart,
    userId,
    setUserId,
  };
});
