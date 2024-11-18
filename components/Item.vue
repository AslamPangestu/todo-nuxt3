<script setup lang="ts">
defineProps(["id", "title", "description", "status"]);

const emits = defineEmits(["edit", "delete", "unmark", "status"]);

const items = [
  [
    {
      label: "action",
      slot: "action",
      disabled: true,
    },
  ],
  [
    {
      label: "Edit",
      icon: "i-ic-baseline-edit",
      click: () => {
        emits("edit");
      },
    },
    {
      label: "Delete",
      icon: "i-ic-baseline-delete",
      click: () => {
        emits("delete");
      },
    },
    {
      label: "Unmark",
      icon: "i-ic-baseline-check-box-outline-blank",
      click: () => {
        emits("unmark");
      },
    },
  ],
];
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="prose prose-lg text-gray-700 dark:text-gray-200 font-bold">
          Title
        </h3>
        <UDropdown
          :items="items"
          :popper="{ arrow: true }"
          :ui="{ width: 'w-32', item: { disabled: 'cursor-text select-text' } }"
        >
          <UButton variant="outline" trailing-icon="i-ic-baseline-more-vert" />
          <template #action>
            <UButtonGroup size="sm" orientation="horizontal" class="w-full">
              <UButton
                color="red"
                variant="outline"
                trailing-icon="i-ic-baseline-close"
                class="w-1/2 justify-center"
                @click="emits('status', 'cancel')"
              />
              <UButton
                color="green"
                variant="outline"
                trailing-icon="i-ic-baseline-check"
                class="w-1/2 justify-center"
                @click="emits('status', 'done')"
              />
            </UButtonGroup>
          </template>
        </UDropdown>
      </div>
    </template>
    <p class="prose prose-base text-gray-700 dark:text-gray-200">Description</p>
  </UCard>
</template>
