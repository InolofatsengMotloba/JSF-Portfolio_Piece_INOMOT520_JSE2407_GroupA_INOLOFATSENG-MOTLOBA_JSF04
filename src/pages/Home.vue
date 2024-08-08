<template>
  <div
    class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center"
  >
    <Filter
      :current-category="productStore.currentCategory"
      @filter-category="filterByCategory"
    />
    <Sort
      :current-sort-order="productStore.currentSortOrder"
      @sort-order="sortProducts"
    />
  </div>
  <ProductsList />
</template>

<script>
import Filter from "../components/Filter.vue";
import ProductsList from "../components/products/ProductsList.vue";
import Sort from "../components/Sort.vue";
import { useProductStore } from "../store/productStore";

export default {
  name: "Home",
  components: { ProductsList, Filter, Sort },
  setup() {
    const productStore = useProductStore();

    /**
     * Filters products by the selected category
     * 
     * @function filterByCategory
     * @param category - The selected category to filter products by
     */
    const filterByCategory = (category) => {
      productStore.filterByCategory(category);
    };

    /**
     * Sorts products by the selected order
     * 
     * @function sortProducts
     * @param order - The selected order to sort products by
     */
    const sortProducts = (order) => {
      productStore.sortProducts(order);
    };

    return {
      filterByCategory,
      sortProducts,
      productStore,
    };
  },
};
</script>
