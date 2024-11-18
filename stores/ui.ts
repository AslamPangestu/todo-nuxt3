import { defineStore } from "pinia";

const useUIStore = defineStore("ui", () => {
  const modalLoading = ref(false);

  const setModalLoading = () => {
    modalLoading.value = !modalLoading.value;
  };

  return { modalLoading, setModalLoading };
});

export default useUIStore;
