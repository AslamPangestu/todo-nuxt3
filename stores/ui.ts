import { defineStore } from "pinia";

const useUIStore = defineStore("ui", () => {
  const modalLoading = ref<boolean>(false);

  const setModalLoading = () => {
    modalLoading.value = !modalLoading.value;
  };

  return { modalLoading, setModalLoading };
});

export default useUIStore;
