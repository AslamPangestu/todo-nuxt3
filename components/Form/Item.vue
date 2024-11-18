<script setup lang="ts">
defineProps({
  state: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="space-y-4">
    <slot name="header" />
    <UFormGroup label="Title" :name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Description" :name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>
    <slot name="footer" />
  </div>
</template>
