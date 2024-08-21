<template>
  <div>
    <div v-if="isLoggedIn" class="container mx-auto my-8">
      <h1 class="text-2xl font-bold mb-4 text-slate-600">Comparison List</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border">
          <thead>
            <tr class="bg-white">
              <th class="text-left p-4 border-b text-slate-700">Product</th>
              <th class="text-left p-4 border-b text-slate-700">Description</th>
              <th class="text-left p-4 border-b text-slate-700">Price</th>
              <th class="text-left p-4 border-b text-slate-700">Rating</th>
              <th class="text-left p-4 border-b text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in compareList"
              :key="product.id"
              class="bg-white"
            >
              <td class="p-4 border-b">
                <div class="flex items-center">
                  <img
                    class="h-20 w-20 object-contain mr-4"
                    :src="product.image"
                    :alt="product.title"
                  />
                  <span class="font-semibold text-slate-600">{{
                    product.title
                  }}</span>
                </div>
              </td>
              <td class="p-4 border-b text-gray-700 mb-3">
                {{ product.description }}
              </td>
              <td class="p-4 border-b text-slate-500">${{ product.price }}</td>
              <td class="p-4 border-b text-gray-700 mb-3">
                ⭐ {{ product.rating?.rate }}
              </td>
              <td class="p-4 border-b">
                <button
                  @click="removeFromCompareList(product.id)"
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="compareList.length > 0" class="mt-8">
        <button
          @click="clearCompareList"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Compare List
        </button>
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
          Please log in to view items in Comparison List
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
import { useCompareStore } from "../store/compareStore";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CompareList",
  setup() {
    const compareStore = useCompareStore();
    const compareList = computed(() => compareStore.compareList);

    const removeFromCompareList = (productId) => {
      compareStore.removeFromCompareList(productId);
    };

    const clearCompareList = () => {
      compareStore.clearCompareList();
    };

    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    return {
      compareList,
      removeFromCompareList,
      clearCompareList,
      isLoggedIn,
    };
  },
};
</script>

