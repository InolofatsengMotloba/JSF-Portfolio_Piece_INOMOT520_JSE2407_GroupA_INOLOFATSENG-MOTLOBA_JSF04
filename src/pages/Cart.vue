<template>
  <div>
    <div v-if="isLoggedIn">
      <div
        v-if="cartItems.length"
        class="flex justify-between gap-8 p-6 rounded-lg"
      >
        <div class="w-2/3">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="flex items-center bg-white p-4 rounded-lg shadow-sm mb-4"
          >
            <img
              class="h-20 w-20 object-contain mr-4"
              :src="item.product.image"
              :alt="item.product.title"
            />
            <div class="flex flex-col justify-between">
              <h3 class="text-lg font-semibold text-slate-600">
                {{ item.product.title }}
              </h3>
              <p class="text-sm text-slate-600 mb-2">
                $ {{ item.product.price }}
              </p>
              <div class="flex items-center gap-4">
                <p class="font-semibold text-slate-600">QTY:</p>
                <div
                  class="flex items-center border border-gray-300 rounded-md"
                >
                  <button
                    @click="updateQuantity(item.product.id, item.quantity - 1)"
                    class="px-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span class="pr-2 text-gray-600 hover:text-gray-800">{{
                    item.quantity
                  }}</span>
                  <button
                    @click="updateQuantity(item.product.id, item.quantity + 1)"
                    class="pr-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                <button
                  @click="removeItem(item.product.id)"
                  class="text-red-500 hover:text-red-700 text-sm font-medium ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="w-[500px] bg-white p-6 rounded-lg shadow-sm self-start">
          <p class="text-xl font-semibold text-gray-800 mb-4">
            Total: {{ totalPrice }}
          </p>
          <button
            @click="clearCart"
            class="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-500 transition-colors"
          >
            Clear Cart
          </button>
          <a href="/checkout">
          <button
            class="w-full bg-[#381257] text-white py-2 rounded-md hover:bg-violet-500 transition-colors mt-2"
          >
            Checkout
          </button>
          </a>
          <button
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 transition-colors mt-2"
          >
          PayPal Checkout
          </button>
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
          Please log in to view items in cart
        </p>
        <button
          class="flex rounded justify-center mt-3 bg-[#381257] px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
        >
          <a href="/login">Login</a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../store/cartStore";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "vuex";

export default {
  name: "Cart",
  setup() {
    const cartStore = useCartStore();
    const { cart, totalPrice } = storeToRefs(cartStore);

    /**
     * Computed property for accessing cart items.
     * @type {computed<Array>}
     * @returns {Array} Array of items in the cart.
     */
    const cartItems = computed(() => cart.value);

    const store = useStore();

    /**
     * Computed property to check if the user is logged in.
     * @type {computed<Boolean>}
     * @returns {Boolean} True if the user is logged in, otherwise false.
     */
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    return {
      cartItems,
      totalPrice,
      isLoggedIn,
      updateQuantity: cartStore.updateQuantity,
      removeItem: cartStore.removeItem,
      clearCart: cartStore.clearCart,
    };
  },
};
</script>
