import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompareStore = defineStore("compare", () => {
  const compareList = ref([]);

  // Load compare list from local storage
  const loadCompareList = () => {
    const storedList = JSON.parse(localStorage.getItem("compareList"));
    if (storedList) {
      compareList.value = storedList;
    }
  };

  // Save compare list to local storage
  const saveCompareList = () => {
    localStorage.setItem("compareList", JSON.stringify(compareList.value));
  };

  // Add a product to the compare list
  const addToCompareList = (product) => {
    if (compareList.value.length >= 4) {
      alert("You can only compare up to 4 items.");
      return;
    }

    const exists = compareList.value.find((item) => item.id === product.id);
    if (!exists) {
      compareList.value.push(product);
      saveCompareList();
    } else {
      alert("This item is already in the compare list.");
    }
  };

  // Remove a product from the compare list
  const removeFromCompareList = (productId) => {
    compareList.value = compareList.value.filter(
      (item) => item.id !== productId
    );
    saveCompareList();
  };

  return {
    compareList,
    addToCompareList,
    removeFromCompareList,
    loadCompareList,
  };
});
