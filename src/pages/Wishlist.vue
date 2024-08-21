<template>
  <div>
    <div v-if="isLoggedIn">
      <div v-if="wishlist.length === 0" class="grid m-10 space-y-5">
        <div
          class="flex flex-col items-center bg-white border-2 border-gray-500 p-4"
        >
          <img
            class="object-contain h-48 mt-3 mb-3"
            src="/public/images/WishList.png"
            alt="Empty Cart"
          />
          <p
            class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600"
          >
            Your Wishlist is empty
          </p>
          <button
            class="flex rounded justify-center mt-3 bg-[#381257] px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
          >
            <a href="/">Continue Shopping</a>
          </button>
        </div>
      </div>
      <div v-else>
        <!-- Filter and Sort Components -->
        <div
          class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center"
        >
          <Filter
            :currentCategory="currentCategory"
            @filter-category="handleCategoryChange"
          />
          <Sort
            :currentSortOrder="currentSortOrder"
            @sort-order="handleSortChange"
          />
        </div>

        <button
          @click="clearWishlist"
          class="bg-red-500 my-5 w-auto ml-10 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-red-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Clear All
        </button>
        <div class="grid justify-center">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div
              v-for="item in filteredAndSortedWishlist"
              :key="item.id"
              class="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="object-contain h-48 mt-3"
              />
              <div class="flex-1 flex flex-col p-6">
                <div class="flex-1">
                  <header class="mb-2 flex-2">
                    <h2
                      class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600"
                    >
                      {{ item.title }}
                    </h2>
                  </header>
                </div>

                <!-- Ratings -->
                <div class="flex items-left -ml-2 mb-2">
                  <template
                    v-for="index in Math.round(item.rating.rate)"
                    :key="index"
                  >
                    <svg
                      class="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                      />
                    </svg>
                  </template>
                  <template
                    v-for="index in 5 - Math.round(item.rating.rate)"
                    :key="index"
                  >
                    <svg
                      class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                      />
                    </svg>
                  </template>
                </div>

                <div
                  class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug"
                >
                  <h2>$ {{ item.price }}</h2>
                </div>
                <div class="flex mt-1 space-x-2">
                  <div class="justify-start flex-1">
                    <button
                      class="flex rounded-lg justify-center mt-3 bg-blue-100 px-3 py-2 text-sm font-medium text-black ring-blue-700/10"
                    >
                      {{ item.category }}
                    </button>
                  </div>
                  <div class="justify-end space-x-2">
                    <button
                      @click="removeFromWishlist(item.id)"
                      class="flex rounded-lg justify-center mt-3 bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>

                <router-link
                  :to="{
                    name: 'ProductDetailView',
                    params: { id: item.id },
                  }"
                  class="flex rounded-lg justify-center mt-3 bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                >
                  Product Details
                </router-link>
                <button
                  @click="addToCart(item)"
                  class="flex rounded-lg justify-center mt-3 bg-[#381257] px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
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
          Please log in to view items in wishlist
        </p>
        <a href="/login"
          ><button
            class="flex rounded justify-center mt-3 bg-[#381257] px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
          >
            Login
          </button></a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";
import { storeToRefs } from "pinia";
import Filter from "../components/Filter.vue";
import Sort from "../components/Sort.vue";

export default {
  name: "WishList",
  components: {
    Filter,
    Sort,
  },
  data() {
    return {
      currentCategory: "all",
      currentSortOrder: "default",
    };
  },
  computed: {
    /**
     * Computed property to determine if the user is logged in.
     * @type {computed<boolean>}
     */
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    filteredAndSortedWishlist() {
      let filteredWishlist = this.wishlist;

      // Filter by category
      if (this.currentCategory !== "all") {
        filteredWishlist = filteredWishlist.filter(
          (item) => item.category === this.currentCategory
        );
      }

      // Sort by price
      if (this.currentSortOrder === "asc") {
        filteredWishlist.sort((a, b) => a.price - b.price);
      } else if (this.currentSortOrder === "desc") {
        filteredWishlist.sort((a, b) => b.price - a.price);
      }

      return filteredWishlist;
    },
  },
  setup() {
    // Create instances of the stores
    const wishlistStore = useWishlistStore();
    const cartStore = useCartStore();

    // Convert store state to refs
    const { wishlist } = storeToRefs(wishlistStore);

    /**
     * Adds an item to the cart and optionally removes it from the wishlist.
     * @param {Object} item - The product to add to the cart.
     * @param {number} item.id - The unique identifier of the product.
     * @param {string} item.name - The name of the product.
     * @param {number} item.price - The price of the product.
     */
    const addToCart = (item) => {
      cartStore.addToCart(item);
      // wishlistStore.removeFromWishlist(item.id);
    };

    return {
      wishlist,
      removeFromWishlist: wishlistStore.removeFromWishlist,
      clearWishlist: wishlistStore.clearWishlist,
      addToCart,
    };
  },
  methods: {
    handleCategoryChange(category) {
      this.currentCategory = category;
    },
    handleSortChange(sortOrder) {
      this.currentSortOrder = sortOrder;
    },
  },
};
</script>
