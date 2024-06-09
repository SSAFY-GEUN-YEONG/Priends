import { ref } from "vue";
import { defineStore } from "pinia";

export const useAttractionStore = defineStore("attractionStore", () => {
  const cityname = ref("");
  const category = ref("");

  const areainfo = ref({
    img: "",
    natureAttractions: [],
    restaurantAttractions: [],
    cultureAttractions: [],
  });

  const attractionList = ref([]);

  return {
    cityname,
    category,
    areainfo,
    attractionList,
  };
});
