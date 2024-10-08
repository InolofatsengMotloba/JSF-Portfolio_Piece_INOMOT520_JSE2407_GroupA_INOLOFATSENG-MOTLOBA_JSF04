<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-[#381257] border-gray-200">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <!-- Home Button / Logo -->
        <a href="/">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/public/images/online-shop.png"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap text-white"
            >
              SwiftCart
            </span>
          </button>
        </a>

        <!-- NavBar Toggle Button -->
        <button
          @click="toggleNavbar"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-dropdown"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <!-- Menu Items -->
        <div
          :class="{
            hidden: !isNavbarVisible,
            'w-full': true,
            'md:block': true,
            'md:w-auto': true,
          }"
          id="navbar-dropdown"
        >
          <ul
            class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#381257] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
          >
            <li>
              <a
                href="/compare"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Compare Items
              </a>
            </li>
            <li class="relative">
              <div class="t-0 absolute right-0 -top-4">
                <p
                  class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                >
                  {{ wishlistCount }}
                </p>
              </div>
              <a
                href="/wishlist"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Wishlist
              </a>
            </li>
            <a href="/cart">
              <li class="hidden lg:block md:block relative">
                <div class="t-0 absolute left-3 -top-4">
                  <p
                    class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                  >
                    {{ totalItems }}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="file: h-6 w-6 stroke-white cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </li>
            </a>
            <li>
              <a
                href="/cart"
                class="lg:hidden md:hidden py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Cart
              </a>
            </li>
            <li>
              <a
                v-if="isLoggedIn"
                href="/login"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >Logged in</a
              >
              <a
                v-else
                href="/login"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Login
              </a>
            </li>

            <!-- Logout Button -->
            <li v-if="isLoggedIn">
              <button
                @click="logout"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "NavBar",
  setup() {

    /**
     * Vuex store instance for accessing global state and actions.
     * @type {store}
     */
    const store = useStore();

    /**
     * Reactive reference to toggle the visibility of the navbar.
     * @type {ref<Boolean>}
     */
    const isNavbarVisible = ref(false);

    /**
     * Toggles the visibility state of the navbar.
     * @function
     * @returns {void}
     */
    const toggleNavbar = () => {
      isNavbarVisible.value = !isNavbarVisible.value;
    };

    /**
     * Computed property that checks if the user is logged in.
     * @type {computed<Boolean>}
     * @returns {Boolean} True if the user is logged in, otherwise false.
     */
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    /**
     * Logs out the user by dispatching the logout action in Vuex.
     * @function
     * @returns {void}
     */
    const logout = () => {
      store.dispatch("logout");
    };

    const cartStore = useCartStore();
    const { totalItems } = storeToRefs(cartStore);

    const wishlistStore = useWishlistStore();
    const { wishlistCount } = storeToRefs(wishlistStore);

    return {
      isNavbarVisible,
      toggleNavbar,
      isLoggedIn,
      logout,
      totalItems,
      wishlistCount,
    };
  },
};
</script>

<style></style>
