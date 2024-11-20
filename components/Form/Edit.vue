<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import {
  FormNoteSchema,
  type FormNoteSchemaType,
  type NoteSchemaType,
} from "@/dtos/note";

import useNoteStore from "@/stores/note";

const props = defineProps<{ data: NoteSchemaType | null }>();
const model = defineModel({ type: Boolean, required: true, default: false });
const emit = defineEmits(["success"]);

const toast = useToast();
const store = useNoteStore();

const loading = ref<boolean>(false);

const state = reactive({ title: "", description: "" });

watch(
  () => props.data,
  (nevValue, _oldValue) => {
    if (nevValue) {
      state.title = nevValue.title;
      state.description = nevValue.description;
    } else {
      state.title = "";
      state.description = "";
    }
  },
);

async function onSubmit(event: FormSubmitEvent<FormNoteSchemaType>) {
  if (!props.data) {
    return;
  }
  event.preventDefault();
  loading.value = true;
  const { error } = await store.onEdit(event.data, props.data.id);
  loading.value = false;
  if (error) {
    toast.add({ title: "Edit Note Failed", description: error, color: "red" });
    return;
  }
  toast.add({ title: "Success Edit Note", color: "green" });
  emit("success");
}
</script>

<template>
  <USlideover v-model="model">
    <UForm
      :schema="FormNoteSchema"
      :state="state"
      class="h-full"
      @submit="onSubmit"
    >
      <UCard
        class="h-full flex flex-col"
        :ui="{
          header: { base: 'flex-initial' },
          footer: { base: 'flex-initial' },
          body: { base: 'space-y-4 flex flex-col flex-1 overflow-y-auto grow' },
          ring: '',
          divider: 'divide-y divide-gray-200 dark:divide-gray-800',
        }"
      >
        <template #header>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-ic-baseline-close"
            class="flex sm:hidden absolute end-5 top-5 z-10"
            square
            padded
            @click="model = false"
          />

          <h2
            class="prose prose-lg text-gray-700 dark:text-gray-200 text-center font-bold"
          >
            Edit Note
          </h2>
        </template>
        <FormItem
          v-model:title="state.title"
          v-model:description="state.description"
          :name="{ title: 'title', description: 'description' }"
        />
        <template #footer>
          <UButton type="submit" :loading="loading" block>Update</UButton>
        </template>
      </UCard>
    </UForm>
  </USlideover>
</template>
