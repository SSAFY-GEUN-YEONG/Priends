import { ref } from "vue";
import { defineStore } from "pinia";

export const usePathStore = defineStore("pathStore", () => {
  const pathInfo = ref({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    id: "",
    isNew: true,
  });

  const reset = () => {
    pathInfo.value.title = "";
    pathInfo.value.content = "";
    pathInfo.value.startDate = "";
    pathInfo.value.endDate = "";
    pathInfo.value.id = "";
    pathInfo.value.isNew = true;
  };

  return { pathInfo, reset };
});
