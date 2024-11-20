<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  name: { title: string; description: string };
}>();

const emits = defineEmits(["update:title", "update:description"]);

const tittle = computed({
  get: () => props.title,
  set: (newValue) => emits("update:title", newValue),
});
const description = computed({
  get: () => props.description,
  set: (newValue) => emits("update:description", newValue),
});
</script>

<template>
  <div class="space-y-4">
    <slot name="header" />
    <UFormGroup label="Title" :name="name.title">
      <UInput v-model="tittle" />
    </UFormGroup>
    <UFormGroup label="Description" :name="name.description">
      <UTextarea v-model="description" />
    </UFormGroup>
    <slot name="footer" />
  </div>
</template>
