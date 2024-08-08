<template>
  <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
    <label for="category" class="w-20 my-auto font-semibold"> Sort by: </label>
    <select
      @change="onSortChange($event)"
      class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      :value="currentSortOrder"
    >
      <option value="default">Default</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Sort",
  props: {
    currentSortOrder: {
      type: String,
      required: true,
    },
  },
  emits: ["sort-order"],
  setup(_, { emit }) {
    const onSortChange = (event) => {
      emit("sort-order", event.target.value);
    };

    return {
      onSortChange,
    };
  },
};
</script>
