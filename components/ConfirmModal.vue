<script lang="ts" setup>
import useUIStore from "@/stores/ui";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(value: string) {
      return ["delete", "unmark", "done", "cancel"].includes(value);
    },
  },
});

const emit = defineEmits(["confirm", "close"]);

const modalRef = useTemplateRef("modal-ref");

const store = useUIStore();

interface ContentItem {
  title: string;
  description: string;
}
interface Contents {
  [key: string]: ContentItem;
}

const getContent = () => {
  const CONTENTS: Contents = {
    delete: {
      title: "Delete Note",
      description: "Are you sure you want to delete this note?",
    },
    unmark: {
      title: "Unmark Note",
      description: "Are you sure you want to unmark this note?",
    },
    done: {
      title: "Mark Note as Done",
      description: "Are you sure you want to mark this note as done?",
    },
    cancel: {
      title: "Cancel Note",
      description: "Are you sure you want to cancel this note?",
    },
  };

  return CONTENTS[props.type];
};

const onConfirm = () => {
  emit("confirm");
};

const onClose = () => {
  modalRef?.value?.close(false);
};
</script>

<template>
  <UModal ref="modal-ref" :ui="{ width: 'w-96 sm:max-w-lg' }">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h2 class="prose prose-lg text-gray-700 dark:text-gray-200 font-bold">
            {{ getContent()?.title }}
          </h2>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-ic-baseline-close"
            square
            padded
            @click="onClose"
          />
        </div>
      </template>

      <p class="prose prose-base text-gray-700 dark:text-gray-200">
        {{ getContent()?.description }}
      </p>

      <template #footer>
        <div class="flex flex-col sm:flex-row gap-2 w-full">
          <UButton class="flex-1" variant="outline" block @click="onClose">
            Cancel
          </UButton>
          <UButton
            class="flex-1"
            :loading="store.modalLoading"
            block
            @click="onConfirm"
            >Confirm</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>
