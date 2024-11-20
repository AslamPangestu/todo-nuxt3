import { defineStore } from "pinia";

import type { FormNoteSchemaType, Status } from "@/dtos/note";
import type { FetchResponseAction } from "@/dtos/response";

import useAuthStore from "./auth";

const useNoteStore = defineStore("note", () => {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();

  const CONFIG = {
    baseURL: runtimeConfig.public.BASE_URL,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  };

  const onAdd = async (
    payload: Array<FormNoteSchemaType>,
  ): Promise<FetchResponseAction> => {
    try {
      await $fetch("/notes", {
        ...CONFIG,
        method: "POST",
        body: payload,
      });
      return { error: null };
    } catch (error) {
      console.error(error);
      let message: string | null = null;
      if (error instanceof Error) {
        message = error.message;
      }
      return { error: message };
    }
  };

  const onEdit = async (
    payload: FormNoteSchemaType,
    id: number,
  ): Promise<FetchResponseAction> => {
    try {
      await $fetch(`/notes/${id}`, {
        ...CONFIG,
        method: "PUT",
        body: payload,
      });
      return { error: null };
    } catch (error) {
      console.error(error);
      let message: string | null = null;
      if (error instanceof Error) {
        message = error.message;
      }
      return { error: message };
    }
  };

  const onDelete = async (id: number): Promise<FetchResponseAction> => {
    try {
      await $fetch(`/notes/${id}`, {
        ...CONFIG,
        params: { id },
        method: "DELETE",
      });
      return { error: null };
    } catch (error) {
      console.error(error);
      let message: string | null = null;
      if (error instanceof Error) {
        message = error.message;
      }
      return { error: message };
    }
  };

  const onUpdateStatus = async (
    status: Status,
    id: number,
  ): Promise<FetchResponseAction> => {
    try {
      await $fetch(`/notes/${id}`, {
        ...CONFIG,
        params: { id },
        method: "PATCH",
        body: { status },
      });
      return { error: null };
    } catch (error) {
      console.error(error);
      let message: string | null = null;
      if (error instanceof Error) {
        message = error.message;
      }
      return { error: message };
    }
  };

  return { onAdd, onEdit, onDelete, onUpdateStatus };
});

export default useNoteStore;
