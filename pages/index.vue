<script setup lang="ts">
import { ConfirmModal } from "#components";

import useUIStore from "@/stores/ui";

useHead({ title: "Note" });

const toast = useToast();
const modal = useModal();
const store = useUIStore();

const isEdit = ref(false);
const loading = ref(false);

const onEdit = () => {
  isEdit.value = true;
};

const onDelete = () => {
  modal.open(ConfirmModal, {
    type: "delete",
    onConfirm() {
      store.setModalLoading();
      toast.add({
        title: "Success !",
        id: "modal-success",
      });
      store.setModalLoading();
      modal.close();
    },
  });
};

const onUnmark = () => {
  modal.open(ConfirmModal, {
    type: "unmark",
    onConfirm() {
      store.setModalLoading();
      toast.add({
        title: "Success !",
        id: "modal-success",
      });
      store.setModalLoading();
      modal.close();
    },
  });
};

const onStatus = (value: string) => {
  modal.open(ConfirmModal, {
    type: value,
    onConfirm() {
      store.setModalLoading();
      toast.add({
        title: "Success !",
        id: "modal-success",
      });
      store.setModalLoading();
      modal.close();
    },
  });
};
</script>

<template>
  <UContainer class="space-y-4 my-4">
    <section>
      <FormAdd />
    </section>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <Item
        :onEdit="onEdit"
        :onDelete="onDelete"
        :onUnmark="onUnmark"
        :onStatus="onStatus"
      />
    </section>
  </UContainer>
  <FormEdit v-model="isEdit" />
</template>
