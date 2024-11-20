<template>
  <UContainer class="flex items-center justify-center min-h-screen">
    <slot />
  </UContainer>
  <UNotifications
    :ui="{ position: 'top-0 left-1/2 transform -translate-x-1/2' }"
  />
</template>
