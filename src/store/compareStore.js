import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompareStore = defineStore("compare", () => {
  const compareList = ref([]);

  // Save compare list to local storage
  const saveCompareList = () => {
    localStorage.setItem("compareList", JSON.stringify(compareList.value));
  };

  return {
    compareList,
  };
});
