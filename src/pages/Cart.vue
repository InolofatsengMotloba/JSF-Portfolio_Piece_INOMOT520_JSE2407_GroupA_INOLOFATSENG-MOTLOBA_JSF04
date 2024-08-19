<template>
  <div>
    <div v-if="isLoggedIn">
      <div v-if="cartItems.length">
        <div
          v-for="item in cartItems"
          :key="item.product.id"
          class="flex justify-between items-center my-4"
        >
          <div>
            <h3>{{ item.product.title }}</h3>
            <p>{{ item.product.price }} x {{ item.quantity }}</p>
            <input
              type="number"
              :value="item.quantity"
              @input="updateQuantity(item.product.id, $event.target.value)"
            />
            <button @click="removeItem(item.product.id)">Remove</button>
          </div>
        </div>
        <div>
          <p>Total: {{ totalPrice }}</p>
          <button @click="clearCart">Clear Cart</button>
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty</p>
      </div>
    </div>
    <div v-else>
      <h1>Please log in to view items in cart</h1>
      <button><a href="/login">Login</a></button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../store/cartStore";
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

export default {
  name: "Cart",
  setup() {
    const cartStore = useCartStore();
    const { cart, totalPrice } = storeToRefs(cartStore);

    const cartItems = computed(() => cart.value);

    return {
      cartItems,
      totalPrice,
      updateQuantity: cartStore.updateQuantity,
      removeItem: cartStore.removeItem,
      clearCart: cartStore.clearCart,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
