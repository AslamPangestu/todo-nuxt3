<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const toast = useToast();

// TODO: Model Note
const schema = z.object({
  items: z.array(
    z.object({
      title: z.string().min(8, "Must be at least 8 characters"),
      description: z.string().min(8, "Must be at least 8 characters"),
    })
  ),
});

type Schema = z.output<typeof schema>;

const isOpen = ref(false);
const loading = ref(false);

const state = reactive({
  items: [{ title: undefined, description: undefined }],
});

const addItem = () => {
  state.items.push({ title: undefined, description: undefined });
};

const removeItem = (index: number) => {
  state.items.splice(index, 1);
};

// TODO: Hit API
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  loading.value = true;
  console.log(event.data);
  loading.value = false;
  isOpen.value = false;
  toast.add({ title: "Hello world!" });
}
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
            :state="item"
            :title="`items.${index}.title`"
            :description="`items.${index}.description`"
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
