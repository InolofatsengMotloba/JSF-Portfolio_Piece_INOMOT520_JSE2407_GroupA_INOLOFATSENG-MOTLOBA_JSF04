<template>
  <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
    <label for="category" class="w-20 my-auto font-semibold"> Filter: </label>
    <select
      @change="onCategoryChange($event)"
      class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      :value="currentCategory"
    >
      <option value="all">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getCategories } from "../api/api";

export default {
  name: "Filter",
  props: {
    currentCategory: {
      type: String,
      required: true,
    },
  },
  emits: ["filter-category"],
  setup(_, { emit }) {
    const categories = ref([]);

    /**
     * Fetch categories from the API and update the categories ref.
     * Logs an error if the fetch operation fails.
     * @async
     * @function fetchCategories
     * @returns {Promise<void>}
     */
    const fetchCategories = async () => {
      const { response, error } = await getCategories();
      if (response) {
        categories.value = response;
      } else {
        console.error(error);
      }
    };

    const onCategoryChange = (event) => {
      emit("filter-category", event.target.value);
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      onCategoryChange,
    };
  },
};
</script>
