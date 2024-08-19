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

      <div v-else class="grid m-10 space-y-5">
        <div
          class="flex flex-col items-center bg-white border-2 border-gray-500 p-4"
        >
          <img
            class="object-contain h-48 mt-3 mb-3"
            src="/public/images/EmptyCart.png"
            alt="Empty Cart"
          />
          <p
            class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600"
          >
            Your shopping cart is empty
          </p>
          <button
            class="flex rounded justify-center mt-3 bg-[#381257] px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
          >
            <a href="/">Continue Shopping</a>
          </button>
        </div>
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
import { computed } from "vue";
import { storeToRefs } from "pinia";

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
