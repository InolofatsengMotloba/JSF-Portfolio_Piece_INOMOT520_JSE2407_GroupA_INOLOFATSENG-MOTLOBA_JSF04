import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  const userId = ref(null);

  /**
   * Loads the cart from local storage and sets the `cart` ref.
   * @function
   */
  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      cart.value = storedCart;
    }
  };

  /**
   * Saves the current cart to local storage.
   * @function
   */
  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  /**
   * Sets the user ID from a JWT token.
   * @function
   * @param {string} token - The JWT token containing user information.
   */
  const setUserId = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      userId.value = decoded.userId;
    }
  };

  /**
   * Adds a product to the cart with a specified quantity.
   * @function
   * @param {Object} product - The product object to add to the cart.
   * @param {number} [quantity=1] - The quantity of the product to add. Defaults to 1.
   */
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

  /**
   * Updates the quantity of a product in the cart.
   * @function
   * @param {number} productId - The ID of the product to update.
   * @param {number} quantity - The new quantity of the product.
   */
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

  /**
   * Removes a product from the cart.
   * @function
   * @param {number} productId - The ID of the product to remove.
   */
  const removeItem = (productId) => {
    cart.value = cart.value.filter((item) => item.product.id !== productId);
    saveCart();
  };

  /**
   * Clears all items from the cart.
   * @function
   */
  const clearCart = () => {
    cart.value = [];
    saveCart();
  };

  /**
   * Computes the total number of items in the cart.
   * @function
   * @returns {number} The total number of items.
   */
  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  /**
   * Computes the total price of items in the cart.
   * @function
   * @returns {string} The total price, formatted to two decimal places.
   */
  const totalPrice = computed(() => {
    return cart.value
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  });

  return {
    cart,
    userId,
    loadCart,
    setUserId,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };
});
