<template>
  <v-data-table
    :headers="headers"
    :items="tickets"
    :search="search"
    :loading="loading"
    loading-text="Loading... Please wait"
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
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { useUtils } from "@/composables/useUtils";
import { Column, DirectionType, Row } from "@/stores/types";

const store = useAppStore();
const router = useRouter();
const { formatDate, swapArrayElements } = useUtils();

const loading = computed(() => store.isLoading);
const tickets = computed(() => store.filteredTickets);
const search = computed(() => store.searchTerm);

const headers = reactive<Column>([
  { key: "id", title: "ID" },
  { key: "customer.first_name", title: "First name" },
  { key: "customer.last_name", title: "Last name" },
  { key: "contact_channel", title: "Contact channel" },
  { key: "assignedTO", title: "Assigned to" },
  { key: "interaction_creation_date", title: "Creation date" },
  { key: "due_date", title: "Due date" },
  { key: "status", title: "Status" },
]);

const rowClick = (event: Event, row: Row): void => {
  const clickedRowId = row.item.id;

  router.push(`/${clickedRowId}`);
};

const swapPosition = (index: number, direction: DirectionType): void => {
  if (direction === "next") {
    swapArrayElements(headers, index, index + 1);
  } else {
    swapArrayElements(headers, index, index - 1);
  }
};

const getStatusColor = (status: string): string => {
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

const getChannelIcon = (channel: string): string => {
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
