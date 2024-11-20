<script setup lang="ts">
import useAuthStore from "@/stores/auth";

const store = useAuthStore();
const toast = useToast();

const items = [
  [
    {
      label: "Logout",
      icon: "i-ic-baseline-logout",
      labelClass: "text-red-500",
      iconClass: "text-red-500 dark:text-red-500",
      click: async () => {
        toast.add({ title: `Goodbye ${store.user.name}!`, color: "green" });
        store.onLogout();
        await navigateTo("/login", { replace: true });
      },
    },
  ],
];
</script>

<template>
  <header
    class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800"
  >
    <div
      class="mx-auto py-2 px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3"
    >
      <NuxtLink to="/">
        <span class="prose prose-2xl font-bold text-gray-700 dark:text-gray-200"
          >Notes</span
        >
      </NuxtLink>
      <div>
        <UDropdown :items="items" mode="hover" :popper="{ arrow: true }">
          <UButton
            truncate
            trailing-icon="i-ic-baseline-keyboard-arrow-down"
            variant="ghost"
            >{{ store.user.name }}</UButton
          >
        </UDropdown>
      </div>
    </div>
  </header>
  <main>
    <slot />
  </main>
  <UNotifications
    :ui="{ position: 'top-0 left-1/2 transform -translate-x-1/2' }"
  />
  <UModals />
</template>
