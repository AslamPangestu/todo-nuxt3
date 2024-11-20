<script setup lang="ts">
import { Status, type NoteSchemaType } from "@/dtos/note";

const props = defineProps<{ data: NoteSchemaType }>();
const emits = defineEmits(["edit", "delete", "unmark", "status"]);

const items = computed(() => {
  if (props.data.status === Status.TODO) {
    return [
      [
        {
          label: "Edit",
          icon: "i-ic-baseline-edit",
          click: () => {
            emits("edit", props.data);
          },
        },
        {
          label: "Delete",
          icon: "i-ic-baseline-delete",
          click: () => {
            emits("delete", props.data.id);
          },
        },
      ],
    ];
  }
  return [
    [
      {
        label: "Unmark",
        icon: "i-ic-baseline-check-box-outline-blank",
        click: () => {
          emits("unmark", props.data.id);
        },
      },
    ],
  ];
});

const status = computed(() => {
  if (props.data.status === Status.CANCELLED) {
    return { color: "text-red-500", content: "CANCELLED" };
  }
  return { color: "text-green-500", content: "MARK AS DONE" };
});
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="prose prose-lg text-gray-700 dark:text-gray-200 font-bold">
          {{ props.data.title }}
        </h3>
        <UDropdown
          :items="items"
          :popper="{ arrow: true }"
          :ui="{ width: 'w-32', item: { disabled: 'cursor-text select-text' } }"
        >
          <UButton variant="outline" trailing-icon="i-ic-baseline-more-vert" />
        </UDropdown>
      </div>
    </template>
    <p class="prose prose-base text-gray-700 dark:text-gray-200">
      {{ props.data.description }}
    </p>
    <template #footer>
      <template v-if="props.data.status === Status.TODO">
        <UButtonGroup size="sm" orientation="horizontal" class="w-full">
          <UButton
            color="red"
            variant="outline"
            trailing-icon="i-ic-baseline-close"
            class="w-1/2 justify-center"
            @click="
              emits('status', {
                id: props.data.id,
                status: Status.CANCELLED,
              })
            "
          />
          <UButton
            color="green"
            variant="outline"
            trailing-icon="i-ic-baseline-check"
            class="w-1/2 justify-center"
            @click="emits('status', { id: props.data.id, status: Status.DONE })"
          />
        </UButtonGroup>
      </template>
      <div v-else class="text-center">
        <span :class="['prose prose-md font-bold', status.color]">{{
          status.content
        }}</span>
      </div>
    </template>
  </UCard>
</template>
