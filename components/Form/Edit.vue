<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const model = defineModel({ type: Boolean, required: true, default: false });

const toast = useToast();

// TODO: Model Note
const schema = z.object({
  title: z.string().min(8, "Must be at least 8 characters"),
  description: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const loading = ref(false);

const state = reactive({ title: undefined, description: undefined });

// TODO: Hit API
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  loading.value = true;
  console.log(event.data);
  loading.value = false;
  model.value = false;
  toast.add({ title: "Hello world!" });
}
</script>

<template>
  <USlideover v-model="model">
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
            @click="model = false"
          />

          <h2
            class="prose prose-lg text-gray-700 dark:text-gray-200 text-center font-bold"
          >
            Edit Note
          </h2>
        </template>
        <FormItem :state="state" title="title" description="description" />
        <template #footer>
          <UButton type="submit" :loading="loading" block>Update</UButton>
        </template>
      </UCard>
    </UForm>
  </USlideover>
</template>
