<template>
  <v-data-table
    :headers="headers"
    :items="tickets"
    :search="search"
    loading-text="Loading... Please wait"
    :loading="loading"
    item-key="id"
    hover
    show-expand
    @click:row="rowClick"
  >
    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr>
        <template
          v-for="(column, index) in columns"
          :key="column?.key || index"
        >
          <td>
            <v-icon
              v-if="index !== 0 && column.title"
              icon="mdi-chevron-left"
              size="x-small"
              color="grey"
              @click="swapPosition(index, 'prev')"
            />
            <span class="cursor-pointer" @click="() => toggleSort(column)">
              {{ column.title }}
            </span>
            <template v-if="isSorted(column)">
              <v-icon :icon="getSortIcon(column)" size="small" color="grey" />
            </template>
            <v-icon
              v-if="columns[index + 1]?.title"
              icon="mdi-chevron-right"
              size="x-small"
              color="grey"
              @click="swapPosition(index, 'next')"
            />
          </td>
        </template>
      </tr>
    </template>
    <template v-slot:item.contact_channel="{ value }">
      <v-icon :icon="getChannelIcon(value)" />
      {{ value }}
    </template>
    <template v-slot:item.status="{ value }">
      <v-chip :color="getStatusColor(value)">
        {{ value }}
      </v-chip>
    </template>
    <template v-slot:item.interaction_creation_date="{ value }">
      {{ formatDate(value) }}
    </template>
    <template v-slot:item.due_date="{ value }">
      {{ formatDate(value) }}
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <div class="my-5">
            <div class="text-subtitle-2">Last comment</div>
            <div class="text-body-1">{{ item.last_comment }}</div>
          </div>
          <div class="my-5">
            <div class="text-subtitle-2">Attachments</div>
            <div class="text-body-1">{{ item.attachments }}</div>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useUtils } from "@/composables/useUtils";

const store = useAppStore();
const router = useRouter();
const { formatDate } = useUtils();

const loading = computed(() => store.isLoading);
const tickets = computed(() => store.filteredTickets);
const search = computed(() => store.searchTerm);

const initialHeaders = [
  { key: "id", title: "ID" },
  { key: "customer.first_name", title: "First name" },
  { key: "customer.last_name", title: "Last name" },
  { key: "contact_channel", title: "Contact channel" },
  { key: "assignedTO", title: "Assigned to" },
  { key: "interaction_creation_date", title: "Creation date" },
  { key: "due_date", title: "Due date" },
  { key: "status", title: "Status" },
];

const headers = ref(initialHeaders);

const rowClick = (event: Event, row: any) => {
  const clickedRowId = row.item.id;

  router.push(`/${clickedRowId}`);
};

const swapPosition = (index: number, direction: "next" | "prev") => {
  const swapElements = (array: any[], index1: number, index2: number) => {
    if (!array[index2]) return;
    array[index1] = array.splice(index2, 1, array[index1])[0];
  };

  if (direction === "next") {
    swapElements(headers.value, index, index + 1);
  } else {
    swapElements(headers.value, index, index - 1);
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "waiting":
      return "deep-purple";
    case "finished":
      return "green";
    case "reserved":
      return "orange";
    case "toTreat":
      return "red";
    case "inProgress":
      return "blue";
    default:
      return "primary";
  }
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "facebook":
      return "mdi-facebook";
    case "messenger":
      return "mdi-facebook-messenger";
    case "file":
      return "mdi-file";
    case "form":
      return "mdi-pen";
    case "twiter":
      return "mdi-twitter";
    default:
      return "mdi-help";
  }
};
</script>
