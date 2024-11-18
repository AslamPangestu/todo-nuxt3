<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

useHead({ title: "Login" });

definePageMeta({
  layout: "auth",
});

const toast = useToast();

// TODO: Model User
const schema = z.object({
  user_id: z.string().min(8, "Must be at least 8 characters"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const loading = ref(false);

const state = reactive({
  user_id: undefined,
  password: undefined,
});

// TODO: Hit API
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  loading.value = true;
  console.log(event.data);
  loading.value = false;
  toast.add({ title: "Hello world!" });
  await navigateTo("/");
}
</script>

<template>
  <UForm
    :schema="schema"
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
              </ULink></span
            >
          </div>
          <UButton
            type="submit"
            :loading="loading"
            loading-icon="i-ic-baseline-spinner"
            block
            >Login</UButton
          >
        </div>
      </template>
    </UCard>
  </UForm>
</template>
