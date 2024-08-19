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

  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const setUserId = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      userId.value = decoded.userId;
    }
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.value.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.value.push({ product, quantity });
    }
    saveCart();
  };

  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity++;
      if (item.quantity <= 0) {
        removeItem(productId);
      } else {
        saveCart();
      }
    }
  };

  return {
    cart,
    userId,
    loadCart,
    setUserId,
    addToCart,
    updateQuantity,
  };
});
