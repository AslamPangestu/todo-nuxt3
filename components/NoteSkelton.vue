<template>
  <UCard>
    <template #header>
      <div class="flex gap-2 w-full">
        <USkeleton class="h-4 w-4/5" />
        <USkeleton class="h-4 w-1/5" />
      </div>
    </template>
    <USkeleton class="h-4 w-full" />
    <template #footer>
      <div class="flex gap-2 w-full">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
      </div>
    </template>
  </UCard>
</template>
