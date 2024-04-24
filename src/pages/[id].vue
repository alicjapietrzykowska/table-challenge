<template>
  <v-card
    class="pa-4 mx-auto"
    elevation="12"
    max-width="900"
    rounded="lg"
    width="100%"
  >
    <template v-slot:title>
      <div class="d-flex mb-3">
        <router-link to="/" class="mr-5">
          <v-icon icon="mdi-arrow-left" color="grey" />
        </router-link>
        <h2 class="ml-5">{{ title }}</h2>
      </div>
    </template>

    <v-sheet class="d-sm-flex gap-3 justify-space-between">
      <section class="px-5 py-3">
        <h3>Customer data</h3>
        <div class="my-3">
          <div class="text-subtitle-2">First name</div>
          <div class="text-body-1">{{ customerData.first_name }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Last name</div>
          <div class="text-body-1">{{ customerData.last_name }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Gender</div>
          <div class="text-body-1">{{ customerData.gender }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Birthday</div>
          <div class="text-body-1">{{ formatDate(customerData.birthday) }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Country Code</div>
          <div class="text-body-1">{{ customerData.country_code }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Email</div>
          <div class="text-body-1">{{ customerData.email }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Phone</div>
          <div class="text-body-1">{{ customerData.phone }}</div>
        </div>
      </section>
      <section class="py-3 px-5">
        <h3>Ticket details</h3>
        <div class="my-3">
          <div class="text-subtitle-2">Assigned to</div>
          <div class="text-body-1">{{ ticketData.assignedTO }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Status</div>
          <div class="text-body-1">{{ ticketData.status }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Contact channel</div>
          <div class="text-body-1">{{ ticketData.contact_channel }}</div>
        </div>

        <div class="my-3">
          <div class="text-subtitle-2">Interaction Creation Date</div>
          <div class="text-body-1">
            {{ formatDate(ticketData.interaction_creation_date) }}
          </div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Due Date</div>
          <div class="text-body-1">
            {{ formatDate(ticketData.due_date) }}
          </div>
        </div>

        <div class="my-3">
          <div class="text-subtitle-2">Last comment</div>
          <div class="text-body-1">{{ ticketData.last_comment }}</div>
        </div>
        <div class="my-3">
          <div class="text-subtitle-2">Attachments</div>
          <div class="text-body-1">{{ ticketData.attachments }}</div>
        </div>
      </section>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { Customer } from "@/stores/types";
import { useUtils } from "@/composables/useUtils";

const store = useAppStore();
const { getTicketDetailsById } = storeToRefs(store);
const route = useRoute();
const { formatDate } = useUtils();

const currentId = route.params.id;
const ticketData = getTicketDetailsById.value(currentId);
const customerData = computed<Customer>(() => ticketData.customer);
const title = computed<string>(() => `Ticket nr ${currentId}`);
</script>

<style scoped></style>
