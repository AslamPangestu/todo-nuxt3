import { defineStore } from "pinia";

import type {
  LoginSchemaType,
  UserSchemaType,
  UserResponseSchemaType,
  RegisterSchemaType,
} from "@/dtos/user";
import type { FetchResponse, Response } from "@/dtos/response";

const useAuthStore = defineStore(
  "auth",
  () => {
    const runtimeConfig = useRuntimeConfig();

    const token = ref<string>("");
    const user = reactive<UserSchemaType>({
      user_id: "",
      name: "",
    });

    const setAuth = (data: UserResponseSchemaType) => {
      token.value = data.token;
      user.user_id = data.user_id;
      user.name = data.name;
    };

    const onLogin = async (
      payload: LoginSchemaType,
    ): Promise<FetchResponse<UserResponseSchemaType>> => {
      try {
        const response: Response<UserResponseSchemaType> = await $fetch(
          "/login",
          {
            baseURL: runtimeConfig.public.BASE_URL,
            method: "POST",
            body: payload,
          },
        );
        setAuth(response.data);
        return { response: response.data, error: null };
      } catch (error) {
        console.error(error);
        let message: string | null = null;
        if (error instanceof Error) {
          message = error.message;
        }
        return { response: null, error: message };
      }
    };

    const onRegister = async (payload: RegisterSchemaType) => {
      try {
        const response: Response<UserResponseSchemaType> = await $fetch(
          "/register",
          {
            baseURL: runtimeConfig.public.BASE_URL,
            method: "POST",
            body: {
              user_id: payload.user_id,
              name: payload.name,
              password: payload.password,
            },
          },
        );
        setAuth(response.data);
        return { response: response.data, error: null };
      } catch (error) {
        console.error(error);
        let message: string | null = null;
        if (error instanceof Error) {
          message = error.message;
        }
        return { response: null, error: message };
      }
    };

    const onLogout = () => {
      token.value = "";
      user.user_id = "";
      user.name = "";
    };

    return { user, token, onLogin, onRegister, onLogout };
  },
  {
    persist: true,
  },
);

export default useAuthStore;
