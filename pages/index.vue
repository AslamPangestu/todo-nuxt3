<script setup lang="ts">
import { ConfirmModal } from "#components";

import {
  Status,
  type NoteResponseSchemaType,
  type NoteSchemaType,
} from "@/dtos/note";
import type { Response } from "@/dtos/response";

import useUIStore from "@/stores/ui";
import useNoteStore from "@/stores/note";
import useAuthStore from "@/stores/auth";

interface ContentItem {
  type: string;
  content: string;
}
interface Contents {
  [key: string]: ContentItem;
}

useHead({ title: "Note" });

const toast = useToast();
const modal = useModal();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const uiStore = useUIStore();
const noteStore = useNoteStore();
const authStore = useAuthStore();

const PAGE_SIZE = 16;
const CONFIG = {
  baseURL: runtimeConfig.public.BASE_URL,
  headers: {
    Authorization: `Bearer ${authStore.token}`,
  },
};

const {
  data: response,
  refresh,
  status,
} = await useAsyncData<Response<NoteResponseSchemaType>>(
  "notes",
  () =>
    $fetch("/notes", {
      ...CONFIG,
      method: "GET",
      query: { page: route.query.page, page_size: PAGE_SIZE },
    }),
  {
    watch: [() => route.query.page],
  },
);

const isEdit = ref<boolean>(false);
const editData = ref<NoteSchemaType | null>(null);

const onDoneAction = (title: string) => {
  toast.add({
    title: title,
    color: "green",
  });
  modal.close();
  refresh();
};

const onEdit = (payload: NoteSchemaType) => {
  isEdit.value = true;
  editData.value = payload;
};

const onDoneEdit = () => {
  isEdit.value = false;
  editData.value = null;
  refresh();
};

const onDelete = (id: number) => {
  modal.open(ConfirmModal, {
    type: "delete",
    async onConfirm() {
      uiStore.setModalLoading();
      const { error } = await noteStore.onDelete(id);
      uiStore.setModalLoading();
      if (error) {
        toast.add({
          title: "Delete Note Failed",
          description: error,
          color: "red",
        });
        return;
      }
      onDoneAction("Success Delete Note");
    },
  });
};

const onUnmark = (id: number) => {
  modal.open(ConfirmModal, {
    type: "unmark",
    async onConfirm() {
      uiStore.setModalLoading();
      const { error } = await noteStore.onUpdateStatus(Status.TODO, id);
      uiStore.setModalLoading();
      if (error) {
        toast.add({
          title: "Unmark Note Failed",
          description: error,
          color: "red",
        });
        return;
      }
      onDoneAction("Success Unmark Note");
    },
  });
};

const onStatus = (payload: { id: number; status: Status }) => {
  const CONTENT: Contents = {
    [Status.CANCELLED]: {
      type: "cancel",
      content: "Cancel",
    },
    [Status.DONE]: {
      type: "done",
      content: "Mark as Done",
    },
  };
  const content = CONTENT[payload.status];

  modal.open(ConfirmModal, {
    type: content.type,
    async onConfirm() {
      uiStore.setModalLoading();
      const { error } = await noteStore.onUpdateStatus(
        payload.status,
        payload.id,
      );
      uiStore.setModalLoading();
      if (error) {
        toast.add({
          title: `${content.content} Note Failed`,
          description: error,
          color: "red",
        });
        return;
      }
      onDoneAction(`Success ${content.content} Note`);
    },
  });
};
</script>

<template>
  <UContainer class="space-y-4 my-4">
    <section>
      <FormAdd @success="refresh" />
    </section>
    <template v-if="status === 'success' || status === 'pending'">
      <section
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <template v-if="status === 'success'">
          <NoteItem
            v-for="item in response?.data.data"
            :key="item.id"
            :data="item"
            @edit="onEdit"
            @delete="onDelete"
            @unmark="onUnmark"
            @status="onStatus"
          />
        </template>
        <template v-if="status === 'pending'">
          <NoteSkelton v-for="item in Array(4)" :key="item" />
        </template>
      </section>
      <template v-if="status === 'success'">
        <section class="flex justify-center">
          <UPagination
            :model-value="response?.data.pagination.current_page ?? 1"
            :page-count="PAGE_SIZE"
            :total="response?.data.pagination.total ?? 1"
            :show-last="response?.data.pagination.has_next"
            :show-first="response?.data.pagination.has_prev"
            :to="
              (page: number) => ({
                query: { page },
              })
            "
          />
        </section>
      </template>
    </template>
    <template v-if="status === 'error'">
      <div class="flex gap-2 flex-col items-center justify-center">
        <UIcon name="i-ic-baseline-dangerous" class="w-32 h-32 text-red-500" />
        <span class="prose prose-2xl text-red-500">Something Wrong!!</span>
        <p class="prose prose-base text-red-500">
          Pleas Contact the administrator
        </p>
      </div>
    </template>
  </UContainer>
  <FormEdit v-model="isEdit" :data="editData" @success="onDoneEdit" />
</template>
