<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

import { RegisterSchema, type RegisterSchemaType } from "@/dtos/user";
import useAuthStore from "@/stores/auth";

useHead({ title: "Register" });
definePageMeta({
  layout: "auth",
});

const store = useAuthStore();
const toast = useToast();

const loading = ref<boolean>(false);

const state = reactive<RegisterSchemaType>({
  user_id: "",
  name: "",
  password: "",
  confirm_password: "",
});

async function onSubmit(event: FormSubmitEvent<RegisterSchemaType>) {
  event.preventDefault();
  loading.value = true;
  const { response, error } = await store.onRegister(event.data);
  loading.value = false;
  if (error) {
    toast.add({ title: "Register Failed", description: error, color: "red" });
    return;
  }
  toast.add({ title: `Welcome ${response?.name}`, color: "green" });
  await navigateTo("/");
}
</script>

<template>
  <UForm
    :schema="RegisterSchema"
    :state="state"
    class="max-w-96 w-full"
    @submit="onSubmit"
  >
    <UCard>
      <template #header>
        <h1
          class="prose prose-2xl text-gray-700 dark:text-gray-200 text-center font-bold"
        >
          Register
        </h1>
      </template>
      <div class="space-y-4">
        <UFormGroup label="User ID" name="user_id">
          <UInput v-model="state.user_id" />
        </UFormGroup>

        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UFormGroup label="Confirm Password" name="confirm_password">
          <UInput v-model="state.confirm_password" type="password" />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="space-y-4">
          <div class="text-center">
            <span class="prose prose-sm text-gray-600"
              >Already have an account?
              <ULink
                to="/login"
                active-class="text-primary"
                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Login
              </ULink>
            </span>
          </div>
          <UButton type="submit" :loading="loading" block>Register</UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
