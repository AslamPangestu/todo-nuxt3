<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import { LoginSchema, type LoginSchemaType } from "@/dtos/user";

import useAuthStore from "@/stores/auth";

useHead({ title: "Login" });
definePageMeta({
  layout: "auth",
});

const store = useAuthStore();
const toast = useToast();

const loading = ref<boolean>(false);

const state = reactive<LoginSchemaType>({
  user_id: "",
  password: "",
});

const onSubmit = async (event: FormSubmitEvent<LoginSchemaType>) => {
  event.preventDefault();
  loading.value = true;
  const { response, error } = await store.onLogin(event.data);
  loading.value = false;
  if (error) {
    toast.add({ title: "Login Failed", description: error, color: "red" });
    return;
  }
  toast.add({ title: `Welcome ${response?.name}`, color: "green" });
  await navigateTo("/");
};
</script>

<template>
  <UForm
    :schema="LoginSchema"
    :state="state"
    class="max-w-96 w-full"
    @submit="onSubmit"
  >
    <UCard>
      <template #header>
        <h1
          class="prose prose-2xl text-gray-700 dark:text-gray-200 text-center font-bold"
        >
          Login
        </h1>
      </template>
      <div class="space-y-4">
        <UFormGroup label="User ID" name="user_id">
          <UInput v-model="state.user_id" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="space-y-4">
          <div class="text-center">
            <span class="prose prose-sm text-gray-600"
              >Don't have an account?
              <ULink
                to="/register"
                active-class="text-primary"
                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Register
              </ULink>
            </span>
          </div>
          <UButton type="submit" :loading="loading" block>Login</UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
