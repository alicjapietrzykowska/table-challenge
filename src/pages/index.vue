<template>
  <v-card title="Tickets List" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="tickets"
      :search="search"
      loading-text="Loading... Please wait"
      :loading="loading"
      item-key="id"
      hover
      single-select
      show-expand
      @click:row="rowClick"
    >
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
  </v-card>
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
const tickets = computed(() => store.sortedTicketData);

const search = ref("");

const headers = [
  { key: "id", title: "ID" },
  { key: "customer.first_name", title: "First name" },
  { key: "customer.last_name", title: "Last name" },
  { key: "contact_channel", title: "Contact channel" },
  { key: "assignedTO", title: "Assigned to" },
  { key: "interaction_creation_date", title: "Creation date" },
  { key: "due_date", title: "Due date" },
  { key: "status", title: "Status" },
];

const rowClick = (event: Event, row: any) => {
  const clickedRowId = row.item.id;

  router.push(`/${clickedRowId}`);
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
