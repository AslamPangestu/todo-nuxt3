<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

import { FormNoteSchema } from "@/dtos/note";
import useNoteStore from "@/stores/note";

const emit = defineEmits(["success"]);

const schema = z.object({
  items: z.array(FormNoteSchema),
});
type Schema = z.output<typeof schema>;

const store = useNoteStore();
const toast = useToast();

const isOpen = ref<boolean>(false);
const loading = ref<boolean>(false);

const state = reactive({
  items: [{ title: "", description: "" }],
});

const addItem = () => {
  state.items.push({ title: "", description: "" });
};

const removeItem = (index: number) => {
  state.items.splice(index, 1);
};

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  event.preventDefault();
  loading.value = true;
  const { error } = await store.onAdd(event.data.items);
  loading.value = false;
  if (error) {
    toast.add({ title: "Add Note Failed", description: error, color: "red" });
    return;
  }
  toast.add({ title: "Success Add New Notes", color: "green" });
  isOpen.value = false;
  state.items = [{ title: "", description: "" }];
  emit("success");
};
</script>

<template>
  <UButton trailing-icon="i-ic-baseline-plus" size="md" @click="isOpen = true"
    >Add</UButton
  >
  <USlideover v-model="isOpen">
    <UForm :schema="schema" :state="state" class="h-full" @submit="onSubmit">
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
            @click="isOpen = false"
          />

          <h2
            class="prose prose-lg text-gray-700 dark:text-gray-200 text-center font-bold"
          >
            Add Note
          </h2>
        </template>
        <template v-for="(item, index) in state.items" :key="index">
          <FormItem
            v-model:title="item.title"
            v-model:description="item.description"
            :name="{
              title: `items.${index}.title`,
              description: `items.${index}.description`,
            }"
          >
            <template #header>
              <h3
                class="prose prose-base text-gray-700 dark:text-gray-200 font-bold"
              >
                Note {{ index + 1 }}
              </h3>
            </template>
            <template #footer>
              <div class="flex gap-2 w-full">
                <UButton
                  v-if="index > 0"
                  color="red"
                  trailing-icon="i-ic-baseline-remove-circle-outline"
                  class="flex-1"
                  block
                  @click="removeItem(index)"
                >
                  Remove
                </UButton>
                <UButton
                  color="green"
                  trailing-icon="i-ic-baseline-add-circle-outline"
                  class="flex-1"
                  block
                  @click="addItem"
                >
                  Add
                </UButton>
              </div>
            </template>
          </FormItem>
        </template>
        <template #footer>
          <UButton type="submit" :loading="loading" block>Submit</UButton>
        </template>
      </UCard>
    </UForm>
  </USlideover>
</template>
