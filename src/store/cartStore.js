import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  const userId = ref(null);

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      cart.value = storedCart;
    }
  };

  const setUserId = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      userId.value = decoded.userId;
    }
  };

  return {
    cart,
    userId,
    loadCart,
    setUserId,
  };
});
